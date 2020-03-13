import { csFirebaseToken, wFirebaseToken } from "./firebase.mock"

test("Successfull Content Seeker Firebase Token", async () => {
    let token = await csFirebaseToken()
    
    expect(token).toBeTruthy()
})

test("Successfull Writer Firebase Token", async () => {
    let token = await wFirebaseToken()

    expect(token).toBeTruthy()
})
