import React from 'react';
import {Renderer} from './Renderer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function Craftsman(props:any) {

     const [pages, setAllPages] = React.useState<any>(props.pages)

     return (
          <BrowserRouter>
               <Routes>
               {
               Object.keys(pages).map( (pageKey: string) => {
                    const page:any = pages[pageKey];
                    const path = pageKey === 'home' ? '/' : `/${pageKey}`;
                    return (<Route path={path} element={<Renderer page={page} services={props.services}/>} />);
               })
               }
               </Routes>
          </BrowserRouter>
     );
}