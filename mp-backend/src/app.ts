import express from "express";
const app = express();
const cors = require('cors');


app.use(cors({ origin: '*' }));
app.use(express.json());



import prosecutionOfficeRoutes from "./routes/presecutionOffice.route";
import fiscalRoute from "./routes/fiscal.route";
import userRoute from "./routes/user.route";
import caseStateRoute from "./routes/caseState.route";
import caseRoute from "./routes/case.route";
import logRoute from "./routes/log.route";
import authRoute from "./routes/auth.route";

app.use("/api/prosecution-offices", prosecutionOfficeRoutes);
app.use("/api/prosecution", fiscalRoute);
app.use("/api/users", userRoute);
app.use("/api/case-state", caseStateRoute);
app.use("/api/case", caseRoute);
app.use("/api/log", logRoute);
app.use("/api/auth", authRoute);

app.listen(3001, "0.0.0.0", () => {
    console.log("Server running on port 3001");
});