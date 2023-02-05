
const { SupportSectionRouter } = require("./support/support.router");
const router = require("express").Router();


// router.use("/user", UserAuthRoutes)
// router.use("/admin",VerifyAccessToken, AdminRoutes)
// router.use("/developer", DeveloperRoutes)
// // router.use("/blogs", blogApiPrisma)
// // router.use("/category", CategoryApiPrisma)
// router.use("/graphql", graphqlHTTP(graphqlConfig))
router.use("/support", SupportSectionRouter)
// router.use("/", HomeRoutes)
module.exports = {
    AllRoutes : router
}