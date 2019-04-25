import * as React from 'react';
import {browserHistory,Router,Route} from "react-router";
import UserList from '../UserList'
import OfficeList from '../OfficeList'
import UserComponentUpdate from './UserComponentUpdate'
import UserComponentAdd from './UserComponentAdd'
import OfficeComponentAdd from './OfficeComponentAdd'


class InstructorApp extends React.Component<{},any>  {
    render() {
        return (
            <Router history={browserHistory}>
                    <h1>Instructor Application</h1>
                        <Route path="/"   component = {UserList} />
                        <Route path="/users"  component = {UserList} />
                        <Route path="/users/update/:id"  component = {UserComponentUpdate}/>
                        <Route path="/users/add"  component = {UserComponentAdd} />
                        <Route path="/offices" component = {OfficeList} />
                        <Route path="/offices/add" component = {OfficeComponentAdd} />
            </Router>
        )
    }
}

export default InstructorApp;