const mongoose = require('mongoose');

(async () => {
  try {
    await mongoose.connect(
      "mongodb://localhost:27017/LegalConnect-India?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (e) {
    console.log(`connection error ${e}`);
  }
})();

const db = mongoose.connection;

db.once("open", async () => {
  console.log(`✔ Successfully connected to mongodb database`);
});
db.on("error", () => {
  console.log(`connection error while connection at ${URL}`);
});
