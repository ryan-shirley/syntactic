const app = require("../../app") // Link to your server
const request = require("supertest")(app)

it("Ensure stripe webhook return status 400", async done => {
    const response = await request.post("/webhook/stripe/payment")

    expect(response.status).toBe(400)
    done()
})