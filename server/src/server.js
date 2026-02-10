import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

console.log("EMAIL_USER:", process.env.EMAIL_USER);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port", process.env.PORT || 5000);
});
