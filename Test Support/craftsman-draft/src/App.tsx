import React from 'react';
import './App.css';
import Craftsman from './render/Craftsman';
import { Typography } from '@mui/material';
import allPages from './pages.json';
import * as Services1 from './functions/services1';

import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  return (
    <div className="App">
      <Typography>Header</Typography>
      {/* <Craftsman pages={allPages} services={Services1}/> */}
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr className='table-warning'>
              <th scope="row">1</th>
              <td>
                <input 
                  className="form-control" 
                  type="text" 
                  placeholder="First Name" 
                  aria-label="first name" 
                  value={'Martin'}
                />
              </td>
              <td>
                <input 
                  className="form-control" 
                  type="text" 
                  placeholder="Last Name" 
                  aria-label="last name" 
                  value={'Otto'}
                />
              </td>
              <td>
                <input 
                  className="form-control" 
                  type="text" 
                  placeholder="Handle" 
                  aria-label="handle" 
                  value={'@mdo'}
                />
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colSpan={2}>Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="container-fluid mb-3">
        <div className="row justify-content-end">
          <div className="col-4 d-grid">
            <button type="button" className="btn btn-primary">Save</button>
          </div>
        </div>
      </div>
      <Typography>Footer</Typography>
    </div>
  );
}

export default App;
