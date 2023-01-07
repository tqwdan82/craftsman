import React, { useState } from "react";

// export function createRendererContext(
//   functions: any,
//   pages: any,
//   testState: any
// ) {
//   const newContext = new RendererContextClass(testState);
//   newContext.addAll(functions, pages);
//   return newContext;
// }

// export const RendererContext = React.createContext<
//   RendererContextClass | undefined
// >(undefined);

// export const RendererContextProvider = RendererContext.Provider;

// export const createRendererContext = (
//   functions: any,
//   pages: any,
//   testState: any
// ) => {
//   const newContext = new RendererContextClass(testState, undefined);
//   newContext.addAll(functions, pages);
//   return React.createContext(newContext);
// };

export interface RendererContextType {
  services: any;
  pages: any;
  state: any;
  setState: Function;
}

export const RendererContext = React.createContext<
  RendererContextClass | undefined
>(undefined);

export const createRendererContextProvider = (
  functions: any,
  pages: any,
  // react: any
  inState: any,
  inStateFunction: any
) => {
  return (props: any) => {
    const newContext = new RendererContextClass(
      // react
      inState,
      inStateFunction
    );
    newContext.addAll(functions, pages);
    return (
      <RendererContext.Provider value={newContext}>
        {props.children}
      </RendererContext.Provider>
    );
  };
};

export type FunctionHandlerType = {
  functionName: string;
  functionHandler: Function;
};

const errorFunction = () => {
  console.log("error: Registered function not found");
};

class RendererContextClass {
  functionHandlers: FunctionHandlerType[];
  pages: any;
  // react: any;
  state: any;
  setStateFunction: any;

  constructor(
    state: any,
    setStateFunction: any
    // react: any
  ) {
    this.functionHandlers = [];
    this.pages = {};
    // this.react = react;
    this.state = state;
    this.setStateFunction = setStateFunction;
  }

  addFunction(handler: FunctionHandlerType) {
    this.functionHandlers.push(handler);
  }

  addAll(functions: any, pages: any) {
    Object.keys(functions).forEach((functionKey) => {
      const newFunction: FunctionHandlerType = {
        functionName: functionKey,
        functionHandler: functions[functionKey],
      };
      this.addFunction(newFunction);
    });

    this.pages = { ...pages };
  }

  lookup(functionName: string): Function {
    for (let hi = 0; hi < this.functionHandlers.length; hi++) {
      const handler = this.functionHandlers[hi];
      if (handler.functionName === functionName) {
        return handler.functionHandler;
      }
    }

    return errorFunction;
  }

  getPages() {
    return { ...this.pages };
  }

  getStateValue(key: string) {
    // if (this.state[key] === undefined) {
    //   const updatedState = { ...this.state };
    //   updatedState[key] = "";
    //   this.setStateFunction(updatedState);
    // }
    return this.state[key];
  }

  setStateValue(key: string, value: any) {
    const updatedState = { ...this.state };
    updatedState[key] = value;
    this.setStateFunction(updatedState);
  }

  getState() {
    return this.state;
  }

  setState(state: string) {
    this.state = state;
    this.setStateFunction(state);
  }
}
