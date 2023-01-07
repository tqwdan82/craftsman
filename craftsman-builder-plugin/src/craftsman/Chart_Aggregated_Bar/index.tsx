import {DialogContent, DialogContentText, DialogTitle, TextField} from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';

export const componentType = 'Chart_Aggregated_Bar';
export const label = 'Aggregated Bar Chart';
export const description = "Create an aggregated bar chart that displays your aggregated data";
export const icon = BarChartIcon;
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
                         id="aggregateBy"
                         label="Attribute to Aggregate by(Case Sensitive)"
                         type="text"
                         fullWidth
                         variant="standard"
                         defaultValue={props.formState['aggregateBy']}
                         onChange={ (event) => {
                              props.setFormState('aggregateBy', event.target.value);
                         }}
                    />

                    <TextField
                         autoFocus
                         margin="dense"
                         id="color"
                         label="Color of bar(#hex)"
                         type="text"
                         fullWidth
                         variant="standard"
                         defaultValue={props.formState['color']}
                         onChange={ (event) => {
                              props.setFormState('color', event.target.value);
                         }}
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
                         label="Data"
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