import express from "express";
// import DELETE from "./DELETE";
import GET from "./GET"
import POST from "./POST";
// import PATCH from "./PATCH";
// import PUT from "./PUT"

const app = express();
app.use(
    GET,
    POST,
    // PUT,
    // DELETE,
    // PATCH,
);
export default app;