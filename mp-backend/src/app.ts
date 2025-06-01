import express from "express";
const app = express();

app.use(express.json());

import prosecutionOfficeRoutes from "./routes/presecutionOffice.route";
import fiscalRoute from "./routes/fiscal.route";
app.use("/prosecution-offices", prosecutionOfficeRoutes);
app.use("/prosecution", fiscalRoute);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});