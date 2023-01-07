import React from 'react';
import {
     Routes, Route, useNavigate
} from "react-router-dom";
import Builder from '../pages/builder';
import PageList from '../pages/pageList';
import Renderer from '../pages/renderer';

function HomeRouter() {
     // const [selectedView, setSelectedView] = React.useState('pages');

     const navigate = useNavigate();
     const handleIdeRoute = (pageId:any) => {
          navigate("craftsman2/main/ide", {state:pageId});
     }

     const handleNewRoute = () => {
          navigate("craftsman2/main/ide");
     }

     const handleBackHome = () => {
          navigate("craftsman2/main/");
     }

     // const navigateTo = (uri:string, route:string) => {
     //      navigate(uri);
     //      setSelectedView(route);
     // }

     return (
          <>
               {/* <nav className="nav d-flex justify-content-between">
                    <div 
                         className={`p-2 text-muted ${selectedView==='pages'?'fw-bold':''}`}
                         style={{'cursor':'pointer'}} 
                         onClick={() => {navigateTo('craftsman2/main/', 'pages')}}
                    >
                         Pages
                    </div>
               </nav> */}
               <Routes>
                    <Route path="craftsman2/main/ide" element={<Builder backHomeRoute={handleBackHome}/>} />
                    <Route path="craftsman2/main/render/:pageId" element={<Renderer />} />
                    <Route index path="craftsman2/main/" element={<PageList ideRoute={handleIdeRoute} newIdeRoute={handleNewRoute}/>} />
               </Routes>
          </>
     )
}

export default HomeRouter;