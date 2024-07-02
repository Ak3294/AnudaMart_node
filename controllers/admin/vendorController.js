// controllers/admin/vendorController.js
const Vendor = require("../../models/User");

class VendorController {
    static list = async (req, res) => {
        try {
            const users = await Vendor.find({ user_type: "v" });
            return res.render("admin/vendor", { users });
        } catch (error) {
            return res
                .status(500)
                .send("Error fetching vendors: " + error.message);
        }
    };
    static datepicker = async (req, res) => {
        try {
            const { startDate, endDate } = req.query;

            // Convert query string dates to Date objects
            const start = new Date(startDate);
            const end = new Date(endDate);
            end.setHours(23, 59, 59, 999); // Include the entire end date

            // Query MongoDB to find users within the date range
            const users = await User.find({
                user_type: "v",
                created_at: { $gte: start, $lte: end },
            });

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

    // GET route to render the edit form
    static editVendorForm = async (req, res) => {
        try {
            // Extract user ID from query parameters
            const userId = req.query.userId;

            // Fetch user details from the database
            const user = await Vendor.findById(userId);

            // if (!user) {
            //     return res.status(404).send("User not found");
            // }

            // Render the edit form with pre-filled values
            res.render("admin/editVendorForm", { user }); // Adjust 'admin/editVendorForm' to your actual edit form view
        } catch (error) {
            console.error("Error fetching user:", error);
            return res.status(500).send("Error fetching user details");
        }
    };
}

module.exports = VendorController;
