import OTPModule from "../model/OTPmodel.js";
import User from '../model/User.js';
import nodemailer from "nodemailer";
import otpGenerator from 'otp-generator';
import bcrypt from "bcryptjs";


export const resetPassword = async (req, res) => {
  try {
    const email = req.body.email;
    // console.log(email);
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send("User Not Found!");
    }

    const otp = otpGenerator.generate(4, { upperCase: false, specialChars: false });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    var mailOptions = {
      from: process.env.MY_EMAIL,
      to: email,
      subject: "Sending Email using Node.js",
      html: `OTP-${otp}`,
    };

    transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        // console.log(error);
        res.status(500).send("An error occurred while sending the email");
      } else {
        // console.log("Email sent: " + info.response);
        res.status(200).send("Email sent successfully");

        const existingMail = await OTPModule.findOne({ email: email });
        if (!existingMail) {
          const newOTP = new OTPModule({
            email: email,
            otp: otp,
          });
          await newOTP.save();
        } else {
          OTPModule.findOneAndUpdate(
            { email: email },
            { otp: otp },
            { new: true },
          ).exec();
        }
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred");
  }
};


export const verifyOTP = async (req, res, next) => {
  try {
    // console.log(req.body);
    const email = req.body.email;
    const userOTP = req.body.otp;

    const otpData = await OTPModule.findOne({ email: email });

    if (!otpData) {
      return res.status(400).send("OTP not found");
    }

    // console.log(otpData.otp);
    // console.log(userOTP);

    if (userOTP === otpData.otp) {
      res.status(200).send("OTP verified successfully");
    } else {
      res.status(401).send("Invalid OTP");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("An error occurred");
  }
};

export const changePassword = async (req, res) => {
  // console.log(req.body);
  const email = req.body.email;
  const pass = req.body.password;

  const existingMail = await User.findOne({ email: email });

  if (!existingMail) {
    return res.status(400).send("Wrong Email");
  }

  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pass, salt);
    User.findOneAndUpdate(
      { email: email },
      { password: hash },
      { new: true }
    ).exec();

    return res.status(200).send("Password Updated!!");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error Occured");
  }
};