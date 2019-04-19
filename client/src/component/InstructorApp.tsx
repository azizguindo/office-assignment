import * as React from 'react';
import {browserHistory,Router,Route} from "react-router";
import UserList from '../UserList'
import UserComponentUpdate from './UserComponentUpdate'
import UserComponentAdd from './UserComponentAdd'



class InstructorApp extends React.Component<{},any>  {
    render() {
        return (
            <Router history={browserHistory}>
                    <h1>Instructor Application</h1>
                        <Route path="/"   component = {UserList} />
                        <Route path="/users"  component = {UserList} />
                        <Route path="/users/update/:id"  component = {UserComponentUpdate}/>
                        <Route path="/users/add"  component = {UserComponentAdd} />
            </Router>
        )
    }
}

export default InstructorApp;