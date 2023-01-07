import MTextField from '@mui/material/TextField';

export function TextField(props?:any) {
     return (
          <MTextField {...props}>{props.children}</MTextField>
     );
}