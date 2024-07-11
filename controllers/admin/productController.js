const Product = require("../../models/Product");
const User = require("../../models/User");
const Category = require("../../models/Category");
const Brand = require("../../models/Brand");
const Status = require("../../models/Status");
const ProductStock = require("../../models/ProductStock");
const AttributeValue = require("../../models/AttributeValue");
const AttributeSets = require("../../models/AttributeSets");
const multer = require("multer");
const path = require("path");
const root = process.cwd();
const imageFilter = require("../../config/imageFilter");
const pdfFilter = require("../../config/pdfFilter");
const fs = require("fs");

class ProductController {
    static list = async (req, res) => {
        try {
            const products = await Product.find().populate("category_id").sort({
                created_at: -1,
            });
            return res.render("admin/products", { products });
        } catch (error) {
            return res.status(500).send({
                message: "Error fetching Product List: " + error.message,
            });
        }
    };

    static addGet = async (req, res) => {
        try {
            let categories = await Category.find({
                parent_id: null,
            }).sort({
                created_at: -1,
            });
            let vendor = await User.find({
                user_type: "v",
            }).sort({
                created_at: -1,
            });
            let brand = await Brand.find().sort({
                created_at: -1,
            });
            let status = await Status.find().sort({
                created_at: -1,
            });
            let attributes = await AttributeSets.find()
                .sort({
                    created_at: -1,
                })
                .populate("category_id");

            let attributeValues = await AttributeValue.find()
                .sort({
                    created_at: -1,
                })
                .populate("attribute_sets_id");

            return res.render("admin/add-product", {
                categories,
                vendor,
                brand,
                status,
                attributes,
                attributeValues,
            });
        } catch (error) {
            return res.status(500).send({
                message: "Error fetching Product Add: " + error.message,
            });
        }
    };

    static getAttributeValues = async (req, res) => {
        try {
            const attributeSetIds = req.body.attributeSetIds; // Assuming you send IDs as a POST request
            const attributeValues = await AttributeValue.find({
                attribute_sets_id: { $in: attributeSetIds },
            }).populate("attribute_sets_id");

            return res.status(200).json(attributeValues);
        } catch (error) {
            return res.status(500).send({
                message:
                    "Error fetching Prodcuts Attribute Values: " +
                    error.message,
            });
        }
    };

    static add_product = async (req, res) => {
        try {
            upload(req, res, async function (err) {
                if (err) {
                    return res.status(400).send({
                        message: "Error uploading files: " + err.message,
                    });
                }
                if (req.fileValidationError) {
                    return res.status(400).send({
                        message: req.fileValidationError,
                    });
                }

                const data = req.body;
                const files = req.files || {};
                const insertRecord = new Product({
                    vendor_id: data.vendor_id,
                    product_name: data.product_name,
                    category_id: data.category_id,
                    brand_id: data.brand_id,
                    unit: data.unit,
                    min_order_quantity: data.min_order_quantity,
                    tags: data.tags,
                    slug: data.slug,
                    status_id: data.status_id,
                    thumbnail: files.thumbnail
                        ? files.thumbnail[0].filename
                        : "",
                    gallery_image: Array.isArray(files.gallery_image)
                        ? files.gallery_image.map((f) => f.filename)
                        : files.gallery_image
                        ? [files.gallery_image[0].filename]
                        : [],
                    video_url: data.video_url,
                    unit_price: data.unit_price,
                    special_discount_type: data.special_discount_type,
                    special_discount: data.special_discount,
                    special_discount_period: data.special_discount_period,
                    min_stock_quantity: data.min_stock_quantity,
                    stock_visibility: data.stock_visibility,
                    variant: data.variant === "on" ? true : false,
                    short_description: data.short_description,
                    long_description: data.long_description,
                    description_image: Array.isArray(files.description_image)
                        ? files.description_image.map((f) => f.filename)
                        : files.description_image
                        ? [files.description_image[0].filename]
                        : [],
                    pdf: files.pdf ? files.pdf[0].filename : "",
                    is_featured: data.is_featured === "on" ? true : false,
                    todays_deal: data.todays_deal === "on" ? true : false,
                    meta_title: data.meta_title,
                    meta_description: data.meta_description,
                    meta_keywords: data.meta_keywords,
                    meta_image: Array.isArray(files.meta_image)
                        ? files.meta_image.map((f) => f.filename)
                        : files.meta_image
                        ? [files.meta_image[0].filename]
                        : [],
                });

                if (data.variant === "on") {
                    const attributeValueIds = Array.isArray(
                        data.attribute_value_id
                    )
                        ? data.attribute_value_id
                        : [data.attribute_value_id];
                    const skus = Array.isArray(data.sku)
                        ? data.sku
                        : [data.sku];
                    const currentStocks = Array.isArray(data.current_stock)
                        ? data.current_stock
                        : [data.current_stock];
                    const prices = Array.isArray(data.price)
                        ? data.price
                        : [data.price];
                    const images = Array.isArray(files.image)
                        ? files.image.map((f) => f.filename)
                        : [];

                    const filteredAttributeValueIds = attributeValueIds.filter(
                        (val) => val
                    );
                    const filteredSkus = skus.filter((val) => val);
                    const filteredCurrentStocks = currentStocks.filter(
                        (val) => val
                    );
                    const filteredPrices = prices.filter((val) => val);

                    const productStock = new ProductStock({
                        attribute_value_id: filteredAttributeValueIds,
                        product_id: insertRecord._id,
                        sku: filteredSkus,
                        current_stock: filteredCurrentStocks,
                        price: filteredPrices,
                        image: images,
                    });
                    await productStock.save();
                }
                await insertRecord.save();
                return res.send({
                    success: true,
                    status: 200,
                    message: "Product added successfully",
                });
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .send({ message: "Error creating Product: " + error.message });
        }
    };

    static edit = async (req, res) => {
        try {
            const products = await Product.findOne({
                _id: req.body.editid,
            });
            await Product.findOneAndUpdate(
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
                products,
                message: "Product updated successfully",
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send(msg);
        }
    };

    static delete = async (req, res) => {
        try {
            await Product.findByIdAndDelete(req.params.id);
            return res.send({
                success: true,
                status: 200,
                message: "Product Deleted successfully",
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send(msg);
        }
    };
}

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: path.join(root, "/public/dist/product"),
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}.jpg`);
    },
});

// Combined file filter
const fileFilter = function (req, file, cb) {
    const imageFields = [
        "thumbnail",
        "gallery_image",
        "description_image",
        "meta_image",
        "image",
    ];
    if (imageFields.includes(file.fieldname)) {
        imageFilter(req, file, cb);
    } else if (file.fieldname === "pdf") {
        pdfFilter(req, file, cb);
    } else {
        req.fileValidationError = "Unexpected field";
        return cb(new Error("Unexpected field"), false);
    }
};

// Init Upload
const upload = multer({
    storage: storage,
    // limits: {
    //     fileSize: 5000000
    // },
    fileFilter: fileFilter,
}).fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "gallery_image", maxCount: 10 },
    { name: "description_image", maxCount: 10 },
    { name: "pdf", maxCount: 1 },
    { name: "meta_image", maxCount: 10 },
    { name: "image", maxCount: 10 },
]);

module.exports = ProductController;
