import express from "express";
const app = express();

app.use(express.json());

import prosecutionOfficeRoutes from "./routes/presecutionOffice.route";
import fiscalRoute from "./routes/fiscal.route";
import userRoute from "./routes/user.route";
import caseStateRoute from "./routes/caseState.route";
import caseRoute from "./routes/case.route";
import logRoute from "./routes/log.route";
app.use("/prosecution-offices", prosecutionOfficeRoutes);
app.use("/prosecution", fiscalRoute);
app.use("/users", userRoute);
app.use("/case-state", caseStateRoute);
app.use("/case", caseRoute);
app.use("/logs", logRoute);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});