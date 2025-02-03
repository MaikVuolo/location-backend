import express from "express";
import routeLogin from "./rotaLogin.js"
import routeProduct from "./routesProducts.js"
import cors from "cors"
import uploadPicUserRoute from "./uploadPicUserRoute.js"
import routeUsers from "./routeUsers.js"

const route = (app => {
    app.use(
        cors(),
        ('/uploads', express.static('uploads')),
        express.json(),
        routeLogin,
        uploadPicUserRoute,
        routeProduct,
        routeUsers
    )
})

export default route;