import React from "react";
import { styled } from '@mui/material/styles';
import { Box, Button, Card, CardContent, CardMedia, Container, Fab, Grid, Popover, Stack, Typography } from '@mui/material';
import {
     useNavigate
} from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import formIconImg from './static/images/forms-icon.png';
import TitleBar from "../components/titleBar";
import { config, protocol } from '../util/Constants';

export default function PageList(props:any) {
     const [pageList, setPageList] = React.useState<any>([]);
     const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

     const navigate = useNavigate();

     const fetchPages = async () => {
          const response = await fetch(`${config.API_URL}/web/craftsman2/api/craftsman2Page`, 
               {
                    // mode: 'cors',
                    headers: {
                         'Content-Type': 'application/x-www-form-urlencoded',
                         'Access-Control-Allow-Origin': '*',
                         'Access-Control-Allow-Headers': "Access-Control-Allow-Headers,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Origin,X-Auth,X-Requested-With,Content-Type,Accept,content-type,application/json,x-auth,Access-Control-Request-Method,Access-Control-Request-Headers",
                         'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
                    }
               }
          );

          const results = await response.json();
          setPageList(results);
     };

     React.useEffect( () => {

          fetchPages();
     }, [])

     const NewButton = styled(Fab)(({ theme }) => ({
          margin: 0,
          top: 'auto',
          right: 20,
          bottom: 50,
          left: 'auto',
          position: 'fixed',
     }));

     // const PageButton = styled(Button)(({ theme }) => ({
     //      backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
     //      ...theme.typography.body2,
     //      padding: theme.spacing(1),
     //      textAlign: 'center',
     //      color: theme.palette.text.secondary,
     //      width: '100%',
     //      height: '150px'
     // }));

     // const PageItem = (props:any) => (          
     //      <Grid item xs={12} sm={2} md={2}>
     //           <PageButton variant="outlined" onClick={() => {props.ideRoute(props.dataId)} }>
     //                <Typography>{props.label}</Typography>
                    
     //           </PageButton>
     //           <Typography align="center">{props.dataId}</Typography>
     //      </Grid>
     // );

     const renderURLPrefix = `${protocol}://${window.location.host}/craftsman2/main/render`;

     const handleDelete = (pageId:string) => {

          const deletePage = async () => {

               await fetch(`${config.API_URL}/web/craftsman2/api/singlePage`, {
                    method: 'delete',
                    body: JSON.stringify({
                         pageId: pageId,
                    }),
                    headers: {'Content-Type': 'application/json'}
               });
               fetchPages();
               
          }
          deletePage();

     }

     const openPageInNewPage = (id:string) => {
          const url = `${renderURLPrefix}/${id}`;
          window.open(url, '_blank', 'noopener,noreferrer');
     };

     const handleClose = () => {
          setAnchorEl(null);
     };

     const open = Boolean(anchorEl);
     const id = open ? 'simple-popover' : undefined;

     return (
          <div style={{'minWidth': '900px'}}>
               <Container maxWidth="lg">
                    {/* <Typography variant="h3">Pages</Typography>
                    <Grid container spacing={1}>
                         {
                              pageList.map ( (page: {
                                   [x: string]: any; pageName: any; 
                              }) => (<PageItem label={page.pageName} ideRoute={props.ideRoute} dataId={page.pageId}/>) )
                         }
                    </Grid> */}
                    <TitleBar />
                    <Grid container spacing={1} sx={{minWidth: '800px'}}>
                    {
                              pageList.map ( (page: {
                                   [x: string]: any; pageName: any; 
                              }, index:number) => (
                                   <Grid item xs={12} sm={6} md={6} key={index}>
                                        <Card sx={{ display: 'flex', flexDirection:'row', mb:2, mt: 1}}>
                                             <CardMedia
                                                  component="img"
                                                  sx={{ width: 150, margin:2, padding:6, background: '#e5e5e5'}}
                                                  image={formIconImg}
                                                  alt="Form Icon"
                                             />
                                             <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                                                  <CardContent>
                                                       <Typography component="div" variant="h5" sx={{mb:3}}>
                                                            {page.pageName}
                                                       </Typography>
                                                       {/* <Typography component="div" variant="subtitle1">
                                                            {page.pageId}
                                                       </Typography> */}
                                                       <Stack spacing={2} direction={{sm:'column', md:'row'}}  sx={{mb:2}}>
                                                            <Button variant="text" onClick={()=>{navigate("ide", {state:page.pageId});}}>Edit</Button>
                                                            <Button variant="text" onClick={()=>{openPageInNewPage(page.pageId);}}>Open</Button>
                                                       </Stack>
                                                       <Stack spacing={2} direction={{xs:'column', sm:'row'}}>
                                                            <Button variant="text" onClick={()=>{handleDelete(page.pageId);}}>Delete</Button>
                                                            <Button variant="text" onClick={(event)=>{
                                                                 navigator.clipboard.writeText(`${renderURLPrefix}/${page.pageId}`);
                                                                 setAnchorEl(event.currentTarget);
                                                            }}>Copy URL</Button>

                                                            <Popover 
                                                                 id={id}
                                                                 open={open}
                                                                 anchorEl={anchorEl}
                                                                 onClose={handleClose}
                                                                 anchorOrigin={{
                                                                 vertical: 'bottom',
                                                                 horizontal: 'right',
                                                                 }}
                                                                 transformOrigin={{
                                                                 vertical: 'center',
                                                                 horizontal: 'center',
                                                            }}
                                                            >
                                                                 <Typography sx={{ p: 2 }}>Copied</Typography>
                                                            </Popover>

                                                       </Stack>
                                                  </CardContent>
                                             </Box>
                                        </Card>
                                        </Grid>
                              )
                         )
                    }
                    </Grid>
                    <NewButton color="primary" aria-label="save" onClick={() => {props.newIdeRoute()}}>
                         <AddCircleIcon />
                    </NewButton>
               </Container>
          </div>
     )
}