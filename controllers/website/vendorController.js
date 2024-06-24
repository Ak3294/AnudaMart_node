const User = require("../../models/User");
const Vendor = require("../../models/Vendor");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const root = process.cwd();
const imageFilter = require("../../config/imageFilter");

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: path.join(root, "/public/dist/vendor"),
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}.jpg`);
    },
});

// Init Upload
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5000000,
    },
    fileFilter: imageFilter,
}).fields([
    { name: "aadhar_front_photo", maxCount: 1 },
    { name: "aadhar_back_photo", maxCount: 1 },
    { name: "pan_front_photo", maxCount: 1 },
    { name: "signature", maxCount: 1 },
]);

class VendorController {
    static register = async (req, res) => {
        try {
            upload(req, res, async function (err) {
                if (
                    !req.files["aadhar_front_photo"] ||
                    !req.files["aadhar_back_photo"] ||
                    !req.files["pan_front_photo"] ||
                    !req.files["signature"]
                ) {
                    return res.send("Please upload all the required files");
                }

                const {
                    name,
                    first_name,
                    last_name,
                    email,
                    phone,
                    password,
                    dob,
                    address,
                    address2,
                    pincode,
                    city,
                    additional_info,
                    aadhar_no,
                    pan_no,
                    gst_no,
                    account_holder_name,
                    ifsc_code,
                    bank_name,
                    account_no,
                } = req.body;

                var mobileRegex = new RegExp("^[0-9]{10}$");
                var emailRegex = new RegExp(
                    "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"
                );

                if (!emailRegex.test(email))
                    return res.send("Invalid email address");
                if (!mobileRegex.test(phone))
                    return res.send("Invalid phone number");

                const salt = await bcrypt.genSalt(
                    Number(process.env.SALT_ROUNDS)
                );
                const hashedpassword = await bcrypt.hash(password, salt);
                const userExists = await User.findOne({ email });
                if (userExists) {
                    return res.status(401).send("user already exists");
                }

                // Create and save the new user
                const newUser = new User({
                    user_type: "v",
                    name: name,
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    dob: dob,
                    phone: phone,
                    address: address,
                    address2: address2,
                    pincode: pincode,
                    city: city,
                    additional_info: additional_info,
                    password: hashedpassword,
                });
                await newUser.save();

                // Create and save the new vendor
                const newVendor = new Vendor({
                    user_id: newUser._id,
                    aadhar_front_photo:
                        req.files["aadhar_front_photo"][0].filename,
                    aadhar_back_photo:
                        req.files["aadhar_back_photo"][0].filename,
                    aadhar_no,
                    pan_front_photo: req.files["pan_front_photo"][0].filename,
                    pan_no,
                    gst_no,
                    signature: req.files["signature"][0].filename,
                    account_holder_name,
                    ifsc_code,
                    bank_name,
                    account_no,
                });
                await newVendor.save();
                return res.send("Vendor Registration successful");
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .send("Something went wrong please try again later");
        }
    };
}

module.exports = VendorController;
