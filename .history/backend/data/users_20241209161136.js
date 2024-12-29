import bcrypt from "bcryptjs";

const users = [
    {
        username: "Admin User",
        password: bcrypt.hashSync("123456", 10),
    },