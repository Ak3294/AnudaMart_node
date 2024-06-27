const AttributeValue = require("../../models/AttributeValue");
const AttributeSets = require("../../models/AttributeSets");
let msg = "Something went wrong please try again later";

class AttributeValueController {
    static list = async (req, res) => {
        try {
            let attributes_values = await AttributeValue.find()
                .sort({
                    created_at: -1,
                })
                .populate("attribute_sets_id");
            let attributes = await AttributeSets.find()
                .sort({
                    created_at: -1,
                })
                .populate("category_id");
            return res.render("admin/attribute-values", {
                attributes_values,
                attributes,
            });
        } catch (error) {
            return res.status(500).send(msg);
        }
    };

    static add = async (req, res) => {
        try {
            const insertRecord = AttributeValue({
                attribute_sets_id: req.body.attribute_sets_id,
                value: req.body.value,
            });
            await insertRecord.save();
            return res.send({
                success: true,
                status: 200,
                message: "AttributeValues Added successfully",
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send(msg);
        }
    };

    static edit = async (req, res) => {
        try {
            const attributes = await AttributeValue.findOne({
                _id: req.body.editid,
            });
            await AttributeValue.findOneAndUpdate(
                {
                    _id: req.body.editid,
                },
                {
                    attribute_sets_id: req.body.attribute_sets_id,
                    value: req.body.value,
                    updated_at: new Date(),
                }
            );
            return res.send({
                success: true,
                status: 200,
                attributes,
                message: "AttributeValues updated successfully",
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send(msg);
        }
    };

    static delete = async (req, res) => {
        try {
            await AttributeValue.findByIdAndDelete(req.params.id);
            return res.send({
                success: true,
                status: 200,
                message: "AttributeValues Deleted successfully",
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send(msg);
        }
    };
}

module.exports = AttributeValueController;
