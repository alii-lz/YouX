const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// define the User model schema
const UserSchema = new mongoose.Schema(
    {
        id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        name: { type: String, required: true },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { collection: "Users" }
);

// This is a pre-save hook which hashes the user's
// password before saving it to the database
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// This is an instance method which uses the bcrypt library to
// compare the entered password with the stored hased password
// returns True if passwords match, returns false if passwords dont match
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
