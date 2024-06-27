const Brand = require("../../models/Brand");
const Status = require("../../models/Status");

class BrandController {
    static list = async (req, res) => {
        try {
            const brands = await Brand.find().sort({
                created_at: -1,
            });
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
            console.log(req.body);
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
}

module.exports = BrandController;
