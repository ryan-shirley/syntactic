// Access not exported function
const rewire = require("rewire")
const levelRewire = rewire("../../services/level.service")

const calcLevel = levelRewire.__get__("calcLevel")

describe("Level calculation", function() {
    it("Test level 3", () => {
        let level = calcLevel(4, 5)

        expect(level).toBe(3)
    })
    it("Correct num articles but not enough confidence", () => {
        let level = calcLevel(12, 18)

        expect(level).toBe(4)
    })
    it("Correct confidence but not enough articles", () => {
        let level = calcLevel(18, 18)

        expect(level).toBe(5)
    })
})
