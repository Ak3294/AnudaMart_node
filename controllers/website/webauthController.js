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

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: path.join(root, "/public/dist/users"),
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "_" + Date.now() + path.extname(file.originalname)
        );
    },
});

// Init Upload
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5000000,
    },
    fileFilter: imageFilter,
}).single("image");

class webauthController {
    static register = async (req, res) => {
        try {
            const first_name = req.body.first_name;
            const last_name = req.body.last_name;
            const email = req.body.email;
            const password = req.body.password;
            const confirm_password = req.body.confirm_password;

            if (password !== confirm_password)
                return res.status(401).send({
                    message: "Password and Confirm Password do not match",
                });

            const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
            const hashedpassword = await bcrypt.hash(password, salt);
            const hashedconfirm_password = await bcrypt.hash(
                confirm_password,
                salt
            );

            const userExists = await User.findOne({
                email: email,
                user_type: "u",
            });
            if (userExists) {
                return res.status(401).send({
                    message: "User already exists",
                });
            }
            const user = await User({
                // image: req.file.filename,
                user_type: "u",
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: hashedpassword,
                confirm_password: hashedconfirm_password,
            });
            await user.save();
            return res.send({
                message: "User registered successfully",
                status: true,
                success: true,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                message: "Something went wrong please try again later",
                error: error.message,
            });
        }
    };

    static loginPOST = async (req, res) => {
        try {
            const email = req.body.email;
            const password = req.body.password;
            if (!email)
                return res.send({
                    message: "Please provide an email to login",
                });
            if (!password)
                return res.send({
                    message: "Please provide a password to login",
                });
            const user = await User.findOne({
                email: email,
            });
            if (!user)
                return res.send({
                    message: "User not found",
                });
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword)
                return res.status(500).send({
                    message: "Invalid password",
                });

            var d = new Date();
            d.setMonth(d.getMonth() + 3);
            var e = d.getTime();
            const token = jwt.sign(
                { id: user._id, expiry_time: e },
                process.env.TOKEN_SECRET
            );
            const tokenExpiryTime = moment(parseInt(token.updated_at)).add(
                30,
                "minutes"
            );
            const currentTime = moment(Date.now());
            if (currentTime > tokenExpiryTime) {
                return res.status(401).send({
                    message: "Token expired",
                    token: null,
                });
            } else {
                return res.status(200).send({
                    token,
                    user_type: user.user_type,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                message: "Something went wrong please try again later",
                error: error.message,
            });
        }
    };

