import express from "express";
const app = express();

app.use(express.json());

import prosecutionOfficeRoutes from "./routes/presecutionOffice.route";
app.use("/prosecution-offices", prosecutionOfficeRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});