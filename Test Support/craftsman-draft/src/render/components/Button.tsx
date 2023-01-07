import React from 'react';
import MButton from '@mui/material/Button';
import { RendererContext } from '../RendererContext';

export function Button(props?:any) {
     const rendererContext = React.useContext(RendererContext);

     const functionHandler: Function = rendererContext === undefined || rendererContext.lookup('add') === undefined 
                                        ? function(): void {console.log("error");} : rendererContext.lookup('add');
     
     return (
          <MButton 
               
               onClick={()=>{
                    const lookupFunction = props.lookupFieldValue;
                    const inputs = props.handler.inputs.map( (input:string) => lookupFunction(input));
                    const calculatedValue = functionHandler(...inputs);
                    props.updateField(props.handler.output, calculatedValue);
               }}
          >
               {props.label}
          </MButton>
     );
}