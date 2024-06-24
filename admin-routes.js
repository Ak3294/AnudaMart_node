const mainR = require("./routes/admin/main");
const dashboardR = require("./routes/admin/dashboard");
const authR = require("./routes/admin/auth");

const AdminRoutes = (app) => {
    app.use("/", mainR);
    app.use("/admin", dashboardR);
    app.use("/admin", authR);
};

module.exports = AdminRoutes;
