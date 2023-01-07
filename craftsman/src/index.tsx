import React from "react";
import * as Components from "./render/components";
import { v4 as uuidv4 } from "uuid";

export function Craftsman(props: any) {
  // const stateValues = props.state;

  // const setStateFunction = (key: string, value: any) => {
  //   const updatedState = { ...props.state };
  //   updatedState[key] = value;
  //   props.setState(updatedState);
  // };

  const lookupFunction = (functionName: string) => {
    let foundFunction: Function = function (): void {
      console.log("error: No button handler found");
    };
    Object.keys(props.services).forEach((serviceKey) => {
      if (functionName === serviceKey)
        foundFunction = props.services[serviceKey];
    });
    return foundFunction;
  };

  const lookupValue = (key: string) => {
    return props.state[key];
  };

  const ComponentMaker = (props: any) => {
    if (props.type === "Button") {
      return (
        <Components.Button
          context={{
            lookupFunction,
            lookupValue,
            state: props.state,
            setState: props.setState,
          }}
          {...props.properties}
        />
      );
    }

    if (props.type === "TextInput") {
      return (
        <Components.TextInput
          context={{
            lookupFunction,
            lookupValue,
            state: props.state,
            setState: props.setState,
          }}
          {...props.properties}
        />
      );
    }

    if (props.type === "Chart_Bar") {
      return (
        <Components.Chart_Bar
          context={{
            lookupFunction,
            lookupValue,
            state: props.state,
            setState: props.setState,
          }}
          {...props.properties}
        />
      );
    }

    if (props.type === "SimpleTable") {
      return (
        <Components.SimpleTable
          context={{
            lookupFunction,
            lookupValue,
            state: props.state,
            setState: props.setState,
          }}
          {...props.properties}
        />
      );
    }

    if (props.type === "SimpleTable_MC") {
      return (
        <Components.SimpleTable_MC
          context={{
            lookupFunction,
            lookupValue,
            state: props.state,
            setState: props.setState,
          }}
          {...props.properties}
        />
      );
    }

    if (props.type === "Chart_Aggregated_Bar") {
      return (
        <Components.Chart_Aggregated_Bar
          context={{
            lookupFunction,
            lookupValue,
            state: props.state,
            setState: props.setState,
          }}
          {...props.properties}
        />
      );
    }

    if (props.type === "Table_MC_Editable") {
      return (
        <Components.Table_MC_Editable
          context={{
            lookupFunction,
            lookupValue,
            state: props.state,
            setState: props.setState,
          }}
          {...props.properties}
        />
      );
    }

    return <></>;
  };

  return (
    <div className="container" style={props.page.page}>
      {props.page.pageComponents.length > 0 &&
        props.page.pageComponents.map((componentConfig: any) =>
          ComponentMaker({
            type: componentConfig.componentType,
            properties: componentConfig.config,
            state: props.state,
            setState: props.setState,
          })
        )}
      {/* {ComponentMaker({
        type: "TextInput",
        properties: {
          TextField: {
            name: "testInput1",
            label: "Value 1",
            placeholder: "Enter value 1",
          },
        },
        state: props.state,
        setState: props.setState,
      })}
      {ComponentMaker({
        type: "TextInput",
        properties: {
          TextField: {
            name: "testInput2",
            label: "Value 2",
            placeholder: "Enter value 2",
          },
          Validation: {
            functionName: "validateField",
            validFailureType: "error",
            validFailureMessage: "Invalid input. *Hint: Enter a number",
          },
        },
        state: props.state,
        setState: props.setState,
      })}
      {ComponentMaker({
        type: "TextInput",
        properties: {
          TextField: {
            name: "totalValue",
            label: "Total",
            placeholder: "Total",
          },
        },
        state: props.state,
        setState: props.setState,
      })}
      {ComponentMaker({
        type: "Button",
        properties: {
          label: "Subtract",
          name: "addBtn",
          handler: {
            functionName: "subtract",
            inputs: ["testInput1", "testInput2"],
            outputs: ["totalValue"],
          },
        },
        state: props.state,
        setState: props.setState,
      })} */}

      {/* <ComponentMaker
        type="TextInput"
        properties={{
          Container: {
            style: {
              margin: "1.25em",
            },
          },
          TextField: {
            name: "testInput1",
            label: "Outlined",
            placeholder: "Enter Outlined",
          },
        }}
        react={props.react}
        state={props.state}
        setState={props.setState}
      /> */}

      {/*ComponentMaker(
        "TextInput",
        {
          Container: {
            style: {
              margin: "1.25em",
            },
          },
          TextField: {
            name: "testInput2",
            label: "Outlined",
            placeholder: "Enter Outlined",
          },
        },
        props.react,
        props.state,
        props.setState
      )*/}

      {/* {ComponentMaker(
        "Button",
        {
          children: "test",
          label: "Test Label",
          name: "addBtn",
          handler: {
            functionName: "test",
          },
        },
        props.react
        // props.setState
      )} */}
    </div>
  );
}
