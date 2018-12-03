import madgeHost from "../madgehost";
import * as fs from "fs";
import { fail, AssertionError } from "assert";

describe("MadgeHost", () => {

    describe("Get AMD Dependencies", () => {

        it("Returns ModuleB is dependent upon ModuleA", () => {

            // Arrange          
            let sut = new madgeHost();

            var options = "testfiles/AMD/ModuleB.js";

            sut.GetDependencies(options).then(result => {
                                  
                var obj = result.obj();
                console.log(Object.keys(obj));
               
                var moduleBdeps = obj["ModuleB.js"];
                console.log(moduleBdeps);    
                
                if(!moduleBdeps.includes("ModuleA.js"))
                {
                    fail("error " + "did not detect that ModuleB is dependent on ModuleA.")
                }                

            }).catch((reason) => {
                fail("error " + reason)
            });
        });   

        it("Module A is not dependent on anything", () => {

            // Arrange          
            let sut = new madgeHost();

            var options = "testfiles/AMD/ModuleA.js";

            sut.GetDependencies(options).then(result => {
                                  
                var obj = result.obj();
                console.log(Object.keys(obj));
               
                var deps: Array<string> = obj["ModuleA.js"];
                console.log(deps);    
                
                if(deps.length != 0)
                {
                    fail("error " + "did not detect that ModuleA is not dependent on anything.")
                }                

            }).catch((reason) => {
                fail("error " + reason)
            });
        });   
    });
});