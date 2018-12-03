"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const madgehost_1 = require("../madgehost");
const assert_1 = require("assert");
describe("MadgeHost", () => {
    describe("Get AMD Dependencies", () => {
        it("Returns ModuleB is dependent upon ModuleA", () => {
            // Arrange          
            let sut = new madgehost_1.default();
            var options = "testfiles/AMD/ModuleB.js";
            sut.GetDependencies(options).then(result => {
                var obj = result.obj();
                console.log(Object.keys(obj));
                var moduleBdeps = obj["ModuleB.js"];
                console.log(moduleBdeps);
                if (!moduleBdeps.includes("ModuleA.js")) {
                    assert_1.fail("error " + "did not detect that ModuleB is dependent on ModuleA.");
                }
            }).catch((reason) => {
                assert_1.fail("error " + reason);
            });
        });
        it("Module A is not dependent on anything", () => {
            // Arrange          
            let sut = new madgehost_1.default();
            var options = "testfiles/AMD/ModuleA.js";
            sut.GetDependencies(options).then(result => {
                var obj = result.obj();
                console.log(Object.keys(obj));
                var deps = obj["ModuleA.js"];
                console.log(deps);
                if (deps.length != 0) {
                    assert_1.fail("error " + "did not detect that ModuleA is not dependent on anything.");
                }
            }).catch((reason) => {
                assert_1.fail("error " + reason);
            });
        });
    });
});
//# sourceMappingURL=madgehost.test.js.map