const AttributeSets = require("../../models/AttributeSets");
const Category = require("../../models/Category");
let msg = "Something went wrong please try again later";

class AttributeSetsController {
    static list = async (req, res) => {
        try {
            let attributes = await AttributeSets.find()
                .sort({
                    created_at: -1,
                })
                .populate("category_id");

            let categories = await Category.find().sort({
                created_at: -1,
            });
            return res.render("admin/attribute-sets", {
                attributes,
                categories,
            });
        } catch (error) {
            return res.status(500).send(msg);
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
            return res.status(500).send(msg);
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
            return res.status(500).send(msg);
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
            return res.status(500).send(msg);
        }
    };
}

module.exports = AttributeSetsController;
