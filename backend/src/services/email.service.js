import transporter from "../config/email.config.js";


class EmailService {
  // Send OTP email
  async sendOTP(email, otp) {
    const mailOptions = {
      from: `"Virtual Studio" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Email Verification - OTP',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9f9f9;
            }
            .content {
              background-color: white;
              padding: 30px;
              border-radius: 10px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .otp-box {
              background-color: #f0f0f0;
              padding: 20px;
              text-align: center;
              border-radius: 5px;
              margin: 20px 0;
            }
            .otp {
              font-size: 32px;
              font-weight: bold;
              letter-spacing: 5px;
              color: #4F46E5;
            }
            .footer {
              margin-top: 20px;
              font-size: 12px;
              color: #666;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="content">
              <h2>Email Verification</h2>
              <p>Thank you for signing up! Please use the following OTP to verify your email address:</p>
              
              <div class="otp-box">
                <div class="otp">${otp}</div>
              </div>
              
              <p><strong>This OTP is valid for 10 minutes.</strong></p>
              <p>If you didn't request this verification, please ignore this email.</p>
              
              <div class="footer">
                <p>This is an automated email, please do not reply.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('OTP Email sent:', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Error sending OTP email:', error);
      throw error;
    }
  }

  // Send welcome email after successful verification
  async sendWelcomeEmail(email, name) {
    const mailOptions = {
      from: `"Virtual Studio" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Welcome to Virtual Studio!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9f9f9;
            }
            .content {
              background-color: white;
              padding: 30px;
              border-radius: 10px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .button {
              display: inline-block;
              padding: 12px 30px;
              background-color: #4F46E5;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="content">
              <h2>Welcome to Virtual Studio! 🎉</h2>
              <p>Hi ${name || 'there'},</p>
              <p>Your email has been successfully verified. You're all set to start using Virtual Studio!</p>
              <p>Thank you for joining us.</p>
              <p>Best regards,<br>Virtual Studio Team</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Welcome email sent to:', email);
    } catch (error) {
      console.error('Error sending welcome email:', error);
      // Don't throw error as this is not critical
    }
  }
}

export default new EmailService();