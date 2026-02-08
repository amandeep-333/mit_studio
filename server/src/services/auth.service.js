import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import emailService from "./email.service.js";

const prisma = new PrismaClient();

class AuthService {
  generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async createOTPRecord(email, otp) {
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.otp.deleteMany({
      where: {
        email,
        isUsed: false,
      },
    });

    const otpRecord = await prisma.otp.create({
      data: {
        email,
        otp,
        expiresAt,
      },
    });

    return otpRecord;
  }

  async signup(email, password, name) {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      if (existingUser.isVerified) {
        throw new Error("User already exists with this email");
      } else {
        const otp = this.generateOTP();
        await this.createOTPRecord(email, otp);
        await emailService.sendOTP(email, otp);
        return {
          requiresVerification: true,
        };
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        isVerified: false,
      },
    });

    const otp = this.generateOTP();
    await this.createOTPRecord(email, otp);
    await emailService.sendOTP(email, otp);

    return {
      userId: user.id,
      requiresVerification: true,
    };
  }

  async verifyOTP(email, otp) {
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

    await prisma.otp.delete({
      where: { id: otpRecord.id }
    });

    const user = await prisma.user.update({
      where: { email },
      data: { isVerified: true },
    });

    await emailService.sendWelcomeEmail(email, user.name);

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

  async resendOTP(email) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.isVerified) {
      throw new Error("Email is already verified");
    }

    const otp = this.generateOTP();
    await this.createOTPRecord(email, otp);
    await emailService.sendOTP(email, otp);

    return {};
  }

  async login(email, password) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    if (!user.isVerified) {
      const otp = this.generateOTP();
      await this.createOTPRecord(email, otp);
      await emailService.sendOTP(email, otp);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

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
