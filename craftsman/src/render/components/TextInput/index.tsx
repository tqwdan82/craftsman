import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export const TextInput = (props?: any) => {
  const validationHandler: Function =
    props.context !== undefined && props.Validation !== undefined
      ? props.context.lookupFunction(props.Validation.functionName)
      : undefined;

  const getSubtextStyle = () => {
    switch (props.Validation.validFailureType) {
      case "normal":
        return "text-secondary";
      case "error":
        return "text-danger";
      case "note":
        return "text-warning";
      default:
        return "text-muted";
    }
  };

  return (
    <div className="d-flex flex-column justify-content-start">
      <form className="form-group pb-3">
        {props.TextField.label !== undefined && (
          <label
            htmlFor={`Input_${props.TextField.name}`}
            className="d-flex justify-content-start"
            style={{ paddingLeft: 4, paddingBottom: 2 }}
          >
            {props.TextField.label}
          </label>
        )}
        <input
          className="form-control"
          type="text"
          id={`Input_${props.TextField.name}`}
          name={`Input_${props.TextField.name}`}
          aria-describedby={`${props.TextField.name}_Subtext`}
          placeholder={
            props.TextField.placeholder !== undefined
              ? props.TextField.placeholder
              : undefined
          }
          value={props.context.state[props.TextField.name]}
          onChange={(event) => {
            const updatedState = { ...props.context.state };
            if (validationHandler !== undefined) {
              const validationFailed = validationHandler(event.target.value);
              updatedState[`Input_${props.TextField.name}_Valid`] =
                validationFailed;
            }
            updatedState[props.TextField.name] = event.target.value;
            props.context.setState(updatedState);
          }}
          style={{ paddingBottom: 2 }}
        />

        {props.context.state[`Input_${props.TextField.name}_Valid`] !==
          undefined &&
          props.context.state[`Input_${props.TextField.name}_Valid`] !==
            true && (
            <small
              id={`${props.TextField.name}_Subtext`}
              className={`form-text d-flex justify-content-start ml-2 ${getSubtextStyle()}`}
              style={{ paddingLeft: 4, paddingBottom: 2 }}
            >
              {props.Validation.validFailureMessage || ""}
            </small>
          )}
      </form>
    </div>
  );
};
