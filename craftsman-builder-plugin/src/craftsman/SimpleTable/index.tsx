import {DialogContent, DialogContentText, DialogTitle, TextField} from '@mui/material';
import TableRowsIcon from '@mui/icons-material/TableRows';

export const componentType = 'SimpleTable';
export const label = 'Simple Table';
export const description = "Create a simple table that displays your data";
export const icon = TableRowsIcon;
export const modal = (props:any) => {
     return(
          <>
               {props.isEditing === true && <DialogTitle>Edit {label} </DialogTitle> }
               {props.isEditing !== true && <DialogTitle>New {label} </DialogTitle> }
               <DialogContent>
                    <DialogContentText>
                         {description}
                    </DialogContentText>
                    <TextField
                         autoFocus
                         margin="dense"
                         id="name"
                         label="Name"
                         type="text"
                         fullWidth
                         variant="standard"
                         defaultValue={props.formState['name']}
                         onChange={ (event) => {
                              props.setFormState('name', event.target.value);
                         }}
                         required
                    />

                    <TextField
                         autoFocus
                         margin="dense"
                         id="dataURL"
                         label="Data URL"
                         type="text"
                         fullWidth
                         variant="standard"
                         defaultValue={props.formState['dataURL']}
                         onChange={ (event) => {
                              props.setFormState('dataURL', event.target.value);
                         }}
                    />

                    <TextField
                         autoFocus
                         margin="dense"
                         id="data"
                         label="Data (Array)"
                         multiline
                         rows={4}
                         fullWidth
                         variant="standard"
                         defaultValue={props.formState['data']}
                         onChange={ (event) => {
                              props.setFormState('data', JSON.parse(event.target.value));
                         }}
                    />
               </DialogContent>
          </>
     );
};