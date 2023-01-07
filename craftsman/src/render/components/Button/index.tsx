import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export function Button(props?: any) {
  const functionHandler: Function =
    props.context === undefined ||
    props.context.lookupFunction(props.handler.functionName);

  return (
    <button
      className="btn btn-primary"
      onClick={() => {
        const inputs =
          props.handler !== undefined && props.handler.inputs !== undefined
            ? props.handler.inputs.map((input: string) =>
                props.context.lookupValue(input)
              )
            : [];
        const outputs =
          props.handler !== undefined && props.handler.inputs !== undefined
            ? props.handler.outputs
            : [];
        const calculatedValue = functionHandler(...inputs);

        if (outputs.length > 0) {
          const updatedState = { ...props.context.state };
          for (let output of outputs) {
            updatedState[output] = calculatedValue;
          }
          props.context.setState(updatedState);
        }
      }}
    >
      {props.label}
    </button>
  );
}
