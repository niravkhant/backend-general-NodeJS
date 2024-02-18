import dotenv from "dotenv";
import connectDB from "./db/db.js";
import app from "./app.js";

dotenv.config({
  path: "../.env",
});

// Connect to the database
const PORT = process.env.PORT || 8000;
connectDB()
  .then(() => {
   
    app.listen(PORT, () => {
      console.log(`💻 Server is Running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MONGO DB connection Server failed !!!", error);
  });

// IFEE function

// ;( async ()=>{
//     try {
//        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//     } catch (error) {
//         console.error("DB ERROR: ", error);
//     }
// })()
