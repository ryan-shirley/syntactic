const app = require("../../app") // Link to your server
const request = require("supertest")(app)

it("Stripe webhook fail", async done => {
    const response = await request.post("/webhook/stripe/payment")

    expect(response.status).toBe(400)
    done()
})