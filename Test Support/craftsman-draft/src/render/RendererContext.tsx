import React from "react";

type FunctionHandlerType = {
     functionName: string;
     functionHandler: Function;
};

const errorFunction = () => {console.log("error");};

class RendererContextClass{
     functionHandlers: FunctionHandlerType[];

     constructor() {
          this.functionHandlers = [];
     }

     add( handler:FunctionHandlerType ) {

          this.functionHandlers.push(handler);
     }

     addAll(functions:any){
          Object.keys(functions).forEach( functionKey => {
               const newFunction:FunctionHandlerType = {
                    functionName: functionKey,
                    functionHandler: functions[functionKey]
               }
               this.add(newFunction);
          })
     }

     lookup(functionName:string): Function{
          for(let hi = 0; hi < this.functionHandlers.length; hi++){
               const handler = this.functionHandlers[hi];
               if(handler.functionName === functionName){
                    return handler.functionHandler;
               }
          }

          return errorFunction;
     }
}



// const RendererCtx = React.createContext<RendererContext | null>(null);

// export const RendererContextProvider = ( services:any, children:any ) => {
//      return (
//           <RendererCtx.Provider value={createRendererContext(services)}>
//             {...children}
//           </RendererCtx.Provider>
//         );
// }

export function createRendererContext(functions:any) {
     const newContext = new RendererContextClass();
     newContext.addAll(functions);
     return newContext;
}

export const RendererContext = React.createContext<RendererContextClass | undefined>(undefined)