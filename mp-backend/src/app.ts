import express from "express";
const app = express();
const cors = require('cors');

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

import prosecutionOfficeRoutes from "./routes/presecutionOffice.route";
import fiscalRoute from "./routes/fiscal.route";
import userRoute from "./routes/user.route";
import caseStateRoute from "./routes/caseState.route";
import caseRoute from "./routes/case.route";
import logRoute from "./routes/log.route";
import authRoute from "./routes/auth.route";

app.use("/prosecution-offices", prosecutionOfficeRoutes);
app.use("/prosecution", fiscalRoute);
app.use("/users", userRoute);
app.use("/case-state", caseStateRoute);
app.use("/case", caseRoute);
app.use("/log", logRoute);
app.use("/auth", authRoute);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});