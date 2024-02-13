const express = require("express");

const landingRoute = require("./landing.route");
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const invoiceRoute = require("./invoice.route");
const itemRoute = require("./item.route");
const router = express.Router();

const defaultRoutes = [
  {
    path: "",
    route: landingRoute,
  },
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/invoice",
    route: invoiceRoute,
  },
  {
    path: "/item",
    route: itemRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
