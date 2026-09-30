require("dotenv").config();
const mongoose = require("mongoose");

const Listing = require("../model/listing.js");
const sampleListings = require("./SampleListingData.js");

const DB_URL = "mongodb://localhost:27017/LocalHost";

async function seedDatabase() {
  await mongoose.connect(DB_URL);
  console.log("Connected to MongoDB");

  await Listing.deleteMany({});
  await Listing.insertMany(sampleListings);

  console.log(`Inserted ${sampleListings.length} listings`);
}

seedDatabase()
  .then(async () => {
    await mongoose.connection.close();
    console.log("Database connection closed");
  })
  .catch(async (error) => {
    console.error("Seeding failed:", error);
    try {
      await mongoose.connection.close();
    } catch (closeError) {
      console.error("Error closing connection:", closeError);
    }
    process.exit(1);
  });
