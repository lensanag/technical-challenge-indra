const axios = require("axios");
const supertest = require("supertest");
const app = require("../src/app");
const api = supertest(app);
const endpoint = "peliculas";

jest.mock("axios");
axios.request.mockImplementation(({ url }) => {
  if (/^films\/\d/.test(url))
    return Promise.resolve({
      status: 200,
      data: { characters: [] },
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
    expect(response.body).toHaveProperty("personajes");
  });
  it("return status 400", async () => {
    const response = await api
      .get(`/${endpoint}/r`)
      .set("Accept", "application/json");
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(404);
  });
});
