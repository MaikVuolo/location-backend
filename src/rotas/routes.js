import express from "express";
import routeLogin from "./rotaLogin.js"
import routeProduct from "./routesProducts.js"
import cors from "cors"
import uploadPicUserRoute from "./uploadPicUserRoute.js"

const route = (app => {
    app.use(
        cors(),
        ('/uploads', express.static('uploads')),
        express.json(),
        routeLogin,
        uploadPicUserRoute,
        routeProduct
    )
})

export default route;