import React from "react";
import { Box, Typography } from '@mui/material';


export default function TitleBar(props:any) {
     return (
          <header className='py-3' style={{'lineHeight':1, 'borderBottom':'1px solid #e5e5e5'}}>
               <div className='row flex-nowrap justify-content-between align-items-center'>
                    <Box sx={{display: 'flex', flexDirection: 'row', justifyItems:'center', alignItems: 'end'}}>
                         <Typography variant="h4" sx={{mr:4}}>Craftsman</Typography>
                         <Typography variant="overline" sx={{borderBottom:'1px solid #e5e5e5'}}>A Common Digital Platform Plugin</Typography>
                    </Box>

               </div>
          </header>
     );
};