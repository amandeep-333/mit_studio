import authService from "../services/auth.service.js";

class AuthController {

  async signup(req, res) {
    try {
      const { email, password, name } = req.body;

  
      if (!email || !password || name) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required",
        });
      }

 
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Invalid email format",
        });
      }

      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: "Password must be at least 6 characters long",
        });
      }
  
      const result = await authService.signup(email, password);

      res.status(201).json({
        success: true,
        ...result,
      });
    } catch (error) {
      console.error("Signup error:", error);     
      res.status(400).json({
        success: false,      
        message: error.message || "Signup failed",
      });
    }
  }

  // Verify OTP controller
  async verifyOTP(req, res) {
    try {
      const { email, otp } = req.body;

      // Validation
      if (!email || !otp) {
        return res.status(400).json({
          success: false,
          message: "Email and OTP are required",
        });
      }

      // OTP validation
      if (otp.length !== 6 || !/^\d+$/.test(otp)) {
        return res.status(400).json({
          success: false,
          message: "OTP must be 6 digits",
        });
      }

      const result = await authService.verifyOTP(email, otp);

      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      console.error("Verify OTP error:", error);
      res.status(400).json({
        success: false,
        message: error.message || "OTP verification failed",
      });
    }
  }

  // Resend OTP controller
  async resendOTP(req, res) {
    try {
      const { email } = req.body;

      // Validation
      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Email is required",
        });
      }

      const result = await authService.resendOTP(email);

      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      console.error("Resend OTP error:", error);
      res.status(400).json({
        success: false,
        message: error.message || "Failed to resend OTP",
      });
    }
  }

  // Login controller
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validation
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required",
        });
      }

      const result = await authService.login(email, password);

      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(400).json({
        success: false,
        message: error.message || "Login failed",
      });
    }
  }

  // Get current user controller
  async getCurrentUser(req, res) {
    try {
      const userId = req.user.userId; // From auth middleware
      const user = await authService.getUserById(userId);

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      console.error("Get current user error:", error);
      res.status(400).json({
        success: false,
        message: error.message || "Failed to get user",
      });
    }
  }
}

export default new AuthController();