    static change_password = async (req, res) => {
        try {
            const { password, new_password } = req.body;
            const { authorization } = req.headers;
            if (authorization == null)
                return res.status(401).send({
                    message: "please check authorization",
                });
            const token = authorization.replace("Bearer ", "");
            const payload = jwt.decode(token, process.env.TOKEN_SECRET);
            if (payload == null)
                return res.status(401).send({
                    message: "token is required",
                });
            const user = await User.findById(payload.id);
            if (!user)
                return res.status(401).send({
                    message: "User not found",
                });

            if (!password) {
                return res.status(401).send({
                    message: "Old Password is required",
                });
            }

            if (!new_password)
                return res.status(401).send({
                    message: "New Password is required",
                });

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword)
                return res.status(500).send({
                    message: "Invalid Old Password",
                });

            const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
            const hashedPassword = await bcrypt.hash(new_password, salt);

            await User.findOneAndUpdate(
                { _id: user._id },
                { password: hashedPassword }
            );
            return res.status(200).send({
                message: "password changed successfully",
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                message: "Something went wrong please try again later",
                error: error.message,
            });
        }
    };

    static user_profile = async (req, res) => {
        try {
            var token = req.body.token;
            let mediaUrl = baseURL + "/dist/users/";

            const payload = jwt.decode(token, process.env.TOKEN_SECRET);
            const user = await User.findById(payload.id);
            if (!user)
                return res.status(401).send({
                    message: "User not found",
                    status: false,
                    success: false,
                });

            res.send({
                user: {
                    user_type: user.user_type,
                    name: user.name,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    phone: user.phone,
                    dob: user.dob,
                    address: user.address,
                    address2: user.address2,
                    city: user.city,
                    pincode: user.pincode,
                    additional_info: user.additional_info,
                    image: user.image ? mediaUrl + user.image : null,
                },
                mediaUrl,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                message: "Something went wrong please try again later",
                error: error.message,
            });
        }
    };

    static update_profile = async (req, res) => {
        try {
            upload(req, res, async function (err) {
                var token = req.body.token;
                const payload = jwt.decode(token, process.env.TOKEN_SECRET);
                const user = await User.findById(payload.id);
                if (!user)
                    return res.status(401).send({
                        message: "User not found",
                        status: false,
                        success: false,
                    });

                let data = {
                    image: req.file ? req.file.filename : "",
                    name: req.body.name,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    phone: req.body.phone,
                    dob: req.body.dob,
                    address: req.body.address,
                    address2: req.body.address2,
                    city: req.body.city,
                    pincode: req.body.pincode,
                    additional_info: req.body.additional_info,
                };
                let userData = {};
                for (let i in data) {
                    if (data[i] != "") {
                        userData[i] = data[i]; // json object
                    }
                }

                const profile = await User.findOne({
                    _id: user._id,
                });
                await User.findOneAndUpdate(
                    {
                        _id: profile._id,
                    },
                    { $set: userData }
                );

                let updatedData = await profile.save();
                return res.status(201).send({
                    message: "profile Update Successfully",
                    status: true,
                    success: true,
                    data: updatedData,
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

    static logout = async (req, res) => {
        try {
            req.session.destroy();
            return res.send("success");
        } catch (error) {
            return res.status(500).send({
                message: "Something went wrong please try again later",
                error: error.message,
            });
        }
    };

    static switch_account = async (req, res) => {
        try {
            var token = req.body.token;
            const { switch_account } = req.body;
            const payload = jwt.decode(token, process.env.TOKEN_SECRET);
            const user = await User.findById(payload.id);
            if (!user)
                return res.status(401).send({
                    message: "User not found",
                });

            if (user.user_type === switch_account) {
                return res.send({
                    message: "You are already on this account",
                });
            }
            await User.findOneAndUpdate(
                { _id: user._id },
                { switch_account: switch_account }
            );

            return res.send({
                message: "Account switched successfully",
                success: true,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                message: "Something went wrong please try again later",
                error: error.message,
            });
        }
    };

    // static coupon_verify = async (req, res) => {
    //     try {
    //         var token = req.body.token;
    //         var coupon_code = req.body.coupon_code;
    //         const payload = jwt.decode(token, process.env.TOKEN_SECRET);
    //         const user = await User.findById(payload.id);
    //         if (!user) return res.status(401).send("User not found");

    //         let findData = { coupon_code: coupon_code, isActive: true };

    //         let findRec = await Coupon.findOne(findData);
    //         if (!findRec) return res.status(401).send("Invalid coupon");

    //         if (findRec.is_used == true)
    //             return res.status(401).send("Coupon already used");
    //         if (new Date() > findRec.expiry_date)
    //             return res.status(401).send("Coupon has expired");

    //         return res.send({
    //             message: "Coupon verified successfully",
    //             success: true,
    //             data: {
    //                 coupon_code: coupon_code,
    //                 discount: findRec.discount,
    //                 valid_start_date: findRec.valid_start_date,
    //                 expiry_date: findRec.expiry_date,
    //             },
    //         });
    //     } catch (error) {
    //         console.log(error);
    //         return res.status(500).send({
    //             message: "Something went wrong please try again later",
    //             error: error.message,
    //         });
    //     }
    // };
}

module.exports = webauthController;
