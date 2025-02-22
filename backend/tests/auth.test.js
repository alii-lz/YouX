const request = require("supertest");
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const { setupTestDB } = require("./testSetup.js");
const { app } = require("../index.js");

describe("Authentication Endpoints", () => {
    setupTestDB();

    describe("POST /auth/register", () => {
        it("should register a new user successfully", async () => {
            const res = await request(app).post("/auth/register").send({
                name: "Ali Ahmed",
                email: "ali@gmail.com",
                password: "ali12345",
            });

            expect(res.status).toBe(201);
            expect(res.body.message).toBe(
                "User registered successfully, You will be redirected. Please wait"
            );

            const user = await User.findOne({ email: "ali@gmail.com" });
            expect(user).toBeTruthy();
            expect(user.name).toBe("Ali Ahmed");
        });

        it("should return error if user already exists", async () => {
            await User.create({
                name: "Ali Ahmed",
                email: "ali@gmail.com",
                password: "ali12345",
            });

            const res = await request(app).post("/auth/register").send({
                name: "Ali Ahmed",
                email: "ali@gmail.com",
                password: "ali12345",
            });

            expect(res.status).toBe(400);
            expect(res.body.error).toBe("User already exists");
        });
    });

    describe("POST /auth/login", () => {
        beforeEach(async () => {
            await User.create({
                name: "Ali Ahmed",
                email: "ali@gmail.com",
                password: "ali12345",
            });
        });

        it("should login successfully and return token", async () => {
            const res = await request(app).post("/auth/login").send({
                email: "ali@gmail.com",
                password: "ali12345",
            });

            expect(res.status).toBe(200);
            expect(res.body.token).toBeTruthy();

            const decoded = jwt.verify(res.body.token, process.env.JWT_SECRET);
            expect(decoded.id).toBeTruthy();
        });

        it("should return error for invalid credentials", async () => {
            const res = await request(app).post("/auth/login").send({
                email: "ali@gmail.com",
                password: "zzzzzzzzzzzzzzz",
            });

            expect(res.status).toBe(400);
            expect(res.body.error).toBe("Invalid credentials");
        });

        it("should return error for non-existent user", async () => {
            const res = await request(app).post("/auth/login").send({
                email: "random@gmail.com",
                password: "ali12345",
            });

            expect(res.status).toBe(400);
            expect(res.body.error).toBe("Invalid credentials");
        });
    });
});
