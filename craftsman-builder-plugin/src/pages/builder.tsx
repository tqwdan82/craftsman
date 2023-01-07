import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, Paper, Stack, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

import BuilderToolbar from "../components/builderToolbar";
import BuilderWorkspace from "../components/builderWorkspace";
import * as CraftmanTools from '../craftsman';

import { config } from '../util/Constants';

const Workspace = styled(Paper)(({ theme }) => ({
     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
     ...theme.typography.body2,
     padding: theme.spacing(1),
     textAlign: 'center',
     color: theme.palette.text.secondary,
     width: '75%'
}));

const Toolbar = styled(Paper)(({ theme }) => ({
     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
     ...theme.typography.body2,
     padding: theme.spacing(1),
     textAlign: 'center',
     color: theme.palette.text.secondary,
     width: '25%',
     display: 'flex'
}));

const SaveButton = styled(Fab)(({ theme }) => ({
     margin: 0,
     top: 'auto',
     right: 85,
     bottom: 50,
     left: 'auto',
     position: 'fixed',
}));

const CancelButton = styled(Fab)(({ theme }) => ({
     margin: 0,
     top: 'auto',
     right: 20,
     bottom: 50,
     left: 'auto',
     position: 'fixed',
}));

export default function Builder(props:any) {
     const location = useLocation();
     const input = location.state;
     const [data, setData] = React.useState<any>({});

     const [pageComponents, setPageComponents] = React.useState<any[]>([]
          // data === null || data === undefined ? [] :
          //      data.pageComponents === undefined ? [] : 
          //           data.pageComponenets === null ? [] : 
          //                data.pageComponents 
     );
     const [modules, setModules] = React.useState<any[]>([]);
     const [pageName, setPageName] = React.useState(''
          // data === null || data === undefined ? '' :
          //      data.pageName === undefined ? '' : 
          //           data.pageName === null ? '' : 
          //                data.pageName 
     );
     const [pageId, setPageId] = React.useState(''
          // data === null || data === undefined ? '' :
          //      data.pageId === undefined ? '' : 
          //           data.pageId === null ? '' : 
          //                data.pageId 
     );
     const [page, setPage] = React.useState();
     const [open, setOpen] = React.useState(false);

     React.useEffect( () => {
          const fetchPages = async () => {
               const response = await fetch(`${config.API_URL}/web/craftsman2/api/singlePage?pageId=${input}`);
               let results = await response.json();

               // const pageString = ''+results.page;
               // results.page = results.page === undefined ? `{ "paddingHorizontal": "1.25em", "paddingVertical": "1em"}`:
               //      results.page === '' ? `{ "paddingHorizontal": "1.25em", "paddingVertical": "1em"}`
               //           : JSON.parse(results.page);
               
               setData(results);
               setPageComponents(results.pageComponents);
               setPageName(results.pageName);
               setPageId(results.pageId );
               setPage(JSON.parse(results.page));
          }

          if(input!== null){
               fetchPages();
          }
     }, []);

     const handleClickOpen = () => {
          setOpen(true);
     };

     const handleClose = () => {
          setOpen(false);
     };

     const handleSave = () => {

          const mappedComponents = pageComponents.map( (component, indx) => {

               return {
                    componentType: component.componentType,
                    config: component.config,
                    order: indx
               }
          })

          

          const save = async () => {

               let pageObject;
               if(page === undefined || page === ''){
                    pageObject = { "paddingHorizontal": "1.25em", "paddingVertical": "1em"};
               }else{
                    pageObject = page;
               }
               //Data to save
               console.log({
                    pageId: pageId,
                    page: JSON.stringify(pageObject),
                    pageName: pageName,
                    pageComponents : mappedComponents
               });

               await fetch(`${config.API_URL}/web/craftsman2/api/savePage`, {
                    method: pageId === '' ? 'post' : 'put',
                    body: JSON.stringify({
                         pageId: pageId,
                         page: JSON.stringify(pageObject),
                         pageName: pageName,
                         pageComponents : mappedComponents
                    }),
                    headers: {'Content-Type': 'application/json'}
               });
               
          }
          save();

          setOpen(false);
     }

     React.useEffect(()=>{
          const loadModule = async() => {
               let allModules:any[] = [];

               const modNames = Object.keys(CraftmanTools);
               for(let toolKey of modNames){
                    const newMod = await import(`../craftsman/${toolKey}`);
                    allModules.push({
                         name: toolKey,
                         mod: newMod
                    });
               }
               let sortedAllModules = allModules.sort(function (first, second) {
                    if ( first.name < second.name ){
                         return -1;
                    }
                    if ( first.name > second.name ){
                         return 1;
                    }
                       return 0;
                 });
               setModules(sortedAllModules);
               
          };

          loadModule();
     }, []);

     // React.useEffect( () => {
     //      console.log(pageComponents);
     // }, [pageComponents]);

     const addPageComponents = (type:string, mappedComponentType:string, configData:any) => {
          let updatedPageComponents = [...pageComponents];
          updatedPageComponents.push({
               id: pageComponents.length+1,
               type: mappedComponentType,
               componentType: mappedComponentType,
               config: configData
          });
          setPageComponents(updatedPageComponents);
     }

     const updatePageComponent = (id:string, configData:any) => {

          let updatedPageComponentIndx = pageComponents.findIndex( component => component.id === id);
          let updatedPageComponent = pageComponents[updatedPageComponentIndx];
          updatedPageComponent.config = configData;

          let updatedPageComponents = [...pageComponents];
          updatedPageComponents.splice(updatedPageComponentIndx, 1, updatedPageComponent);
          setPageComponents(updatedPageComponents);

     }

     const deletePageComponent = (id:string) => {
          let updatedPageComponentIndx = pageComponents.findIndex( component => component.id === id);

          let updatedPageComponents = [...pageComponents];
          updatedPageComponents.splice(updatedPageComponentIndx, 1);
          setPageComponents(updatedPageComponents);

     }

     return (
     <div
          style={{marginLeft:'10px', marginRight:'10px', padding:'20px', minWidth: '900px'}}
     >
          <header className='py-3' style={{'lineHeight':1, 'borderBottom':'1px solid #e5e5e5'}}>
               <div className='row flex-nowrap justify-content-between align-items-center'>
               <div className="col-12 text-center">
               <div 
                    style={{
                    'fontSize':'2.25rem',
                    'color':'#343a40'
               }}>
                    {pageName === undefined ? 'Untitled (New)' : 
                         pageName === '' ? 'Untitled (New)' : pageName}
               </div>
               </div>
               </div>
          </header>
          <Stack
          direction={{ xs: 'column', sm: 'row', md: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          justifyContent="flex-start"
          alignItems="stretch"
          >
               <Toolbar>
                    <BuilderToolbar addPageComponents={addPageComponents} modules={modules}/>
               </Toolbar>
               <Workspace>
                    <BuilderWorkspace pageComponents={pageComponents} updateComponent={updatePageComponent} deleteComponent={deletePageComponent} modules={modules} />
               </Workspace>
          </Stack>
          <CancelButton color="info" aria-label="save" onClick={() => {props.backHomeRoute()}}>
               <KeyboardReturnIcon />
          </CancelButton>
          <SaveButton color="primary" aria-label="save" onClick={() => {handleClickOpen()}}>
               <SaveIcon />
          </SaveButton>

          <Dialog open={open} onClose={handleClose}>
               <DialogTitle>Saving Page</DialogTitle>
               <DialogContent>
                    <DialogContentText>
                         Save with the name of your page
                    </DialogContentText>
                    <TextField
                         autoFocus
                         margin="dense"
                         id="name"
                         label="Page Name"
                         type="text"
                         fullWidth
                         variant="standard"
                         value={pageName}
                         onChange={ (event) => {
                              setPageName(event.target.value);
                         }}
                         required
                    />
               </DialogContent>
               <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
               </DialogActions>
          </Dialog>
    </div>
     );
}