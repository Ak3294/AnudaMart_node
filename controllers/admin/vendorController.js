const User = require("../../models/User");
const Vendor = require("../../models/Vendor");
// const Coupon = require("../../models/Coupon");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const root = process.cwd();
const moment = require("moment");
const baseURL = `http://192.168.29.130:3000`;
const imageFilter = require("../../config/imageFilter");
require("dotenv").config;
const Status = require("../../models/Status");
const { Console } = require("console");

// Set storage engine
const storage = multer.diskStorage({
    destination: "/public/dist/vendor/",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}.jpg`);
    },
});

// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // Limit file size to 1MB
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
}).fields([
    { name: "image", maxCount: 1 },
    { name: "vendorImage", maxCount: 1 },
    { name: "aadhaarFrontImage", maxCount: 1 },
    { name: "aadhaarBackImage", maxCount: 1 },
    { name: "panFrontImage", maxCount: 1 },
    { name: "signatureImage", maxCount: 1 },
]);

class VendorController {
    static list = async (req, res) => {
        let statuses = await Status.find().sort({
            created_at: -1,
        });
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const startIndex = (page - 1) * limit;
        try {
            const users = await User.find({ user_type: "v" })
                .skip(startIndex)
                .limit(limit);
            const totalUsers = await User.countDocuments();
            const totalPages = Math.ceil(totalUsers / limit);
            return res.render("admin/vendor", {
                statuses,
                users,
                currentPage: page,
                totalUsers,
                totalPages,
            });
        } catch (error) {
            return res
                .status(500)
                .send("Error fetching vendors: " + error.message);
        }
    };

    static add = async (req, res) => {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).send({ message: err });
            }

            const { file, body } = req;
            const image = file ? file.filename : null;
            const {
                first_name,
                last_name,
                email,
                password,
                confirmpassword: confirm_password,
                status_id,
            } = body;

            console.log(
                image,
                first_name,
                last_name,
                email,
                password,
                confirm_password,
                status_id
            );

            if (!image) {
                return res.status(400).send({ message: "Image is required" });
            }

            if (password !== confirm_password) {
                return res.status(401).send({
                    message: "Password and Confirm Password do not match",
                });
            }

            try {
                const saltRounds = 10;
                const salt = await bcrypt.genSalt(saltRounds);
                const hashedpassword = await bcrypt.hash(password, salt);

                const vendorExists = await User.findOne({
                    email: email,
                    user_type: "v",
                });

                if (vendorExists) {
                    return res.status(401).send({
                        message: "User already exists",
                    });
                }

                const vendor = new User({
                    image: image,
                    user_type: "v",
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    password: hashedpassword,
                    status_id: status_id,
                });

                await vendor.save();
                return res.send({
                    message: "User registered successfully",
                    status: true,
                    success: true,
                });
            } catch (error) {
                console.log(error);
                return res.status(500).send({
                    message: "Something went wrong, please try again later",
                    error: error.message,
                });
            }
        });
    };

    static datepicker = async (req, res) => {
        try {
            const { startDate, endDate } = req.query;

            // Convert query string dates to Date objects
            const start = new Date(startDate);
            const end = new Date(endDate);
            end.setHours(23, 59, 59, 999); // Include the entire end date


            // Format created_at to MM/DD/YYYY
            const formattedUsers = users.map((user) => ({
                ...user.toObject(),
                created_at: new Date(user.created_at).toLocaleDateString(
                    "en-US"
                ),
            }));

            return res.json({ users: formattedUsers }); // Send JSON response
        } catch (error) {
            return res
                .status(500)
                .send("Error fetching vendors: " + error.message);
        }
    };

    // POST route to handle the update operation
    static edit = async (req, res) => {
        try {
            const user_id = req.params.id;
            const user = await User.findOne({ _id: user_id });
            const vendors = await Vendor.findOne({ user_id: user._id });

            res.render("admin/edit-vendor", { vendors, user });
        } catch (error) {
            console.error("Error fetching user:", error);
            return res.status(500).send("Error fetching user details");
        }
    };

    static update = async (req, res) => {
        try {
            const user_id = req.params.id;

            let updateduserData = {
                name: req.body.exampleInputFullName,
                first_name: req.body.exampleInputFirstName,
                last_name: req.body.exampleInputLastName,
                email: req.body.exampleInputEmail,
                phone: req.body.exampleInputPhone,
                dob: req.body.exampleInputDOB,
                address: req.body.exampleInputAddress,
                address2: req.body.exampleInputAddress2,
                pincode: req.body.exampleInputPinCode,
                additional_info: req.body.exampleInputAdditionalInfo,
            };

            let updatedvendorData = {
                aadhar_no: req.body.aadhaarnumber,
                pan_no: req.body.panCardNumber,
                gst_no: req.body.gstNumber,
                account_holder_name: req.body.accountHolderName,
                ifsc_code: req.body.ifscCode,
                bank_name: req.body.bankname,
                account_no: req.body.accountNumber,
            };

            // Check if files are uploaded and update the paths accordingly
            if (req.files) {
                if (req.files.vendorImage) {
                    updateduserData.image = req.files.vendorImage[0].filename;
                }
                if (req.files.aadhaarFrontImage) {
                    updatedvendorData.aadhar_front_photo =
                        req.files.aadhaarFrontImage[0].filename;
                }
                if (req.files.aadhaarBackImage) {
                    updatedvendorData.aadhar_back_photo =
                        req.files.aadhaarBackImage[0].filename;
                }
                if (req.files.panFrontImage) {
                    updatedvendorData.pan_front_photo =
                        req.files.panFrontImage[0].filename;
                }
                if (req.files.signatureImage) {
                    updatedvendorData.signature =
                        req.files.signatureImage[0].filename;
                }
            }

            // Update the user details in the database
            await User.findOneAndUpdate(
                { _id: user_id },
                { $set: updateduserData },
                { new: true, upsert: true }
            );

            // Update the vendor details in the database
            await Vendor.findOneAndUpdate(
                { user_id: user_id },
                { $set: updatedvendorData },
                { new: true, upsert: true }
            );

            res.status(200).json({
                status: 200,
                message: "Vendor details updated successfully",
            });
        } catch (error) {
            console.error("Error updating vendor details:", error);
            return res.status(500).json({
                status: 500,
                message: "Error updating vendor details",
            });
        }
    };
}

module.exports = VendorController;
