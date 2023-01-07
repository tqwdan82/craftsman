import Box from '@mui/material/Box';
import { TextField } from "../components";

export function TextInput(props?:any) {
     return (
          <Box
               sx={{display:'flex', ...props.style}}
          >
               <TextField {...props.textField}/>
          </Box>
     );
}