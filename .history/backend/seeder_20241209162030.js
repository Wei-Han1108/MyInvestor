import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import WatchListData from "./data/WatchListData.js";
import StockStorageData from "./data/StockStorageData.js";
import User from "./model/userModel.js";
import Watchlist from "./model/watchlistModel.js";
import Storage from "./model/storageModel.js";
import connectDB from "./config/db.js"; 

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await User.deleteMany();
        await Watchlist.deleteMany();
        await Storage.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;
        const watchlist = await Watchlist.insertMany(WatchListData);
        const stockstorage = await Storage.insertMany(StockStorageData);
        console.log("Data Imported!".green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Watchlist.deleteMany();
        await Storage.deleteMany();
        console.log("Data Destroyed!".red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}

if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}
