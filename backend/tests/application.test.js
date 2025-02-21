import { app } from "../index.js";
import { setupTestDB } from "./testSetup.js";
import request from "supertest";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/User.js";
import Application from "../models/Application.js";
import { JWT_SECRET } from "../config.js";

describe("Application Endpoints", () => {
    let token;
    let userId;
    let testApplicationId;

    setupTestDB();

    beforeEach(async () => {
        // Creating a temp user
        const user = await User.create({
            name: "Ali Ahmed",
            email: "ali@gmail.com",
            password: "ali12345",
        });
        userId = user._id;
        token = jwt.sign({ id: userId }, JWT_SECRET);

        // Create a test application
        const application = await Application.create({
            userId,
            username: "testuser",
            email: "ali@gmail.com",
            income: 50000,
            expenses: 30000,
            assets: ["a1", "a2"],
            liabilities: ["l1", "l2"],
        });
        testApplicationId = application._id;
    });

    describe("POST /application/create", () => {
        it("should create a new application", async () => {
            const applicationData = {
                username: "newuser",
                email: "new@example.com",
                income: 60000,
                expenses: 35000,
                assets: 120000,
                liabilities: 25000,
            };

            const res = await request(app)
                .post("/application/create")
                .set("Authorization", `Bearer ${token}`)
                .send(applicationData);

            expect(res.status).toBe(201);
            expect(res.body.username).toBe(applicationData.username);
            expect(res.body.userId).toBe(userId.toString());
        });

        it("should return error without authentication", async () => {
            const res = await request(app).post("/application/create").send({});

            expect(res.status).toBe(401);
        });
    });

    describe("GET /application/all", () => {
        it("should return all applications for the user", async () => {
            const res = await request(app)
                .get("/application/all")
                .set("Authorization", `Bearer ${token}`);

            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBeTruthy();
            expect(res.body.length).toBe(1);
            expect(res.body[0].username).toBe("testuser");
        });

        it("should return empty array when user has no applications", async () => {
            await Application.deleteMany({ userId });

            const res = await request(app)
                .get("/application/all")
                .set("Authorization", `Bearer ${token}`);

            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBeTruthy();
            expect(res.body.length).toBe(0);
        });
    });

    describe("GET /application/get/:id", () => {
        it("should return specific application", async () => {
            const res = await request(app)
                .get(`/application/get/${testApplicationId}`)
                .set("Authorization", `Bearer ${token}`);

            expect(res.status).toBe(200);
            expect(res.body._id).toBe(testApplicationId.toString());
            expect(res.body.username).toBe("testuser");
        });

        it("should return 404 for non-existent application", async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const res = await request(app)
                .get(`/application/get/${fakeId}`)
                .set("Authorization", `Bearer ${token}`);

            expect(res.status).toBe(404);
        });
    });

    describe("PUT /application/update/:id", () => {
        it("should update an application", async () => {
            const updateData = {
                username: "updateduser",
                income: 70000,
            };

            const res = await request(app)
                .put(`/application/update/${testApplicationId}`)
                .set("Authorization", `Bearer ${token}`)
                .send(updateData);

            expect(res.status).toBe(200);
            expect(res.body.username).toBe(updateData.username);
            expect(res.body.income).toBe(updateData.income);
        });

        it("should not update application of another user", async () => {
            const otherUser = await User.create({
                name: "Random",
                email: "random@gmail.com",
                password: "zzzzzzzzzzzzzzzzzzzzzzzz",
            });
            const otherToken = jwt.sign({ id: otherUser._id }, JWT_SECRET);

            const res = await request(app)
                .put(`/application/update/${testApplicationId}`)
                .set("Authorization", `Bearer ${otherToken}`)
                .send({ username: "stranger" });

            expect(res.status).toBe(404);
        });
    });

    describe("DELETE /application/delete/:id", () => {
        it("should delete an application", async () => {
            const res = await request(app)
                .delete(`/application/delete/${testApplicationId}`)
                .set("Authorization", `Bearer ${token}`);

            expect(res.status).toBe(200);
            expect(res.body.message).toBe("Application deleted successfully");

            const deletedApp = await Application.findById(testApplicationId);
            expect(deletedApp).toBeNull();
        });
    });
});
