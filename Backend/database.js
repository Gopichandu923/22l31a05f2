import mongoose from "mongoose";

async function connect() {
  const MongoUri = "mongodb://localhost:27017/AffordMed";
  try {
    await mongoose.connect(MongoUri);
  } catch (err) {
    throw Error("Error occured while connecting to database" + err);
  }
}
export default connect;
