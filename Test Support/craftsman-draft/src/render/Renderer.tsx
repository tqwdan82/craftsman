import React from "react";
import * as Components from './components';
import * as Composites from './composites';

import Container from '@mui/material/Container';
// import * as M from '@mui/material';
import { RendererContext, createRendererContext } from "./RendererContext";


export function Renderer(props:any) {
     const [registeredFields, setRegisteredFields] = React.useState<any>({});

     const lookupFieldValue = function(fieldName:string){
          return registeredFields[fieldName];
     }

     const updateField = function(fieldName:string, value:any){
          const updatedRegisteredFields = {...registeredFields};
          updatedRegisteredFields[fieldName] = value;
          setRegisteredFields(updatedRegisteredFields);
     };

     function ComponentMaker(name:string, props:any) {
          if(name === 'Button'){
               return (
                    <Components.Button 
                         key={props.name} 
                         lookupFieldValue={lookupFieldValue} 
                         updateField={updateField}  
                         {...props} 
                    />
               )
          }
     
          if(name === 'TextInput'){
               return (
                    <Composites.TextInput 
                         key={props.name}
                         lookupFieldValue={lookupFieldValue} 
                         updateField={updateField}  
                         {...props} 
                    />
               )
          }
     
          if(name === 'TextLabelInput'){
               return (
                    <Composites.TextLabelInput 
                         key={props.name}
                         lookupFieldValue={lookupFieldValue}
                         updateField={updateField} 
                         {...props} 
                    />
               )
          }
     }
     
     return (
     <RendererContext.Provider value={createRendererContext(props.services)}>
          <Container maxWidth="lg"
               style={{
                    "paddingLeft": props.page.paddingHorizontal,
                    "paddingRight": props.page.paddingHorizontal,
                    "paddingTop": props.page.paddingVertical,
                    "paddingBottom": props.page.paddingVertical
               }}
          >
               {
                    props.page.pageComponents.map( (pcomponent: { componentType: string; config: any; }) => 
                              ComponentMaker(
                                   pcomponent.componentType,
                                   pcomponent.config
                              )
                         
                    )
               } 

               {/* <M.Box
                    sx={{display:'flex', justifyContent:'flex-end'}}
               >
                    <M.TextField 
                         label="Test Field 0"
                    />
               </M.Box> */}
               {/* {
                    ComponentMaker('TextLabelInput',  {
                         variant:"outlined",
                         children: 'test'
                    })
               } */}
               
               {/* {
                    ComponentMaker('Button',  {
                         variant:"outlined",
                         children: 'test'
                    })
               }
               {
                    ComponentMaker('TextInput',  {
                         Container:{
                              style:{
                                   'margin':'1.25em'
                              }
                         },
                         TextField: {
                              label:"Outlined",
                              variant:"outlined",
                              style:{
                                   'width':'100%'
                              }
                         }
                    })
               } */}
          </Container>
     </RendererContext.Provider>
     );
}
