import mongoose from "mongoose";

export async function DBConnection() {
  try {
    mongoose.connect(process.env.DB_URI!);

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("DB Connection Successfull");
    });

    connection.on("error", (err: any) => {
      console.log(
        "MongoDb Eonnection Error, Please Make Sure MongoDb DB is Running"
      );
      console.log(err);
      process.exit(1);
    });
  } catch (err: any) {
    console.log("Something Went Wrong in Connecting to DB");
    console.log(err);
    process.exit(1);
  }
}
