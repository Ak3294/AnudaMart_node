// controllers/userController.js
const User = require("../../models/User");

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
}

module.exports = UserController;
