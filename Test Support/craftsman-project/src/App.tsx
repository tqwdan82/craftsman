import React from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Craftsman } from 'craftsman';
import * as Services1 from './functions/services1';
import allPages from './pages.json';
import page1 from './page1.json';

function App(props:any) {
  const [state, setState] = React.useState<any>({});
  // const setStateFunction = (key:string, value:any) => {
  //   const updatedState = { ...state };
  //   updatedState[key] = value;
  //   setState(updatedState);
  // }
  // const RendererContextProvider = RendererContext.createRendererContextProvider(Services1, allPages, state, setState);

  React.useEffect( () => {

    console.log(state)
  },[state])

  // const renderCraftsmanForm = (props:any) => {
  //   return <Craftsman 
  //   context={props.context}
  //   // pages={allPages} services={Services1} 
  //   // state={state} setState={setStateFunction}
  //   // react={React}
  //   />
  // }

  return (
    <div className="App">
      <h3>Header</h3>
      <Craftsman page={page1} services={Services1} state={state} setState={setState}/>
      {/* <RendererContextProvider>
        <RendererContext.RendererContext.Consumer>  
        {(context: any) =>
          
            renderCraftsmanForm({context:context})
          
          // <Craftsman 
          // // pages={allPages} services={Services1} 
          // // state={state} setState={setStateFunction} 
          // context={context}
          // />
        }
        </RendererContext.RendererContext.Consumer>
        
      </RendererContextProvider> */}
      {/* {renderCraftsmanForm()} */}
      <h3>Footer</h3>
    </div>
  );
}

export default App;
