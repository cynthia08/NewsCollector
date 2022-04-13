import './App.css';
import React, { useState } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Profile from './Components/pages/Profile'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import TopNews from './Components/pages/TopNews';
import About from './Components/pages/About';
import Home from './Components/pages/Home';
import NotFound from './Components/pages/NotFound';
import Sources from './Components/pages/Sources';
import UserContext from './Components/user-context';
import Comparison from './Components/pages/Comparison';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Register from './Components/pages/Register';
import PublicRoute from './Components/routes/PublicRoute';
import PrivateRoute from './Components/routes/PrivateRoute';
import Reactions from './Components/pages/Reactions';

function App() {
  const [userID, setUserID] = useState("1");
  const value = { userID, setUserID };
  const theme = createTheme({
    typography: {
      fontFamily: [
        'Poppins', 
        'sans-serif',
      ].join(','),
    },
  });


  return (
    <ThemeProvider theme={theme}>
      <div>
        <UserContext.Provider value={value}>
          <Router>
              <Switch>
                  <PublicRoute restricted={false} path='/' exact component={Home} />
                  <PublicRoute restricted={false} path='/register' exact component={Register} />
                  <PrivateRoute path='/profile' exact component={Profile} />
                  <PrivateRoute path='/topnews/:id' exact component={TopNews} />
                  <PrivateRoute path='/about' exact component={About} />
                  <PrivateRoute path='/all-sources' exact component={Sources} />
                  <PrivateRoute path='/comparison' exact component={Comparison} />
                  <PrivateRoute path='/reactions' exact component={Reactions} />
                  <PublicRoute component={NotFound} path="*" />


                {
                  /*
                  <Route path='/login' exact component={Home} />
                  <Route path='/profile' exact component={Profile} />
                  <Route path='/topnews/:id' exact component={TopNews} />
                  <Route path='/about' exact component={About} />
                  <Route path='/all-sources' exact component={Sources} />
                  <Route path='/comparison' exact component={Comparison} />
                  <Route path='/register' exact component={Register} />
                  */
                }

               
            </Switch>
          </Router>
        </UserContext.Provider>
        
      </div>
    </ThemeProvider>

  );
}

export default App;
