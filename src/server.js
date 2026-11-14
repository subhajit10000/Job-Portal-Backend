require("dotenv").config();
const app = require("./app.js");
const connectDB = require("./config/db.js");

// Local development only; on Vercel the exported app is used as a serverless function.
if (require.main === module) {
  connectDB()
    .then(() => {
      const PORT = process.env.PORT || 7000;
      app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    })
    .catch((e) => {
      console.error("MongoDB connection failed:", e.message);
      process.exit(1);
    });
}

module.exports = app;
