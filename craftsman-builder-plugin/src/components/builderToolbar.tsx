import React from "react";
import { styled } from '@mui/material/styles';
import {Button, Dialog, DialogActions, Grid, Paper, Stack, Typography} from '@mui/material';

export default function BuilderToolbar(props:any) {
     const [open, setOpen] = React.useState(false);
     const [modal, setModal] = React.useState('');
     const [modalComponentType, setModalComponentType] = React.useState('');
     const [modalObject, setModalObject] = React.useState<any>(<></>);
     const [modalFormState, setModalFormState] = React.useState<any>({});

     const handleClickOpen = () => {
          setModalFormState({});
          setOpen(true);
     };

     const handleClose = () => {
          setModalFormState({});
          setModal('');
          setModalComponentType('');
          setOpen(false);
     };

     // React.useEffect(() => {
     //      console.log(modalFormState)
          
     // },[modalFormState, setModalFormState]);

     React.useEffect(() => {
          if(modal !== undefined && modal !== ''){
               const mod = props.modules.find( (fmod: { name: string; }) => fmod.name === modal );
               const ModModal = mod.mod.modal;
               setModalFormState({});
               setModalObject(<ModModal formState={{}} setFormState={setFormState}/>);
          }
     },[modal, setModal]);

     const ToolButton = styled(Button)(({ theme }) => ({
          backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
          ...theme.typography.body2,
          padding: theme.spacing(1),
          textAlign: 'center',
          color: theme.palette.text.secondary,
          width: '100%',
          height: '80px'
     }));

     const Item = styled(Paper)(({ theme }) => ({
          backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
          ...theme.typography.body2,
          padding: theme.spacing(1),
          textAlign: 'center',
          color: theme.palette.text.secondary,
     }));

     const setFormState = (name:string, value:string) => {

          modalFormState[name] = value;
          let updatedData = {...modalFormState};
          setModalFormState(updatedData);
     }

     const openModal = (name:string, componentType:string) => {
          setModal(name);
          setModalComponentType(componentType);
          handleClickOpen();
     }

     const ToolbarItem = (props:any) => (
          
          <Grid item xs={12}>
               <ToolButton 
                    variant="outlined" 
                    onClick={() => {openModal(props.tid, props.componentType)} }
               >
                    <Stack 
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}>
                         <props.icon/>
                         <Typography sx={{fontSize: 12}}>{props.label}</Typography>
                    </Stack>
                    
                    
               </ToolButton>
          </Grid>
     );

     const handleCreate = () => {
          props.addPageComponents(modal,modalComponentType, modalFormState);
          handleClose();
     };
     
     return(
          <>
               <Grid container spacing={1}>
                    {
                         props.modules.map( (mod: { mod: {
                              [x: string]: any;
                              componentType: any; label: any; 
                         }; name: any; },
                              index:number) => (
                              <ToolbarItem key={index} label={mod.mod.label} icon={mod.mod.icon} tid={mod.name} componentType={mod.mod.componentType}/>
                         ))
                    }
               </Grid>
               <Dialog open={open} onClose={handleClose}>
                    {modalObject}
                    <DialogActions>
                         <Button onClick={handleClose}>Cancel</Button>
                         <Button onClick={handleCreate}>Create</Button>
                    </DialogActions>
               </Dialog>
          </>
     )
}