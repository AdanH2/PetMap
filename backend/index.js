import express from "express";
import db from "./config/database.js";
import productRoutes from "./routes/index.js";
import userRoutes from "./routes/index2.js";
import cors from "cors";

const app = express();

try{
    await db.authenticate();
    console.log('Database connected...');
} catch (error) {
    console.error('Connection error:', error);
}

app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use('/products', productRoutes);
app.use('/users', userRoutes);

app.listen(5000, () => console.log('Server running at port 5000'));