import React from 'react';
import {Box, Typography, FormHelperText, FormControl} from '@mui/material';
import { TextField } from "../components";
import { RendererContext } from '../RendererContext';

export function TextLabelInput(props?:any) {
     const [hasError, setHasError] = React.useState(false);

     const rendererContext = React.useContext(RendererContext);

     const validationHandler: Function|undefined = rendererContext === undefined  ? function(): void {console.log("error");} 
                                             :
                                             props.validation === undefined ? undefined: rendererContext.lookup(props.validation);

     return (
          <Box
               sx={{display:'flex', ...props.style}}
          >
               <FormControl>
                    <Typography mb={1} align="left">{props.label}</Typography>
                    <TextField hiddenLabel {...props.textField} 
                         value={props.lookupFieldValue(props.name)}
                         onChange={(event: { target: { value: any; }; }) => {
                              props.updateField(props.name, event.target.value);
                              
                              if(validationHandler !== undefined){
                                   if(!validationHandler(event.target.value)){
                                        setHasError(true);
                                   }else{
                                        setHasError(false);
                                   }
                              }
                         }}
                    />
                    {
                         hasError &&
                         (
                              <FormHelperText>Invalid Input</FormHelperText>
                         )
                    }
                    
               </FormControl>
          </Box>
     );
}

