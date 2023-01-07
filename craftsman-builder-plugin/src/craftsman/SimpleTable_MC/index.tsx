import {DialogContent, DialogContentText, DialogTitle, TextField} from '@mui/material';
import TableRowsIcon from '@mui/icons-material/TableRows';

import { config } from '../../util/Constants';

export const componentType = 'SimpleTable_MC';
export const label = 'Simple Table (RESOURCE)';
export const description = "Create a simple table based on a data model";
export const icon = TableRowsIcon;
export const modal = (props:any) => {
     props.setFormState('res_domain', config.API_URL);
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
                         id="res_model"
                         label="Data Model"
                         type="text"
                         fullWidth
                         variant="standard"
                         defaultValue={props.formState['res_model']}
                         onChange={ (event) => {
                              props.setFormState('res_model', event.target.value);
                         }}
                    />

               </DialogContent>
          </>
     );
};