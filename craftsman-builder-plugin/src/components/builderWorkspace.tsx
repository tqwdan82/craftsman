import React from "react";
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {Button, Dialog, DialogActions, IconButton, Paper, Stack, Typography} from '@mui/material';

export default function BuilderWorkspace(props:any) {
     const [open, setOpen] = React.useState(false);
     const [modal, setModal] = React.useState('');
     const [modalObject, setModalObject] = React.useState<any>(<></>);
     const [modalId, setModalId] = React.useState('');
     const [modalFormState, setModalFormState] = React.useState<any>({});

     const handleClickOpen = () => {
          setOpen(true);
     };

     const handleClose = () => {
          setOpen(false);
          setModal('');
          setModalFormState({});
     };

     React.useEffect(() => {
          if(modal !== undefined && modal !== ''){
               const mod = props.modules.find( (fmod: { name: string; }) => fmod.name === modal );
               const ModModal = mod.mod.modal;
               setModalObject(<ModModal formState={modalFormState} setFormState={setFormState} setModalFormState={setModalFormState} isEditing={true}/>);
          }
     },[modal]);

     const Component = styled(Paper)(({ theme }) => ({
          backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
          ...theme.typography.body2,
          padding: theme.spacing(1),
          textAlign: 'center',
          marginBottom: '10px',
          color: theme.palette.text.secondary,
          height: '100px'
     }));
     
     const setFormState = (name:string, value:string) => {
          let updatedModalFormState = {...modalFormState};
          updatedModalFormState[name] = value;
          // console.log(updatedModalFormState)
          setModalFormState(updatedModalFormState);
     }

     const openModal = (name:string, configData:any) => {
          setModal(name);
          setModalFormState(configData);
          handleClickOpen();
     }

     const handleUpdate= () => {
          props.updateComponent(modalId,modalFormState);
          handleClose();
     };

     return (
          <>
               {props.pageComponents !== undefined
                    && props.pageComponents.length > 0
                    && props.pageComponents.map( (pageComponent: any, index:number) => (
                         <Component key={index}>
                              <Typography variant="h6">{pageComponent.componentType}</Typography>
                              <Typography>Name: {pageComponent.config.name}</Typography>
                              <Stack 
                                   direction="row" 
                                   justifyContent="center"
                                   alignItems="center"
                                   spacing={1}>
                                   <IconButton aria-label="update" color="primary" onClick={() => {
                                        setModalId(pageComponent.name);
                                        openModal(pageComponent.componentType, pageComponent.config)
                                   }} >
                                        <EditIcon />
                                   </IconButton>
                                   <IconButton aria-label="move_up" color="primary" onClick={() => {
                                        // props.deleteComponent(pageComponent.id);
                                        console.log("move up")
                                   }}>
                                        <KeyboardArrowUpIcon />
                                   </IconButton>
                                   <IconButton aria-label="move_down" color="primary" onClick={() => {
                                        // props.deleteComponent(pageComponent.id);
                                        console.log("move down")
                                   }}>
                                        <KeyboardArrowDownIcon />
                                   </IconButton>
                                   <IconButton aria-label="delete" color="primary" onClick={() => {
                                        props.deleteComponent(pageComponent.name);
                                   }}>
                                        <DeleteIcon />
                                   </IconButton>
                                   
                              </Stack>
                         </Component>
                    ))
               }
               <Dialog open={open} onClose={handleClose}>
                    {modalObject}
                    <DialogActions>
                         <Button onClick={handleClose}>Cancel</Button>
                         <Button onClick={handleClose}>Delete</Button>
                         <Button onClick={handleUpdate}>Update</Button>
                    </DialogActions>
               </Dialog>
          </>
     )
};