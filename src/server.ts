import app from "./app";
import "./setup.ts";

const port = +process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Running on port ${port}.`);
});