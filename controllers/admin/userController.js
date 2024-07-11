const User = require("../../models/User");
// const Coupon = require("../../models/Coupon");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const root = process.cwd();
const moment = require("moment");
const baseURL = `http://192.168.29.130:3000`;
const imageFilter = require("../../config/imageFilter");
const fs = require("fs");
require("dotenv").config;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = path.join(__dirname, "/public/dist/users/");
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage }).single("image"); // Update 'image' to your actual field name if different

class UserController {
    static list = async (req, res) => {
        try {
            const users = await User.find({
                user_type: "u",
            });
            return res.render("admin/user", { users });
        } catch (error) {
            return res
                .status(500)
                .send("Error fetching users: " + error.message);
        }
    };

    static add = async (req, res) => {
        const {
            first_name,
            last_name,
            email,
            password,
            confirmpassword: confirm_password,
        } = req.body;

        if (password !== confirm_password) {
            return res.status(401).json({
                message: "Password and Confirm Password do not match",
            });
        }

        try {
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(password, salt);

            const userExists = await User.findOne({
                email: email,
                user_type: "u",
            });

            if (userExists) {
                return res.status(401).json({ message: "User already exists" });
            }

            const user = new User({
                user_type: "u",
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: hashedPassword,
            });

            await user.save();
            return res.json({
                message: "User registered successfully",
                success: true,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Something went wrong, please try again later",
                error: error.message,
            });
        }
    };

    static edit = async (req, res) => {
        try {
            upload(req, res, async function (err) {
                if (req.fileValidationError) {
                    return res.send(req.fileValidationError);
                } else if (err instanceof multer.MulterError) {
                    console.log(err);
                    return res.send(err);
                } else if (err) {
                    console.log(err);
                    return res.send(err);
                }

                const user = await User.findOne({ _id: req.body.editid });

                if (!user) {
                    return res.status(404).send({ message: "user not found" });
                }

                let updatedData = {
                    image: req.file ? req.file.filename : "",
                    first_name: req.body.edit_first_name,
                    last_name: req.body.edit_last_name,
                    email: req.body.edit_email,
                    phone: req.body.edit_phone,
                    dob: req.body.edit_dob,
                    address: req.body.edit_address,
                    pincode: req.body.edit_pincode,
                    additional_info: req.body.edit_additional_info,
                };
                let userData = {};
                for (let i in updatedData) {
                    if (updatedData[i] != "") {
                        userData[i] = updatedData[i]; // json object
                    }
                }
                await User.findOneAndUpdate(
                    { _id: req.body.editid },
                    updatedData
                );

                return res.status(200).send({
                    message: "User Update Successfully",
                });
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                message: "Something went wrong please try again later",
                error: error.message,
            });
        }
    };
}

module.exports = UserController;
