const axios = require("axios");
const supertest = require("supertest");
const app = require("../src/app");
const api = supertest(app);
const endpoint = "personas";

jest.mock("axios");
axios.request.mockImplementation(({ url }) => {
  if (/^people\/\d/.test(url))
    return Promise.resolve({
      status: 200,
      data: { name: "Jhon Doe" },
    });
  else return Promise.reject({ response: { status: 404 } });
});

describe(`endpoint /${endpoint}/:id`, () => {
  it("return status 200", async () => {
    const response = await api
      .get(`/${endpoint}/1`)
      .set("Accept", "application/json");
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("nombre");
  });
  it("return status 400", async () => {
    const response = await api
      .get(`/${endpoint}/r`)
      .set("Accept", "application/json");
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(404);
  });
});
