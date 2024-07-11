const Brand = require("../../models/Brand");
const Status = require("../../models/Status");

class BrandController {
    static list = async (req, res) => {
        try {
            const brands = await Brand.find()
                .sort({
                    created_at: -1,
                })
                .populate("status_id");
            let statuses = await Status.find().sort({
                created_at: -1,
            });
            return res.render("admin/brand", { brands, statuses });
        } catch (error) {
            return res.status(500).send({
                message: "Error fetching brands: " + error.message,
            });
        }
    };

    static add = async (req, res) => {
        try {
            const { name, status_id } = req.body;
            const insertRecord = new Brand({ name, status_id });
            await insertRecord.save();
            return res.send({
                success: true,
                status: 200,
                message: "Brand added successfully",
            });
        } catch (error) {
            return res
                .status(500)
                .send({ message: "Error creating brand: " + error.message });
        }
    };
    static edit = async (req, res) => {
        try {
            const brand = await Brand.findOne({
                _id: req.body.editid,
            });
            await Brand.findByIdAndUpdate(
                {
                    _id: req.body.editid,
                },
                {
                    name: req.body.name,
                    status_id: req.body.status_id,
                }
            );
            return res.send({
                success: true,
                status: 200,
                message: "Brand updated successfully",
            });
        } catch (error) {
            console.error("Error updating brand: ", error);
            return res
                .status(500)
                .send({ message: "Error updating brand: " + error.message });
        }
    };

    static delete = async (req, res) => {
        try {
            await Brand.findByIdAndDelete(req.params.id);

            return res.send({
                success: true,
                status: 200,
                message: "Brand deleted successfully",
            });
        } catch (error) {
            return res
                .status(500)
                .send("Error deleting brand: " + error.message);
        }
    };
}

module.exports = BrandController;
