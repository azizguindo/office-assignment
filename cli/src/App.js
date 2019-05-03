import React from 'react';

import './App.css';

import { BrowserRouter as Router, Route } from "react-router-dom";

import MHead from "./MUHead";

import ListStatut from "./statut/ListStatut";
import ListUser from "./user/ListUser";
import ListBureau from "./bureau/list-bureau";
import UserBureau from "./bureau/UserBureau";



function App() {
  return (
    <Router>
         <MHead/>
         <Route path="/" component={HOME}/>
        <Route path="/bureau" component={ListBureau}/>

        <Route path="/statut" component={ListStatut}/>

        <Route path="/user" component={ListUser}/>

      <Route path="/bureauusers/:id" component={UserBureau}/>

    </Router>
  );
}
const HOME=()=>{
    return(
        <div></div>
    );
}

export default App;
