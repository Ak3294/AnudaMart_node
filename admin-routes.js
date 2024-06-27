const mainR = require("./routes/admin/main");
const dashboardR = require("./routes/admin/dashboard");
const authR = require("./routes/admin/auth");
const category = require("./routes/admin/category");
const status = require("./routes/admin/status");
const attributeSets = require("./routes/admin/attributeSets");
const attributeValues = require("./routes/admin/attributeValues");
const brand = require("./routes/admin/brand");

const AdminRoutes = (app) => {
    app.use("/", mainR);
    app.use("/admin", dashboardR);
    app.use("/admin", authR);
    app.use("/admin/category", category);
    app.use("/admin/status", status);
    app.use("/admin/attribute", attributeSets);
    app.use("/admin/attribute-values", attributeValues);
    app.use("/admin/brand", brand);
};

module.exports = AdminRoutes;
