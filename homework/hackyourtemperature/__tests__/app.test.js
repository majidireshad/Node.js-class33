import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);
describe("GET /", () => {
  it("should respond with a 200 status code", async () => {
    const response = await request.get("/").send();
    expect(response.statusCode).toBe(200);
  });
});

describe("POST /weather", () => {
  it("should respond with status code 404 & weatherText: city is not found", async () => {
    const response = await request
      .post("/weather")
      .send({ cityName: "amsteeerdaaam" });
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("weatherText", "City is not found!");
  });

  it("should respond with status 200 & weatherText : city, temperature", async () => {
    const response = await request
      .post("/weather")
      .send({ cityName: "amsterdam" });
    expect(response.body).toHaveProperty("cityName", "Amsterdam");
    expect(response.body).toHaveProperty("temperature");
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });
});
