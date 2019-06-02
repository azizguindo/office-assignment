    import React from 'react';

import './App.css';

import { BrowserRouter as Router, Route } from "react-router-dom";

import MHead from "./MUHead";

import ListStatut from "./statut/ListStatut";
import ListUser from "./user/ListUser";
import ListBureau from "./bureau/list-bureau";
import UserBureau from "./bureau/UserBureau";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { createMuiTheme } from "@material-ui/core/styles";


const theme = createMuiTheme({
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
    <Router>
         <MHead/>
         <Route path="/" component={HOME}/>
        <Route path="/bureau" component={ListBureau}/>

        <Route path="/statut" component={ListStatut}/>

        <Route path="/user" component={ListUser}/>

      <Route path="/bureauusers/:id" component={UserBureau}/>

    </Router>
  </MuiThemeProvider>
  );
}
const HOME=()=>{
    return(

        <div></div>

    );
}

export default App;
