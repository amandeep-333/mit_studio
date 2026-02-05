import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import emailService from "./email.service.js";

const prisma = new PrismaClient();

class AuthService {
  // Generate 6-digit OTP
  generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Create OTP record in database 
  async createOTPRecord(email, otp) {
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Delete any existing unused OTPs for this email
    await prisma.otp.deleteMany({
      where: {
        email,
        isUsed: false,
      },
    });

    // Create new OTP record
    const otpRecord = await prisma.otp.create({
      data: {
        email,
        otp,
        expiresAt,
      },
    });

    return otpRecord;
  }

  // Signup user
  async signup(email, password) {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      if (existingUser.isVerified) {
        throw new Error("User already exists with this email");
      } else {
        // User exists but not verified, allow to resend OTP
        const otp = this.generateOTP();
        await this.createOTPRecord(email, otp);
        await emailService.sendOTP(email, otp);
        return {
          message: "OTP sent to your email. Please verify.",
          requiresVerification: true,
        };
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user (unverified)
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        isVerified: false,
      },
    });

    // Generate and send OTP
    const otp = this.generateOTP();
    await this.createOTPRecord(email, otp);
    await emailService.sendOTP(email, otp);

    return {
      message: "Signup successful! OTP sent to your email.",
      userId: user.id,
      requiresVerification: true,
    };
  }

  // Verify OTP
  async verifyOTP(email, otp) {
    // Find valid OTP
    const otpRecord = await prisma.otp.findFirst({
      where: {
        email,
        otp,
        isUsed: false,
        expiresAt: {
          gte: new Date(),
        },
      },
    });

    if (!otpRecord) {
      throw new Error("Invalid or expired OTP");
    }

    // Mark OTP as used
    await prisma.otp.update({
      where: { id: otpRecord.id },
      data: { isUsed: true },
    });

    // Update user verification status
    const user = await prisma.user.update({
      where: { email },
      data: { isVerified: true },
    });

    // Send welcome email
    await emailService.sendWelcomeEmail(email, user.name);

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    return {
      message: "Email verified successfully",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isVerified: user.isVerified,
      },
    };
  }

  // Resend OTP
  async resendOTP(email) {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.isVerified) {
      throw new Error("Email is already verified");
    }

    // Generate and send new OTP
    const otp = this.generateOTP();
    await this.createOTPRecord(email, otp);
    await emailService.sendOTP(email, otp);

    return {
      message: "OTP resent successfully",
    };
  }

  // Login user
  async login(email, password) {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Check if email is verified
    if (!user.isVerified) {
      // Resend OTP
      const otp = this.generateOTP();
      await this.createOTPRecord(email, otp);
      await emailService.sendOTP(email, otp);

      throw new Error("Email not verified. OTP sent to your email.");
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    return {
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isVerified: user.isVerified,
      },
    };
  }

  // Get user by ID
  async getUserById(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        isVerified: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}

export default new AuthService();
