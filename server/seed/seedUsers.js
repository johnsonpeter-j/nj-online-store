const User = require("./models/User");
const encryptPassword = require("../utils/encryptPassword");

const seedUsers = async () => {
    try {
        // check if admin user already exists
        const count = await User.find({ email: process.env.ADMIN_EMAIL || "" }).countDocuments();
        if (count === 0) {
            let hashedPassword = encryptPassword(process.env.ADMIN_PASSWORD || "");
            await User.insertOne({
                username: process.env.ADMIN_USERNAME || "",
                email: process.env.ADMIN_EMAIL || "",
                password: hashedPassword,
            });
            console.log("🌱 Admin users added");
        } else {
            console.log("⚡ Users already exist, skipping seeding");
        }
    } catch (error) {
        console.error("❌ Error seeding data:", error);
    }
};

module.exports = seedUsers;
