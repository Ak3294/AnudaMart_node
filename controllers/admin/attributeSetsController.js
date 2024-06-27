const AttributeSets = require("../../models/AttributeSets");
const Category = require("../../models/Category");

class AttributeSetsController {
    static list = async (req, res) => {
        try {
            let attributes = await AttributeSets.find()
                .sort({
                    created_at: -1,
                })
                .populate("category_id");

            let categories = await Category.find({
                parent_id: null,
            }).sort({
                created_at: -1,
            });
            return res.render("admin/attribute-sets", {
                attributes,
                categories,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                message: "Error creating attribute sets: " + error.message,
            });
        }
    };

    static add = async (req, res) => {
        try {
            const insertRecord = AttributeSets({
                title: req.body.title,
                category_id: req.body.category_id,
            });
            await insertRecord.save();
            return res.send({
                success: true,
                status: 200,
                message: "AttributeSet Added successfully",
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                message: "Error creating attribute sets: " + error.message,
            });
        }
    };

    static edit = async (req, res) => {
        try {
            const attributes = await AttributeSets.findOne({
                _id: req.body.editid,
            });
            await AttributeSets.findOneAndUpdate(
                {
                    _id: req.body.editid,
                },
                {
                    title: req.body.title,
                    category_id: req.body.category_id,
                    updated_at: new Date(),
                }
            );
            return res.send({
                success: true,
                status: 200,
                attributes,
                message: "AttributeSet updated successfully",
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                message: "Error updating attribute sets: " + error.message,
            });
        }
    };

    static delete = async (req, res) => {
        try {
            await AttributeSets.findByIdAndDelete(req.params.id);
            return res.send({
                success: true,
                status: 200,
                message: "AttributeSet Deleted successfully",
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                message: "Error deleting attribute sets: " + error.message,
            });
        }
    };
}

module.exports = AttributeSetsController;
