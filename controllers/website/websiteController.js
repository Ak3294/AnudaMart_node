const Category = require("../../models/Category");
const Product = require("../../models/Product");
const baseURL = `http://192.168.29.130:3000`;

class WebsiteController {
    static category = async (req, res) => {
        let mediaUrl = baseURL + "/dist/category/";
        try {
            const { parent_id } = req.params;
            if (!parent_id) {
                const categories = await Category.find({ parent_id: null });
                return res.json({
                    message: "Success",
                    success: true,
                    data: categories,
                    mediaUrl,
                });
            } else {
                const categories = await Category.find({ parent_id });
                return res.json({
                    message: "Success",
                    success: true,
                    data: categories,
                    mediaUrl,
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

    static products_by_category = async (req, res) => {
        try {
            let mediaUrl = baseURL + "/dist/product/";
            const _id = req.query._id;
            if (!_id) {
                return res.status(400).send("Category ID is required");
            }
            const products = await Product.find({ category_id: _id })
                .populate("category_id brand_id")
                .sort({ created_at: -1 });
            const responseData = products.map((product) => ({
                _id: product._id,
                product_name: product.product_name,
                thumbnail: product.thumbnail
                    ? mediaUrl + product.thumbnail
                    : null,
                unit_price: product.unit_price,
                special_discount_type: product.special_discount_type,
                special_discount: product.special_discount,
                special_discount_period: product.special_discount_period,
                brand_id: product.brand_id,
                rating: product.rating || 3,
            }));
            return res.send({
                message: "Success",
                success: true,
                data: responseData,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                message: "Something went wrong please try again later",
                error: error.message,
            });
        }
    };

    static get_all_products = async (req, res) => {
        try {
            let mediaUrl = baseURL + "/dist/product/";
            const products = await Product.find({})
                .populate("category_id brand_id")
                .sort({ created_at: -1 });

            const responseData = products.map((product) => ({
                _id: product._id,
                product_name: product.product_name,
                thumbnail: product.thumbnail
                    ? mediaUrl + product.thumbnail
                    : null,
                category_id: product.category_id,
                unit_price: product.unit_price,
                special_discount_type: product.special_discount_type,
                special_discount: product.special_discount,
                special_discount_period: product.special_discount_period,
                brand_id: product.brand_id,
                rating: product.rating ? product.rating : 1,
            }));
            return res.send({
                message: "Success",
                success: true,
                data: responseData,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                message: "Something went wrong please try again later",
                error: error.message,
            });
        }
    };

    static get_product_details = async (req, res) => {
        try {
            let mediaUrl = baseURL + "/dist/product/";
            const { product_id } = req.body;
            if (!product_id) {
                return res.json({
                    message: "product_id is required",
                    success: false,
                });
            }
            const product = await Product.findOne({ _id: product_id })
                .populate("category_id brand_id")
                .sort({ created_at: -1 });
            return res.send({
                message: "Success",
                success: true,
                data: product,
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
}

module.exports = WebsiteController;
