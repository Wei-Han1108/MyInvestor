import bcrypt from "bcryptjs";

const users = [
    {
        username: "Admin User",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true,
    },
    {
        username: "John Doe",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false,
    },
    {
        username: "Jane Doe",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false,
    },
];

export default users;