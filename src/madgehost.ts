import madge = require('madge');

export interface MadgeOptions {
   
}

export interface MadgeResult {
   
}


export default class MadgeHost {

    public async GetDependencies(options: MadgeOptions): Promise<any>
    {      
       var result = await madge(options).then((res) => {
            return res;
        });

     // var result = {}
      return result;
    }   
}


