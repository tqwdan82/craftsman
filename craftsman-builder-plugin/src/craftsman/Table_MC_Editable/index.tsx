import {DialogContent, DialogContentText, DialogTitle, TextField} from '@mui/material';
import TableViewIcon from '@mui/icons-material/TableView';

export const componentType = 'Table_MC_Editable';
export const label = 'Editable Table (Resource)';
export const description = "Create an editable table based on a data model";
export const icon = TableViewIcon;
export const modal = (props:any) => {
     props.setFormState('res_domain', window.location.origin);
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

                    {/* <TextField
                         autoFocus
                         margin="dense"
                         id="res_domain"
                         label="Domain address of Table Resource/Data Model"
                         type="text"
                         fullWidth
                         variant="standard"
                         defaultValue={props.formState['res_domain']}
                         onChange={ (event) => {
                              props.setFormState('res_domain', event.target.value);
                         }}
                    /> */}

                    <TextField
                         autoFocus
                         margin="dense"
                         id="res_model"
                         label="Table Resource/Data Model"
                         type="text"
                         fullWidth
                         variant="standard"
                         defaultValue={props.formState['res_model']}
                         onChange={ (event) => {
                              props.setFormState('res_model', event.target.value);
                         }}
                    />

                    <TextField
                         autoFocus
                         margin="dense"
                         id="none_editables"
                         label="Uneditable Fields(Comma(,) Delimited)"
                         type="text"
                         fullWidth
                         variant="standard"
                         defaultValue={props.formState['none_editables']}
                         onChange={ (event) => {
                              props.setFormState('none_editables', event.target.value);
                         }}
                    />
               </DialogContent>
          </>
     );
};