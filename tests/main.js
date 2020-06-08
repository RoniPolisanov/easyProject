var description = require('./common').description;

const importTest = (name, path) => {
    describe(name, () => {
        require(path);
    });
}

describe("MAIN TEST", () => {
    console.log("[*] BEFORE ALL TESTS [*]");

    // for (let i = 1; i <= 1; i++) {//11
    //     importTest(`TEST NO. ${i}: ${description[`test${i}`]}`, `./test${i}`);
    // }

    for (let i = 1; i <= 5; i++) {//11
        importTest(`TEST NO. ${i}: ${description[`test${i}`]}`, `./test${i}`);
    }

    after(() => {
        console.log("[*] AFTER ALL TESTS [*]");
    });
});