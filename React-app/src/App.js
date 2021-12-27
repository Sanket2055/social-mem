// !if u get cors error by making the request to backend
// ! step 1 add "proxy" : "http://localhost:PORT" 
// ! where the port is the port where u run the app (add this in package.json below private property)
// !once the package.json is changed we always restart 

// ! step 2 check wheter u used app.use(cors()) after specifiying the route (it should be first );
import React from 'react'
import { BrowserRouter , Routes ,Route } from 'react-router-dom';
import {Container} from '@material-ui/core';
import { Navbar } from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
 const App = () => {

    return (
      <BrowserRouter>
      
        <Container maxWidth="lg">
          <Navbar/>
       
          <Routes>

            <Route path="/" exact element={<Home/>}/>
            <Route path='/auth' exact element={<Auth/>} />
          </Routes>
          
          
    
        
      </Container>
      </BrowserRouter>
      
    )
}
export default App;

