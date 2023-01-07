import React from "react";
import { RendererContext } from "../Context";

export default function Button(props: any) {
  return (
    <RendererContext.Consumer>
      {(context: any) => {
        setTimeout(() => {
          const newState = { ...context.getState() };
          newState.testValue = "changed last";
          context.setState(newState);
        }, 3000);

        setTimeout(() => {
          const newState = { ...context.getState() };
          newState.testValue = "changed first";
          context.setState(newState);
        }, 6000);
        return (
          <>
            <p>{context.getState().testValue}</p> &&
            {Object.keys(context.getPages()).map((pageKey) => {
              return <p key={pageKey}>{pageKey}</p>;
            })}
          </>
        );
      }}
    </RendererContext.Consumer>
  );
}
