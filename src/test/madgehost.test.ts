import madgeHost from "../madgehost";
import { fail, AssertionError } from "assert";

import {ufs as fileSystem} from 'unionfs';
import {fs as memoryFileSystem, Volume as volume} from 'memfs';
import * as physicalFileSystem from 'fs';

const amdVolume = volume.fromJSON({
    '/AMD/ModuleB.js': physicalFileSystem.readFileSync('testFiles/AMD/ModuleB.js', 'utf8'),
    '/AMD/ModuleA.js': physicalFileSystem.readFileSync('testFiles/AMD/ModuleA.js', 'utf8'),
});

fileSystem.use(amdVolume)
          .use(physicalFileSystem);

describe("MadgeHost", () => {

    describe("Get AMD Dependencies", () => {

        it("Uses InMemory Files", () => {

            // Arrange          
            let sut = new madgeHost();
           // var fileContents = fs.readFileSync('testFiles/AMD/ModuleB.js', "utf-8");

           // import("mock-fs").then(mockfs =>{
            //   mockfs()

              //  var options = "testfiles/AMD/ModuleB.js";           

                sut.GetDependencies(dir).then(result => {
                                      
                    var obj = result.obj();
                    console.log(Object.keys(obj));
                   
                    var moduleBdeps = obj["ModuleB.js"];
                    console.log(moduleBdeps);    
                    
                    if(!moduleBdeps.includes("ModuleA.js"))
                    {
                        fail("error " + "did not detect that ModuleB is dependent on ModuleA.")
                    }      
                    
                    mockfs.restore();
    
                }).catch((reason) => {
                    fail("error " + reason)
                    // after a test runs
                    mockfs.restore();
                });


            });

           

           

         
        });   



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