import React from "react";
import { useParams } from 'react-router-dom';
import {Craftsman } from 'craftsman';

import { config } from '../util/Constants';

export default function Renderer(props:any) {
     const param = useParams();

     const [state, setState] = React.useState<any>({});
     const [pageData, setPageData] = React.useState<any>( undefined);

     React.useEffect( () => {
          const fetchPages = async () => {
               const response = await fetch(`${config.API_URL}/web/craftsman2/api/singlePage?pageId=${param.pageId}`);
               let results = await response.json();
               console.log(results)
               results.page = JSON.parse(results.page)
               setPageData(results);
          }

          fetchPages();
     }, [])

     return (
          <>
          {
               pageData !== undefined && 
               <Craftsman page={pageData} services={{}} state={state} setState={setState}/>
          }
          </>
     );
}