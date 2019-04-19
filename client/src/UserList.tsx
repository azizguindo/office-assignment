import * as React from 'react';
import UserDataService from './service/UserDataService';
import { RouteProps } from 'react-router';
import { withRouter } from 'react-router';
import {History} from 'history';

interface User{
    id : number;
    nom : string;
    prenom : string;
    statut : string;
    dateArrivee : Date;
    dateDepart : Date;
}

interface UserListProps {
    history : History;
}

interface UserListState {
    users : Array<User>;
    isLoading : boolean;
}

class UserList extends React.Component<UserListProps & RouteProps ,UserListState>{
    constructor(props : any){
        super(props);
        this.state = {
            users : [],
            isLoading : false
        };
        this.refreshUsers = this.refreshUsers.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }



    componentDidMount() {
        this.setState({isLoading: true});
        this.refreshUsers();
    }

    refreshUsers(){
        UserDataService.retrieveAllUsers()
            .then(response=>{
                this.setState({users : response.data,isLoading :false});
        });

    }

    handleDelete=(id) =>(event:any)=> {
        UserDataService.deleteUser(id)
        .then(res => {
            this.refreshUsers();
        }
        )
    }

    handleAdd=() =>(event:any)=>{
        this.props.router.push(`/users/add`);
    }

    handleUpdate=(id) =>(event:any)=> {
        this.props.router.push(`/users/update/${id}`);
    }

    render() {
       const {users,isLoading} = this.state;

        if (isLoading){
            return <p>Loading...</p>
        }
        return (
             <div>
                 <h2>User List</h2>
                 <div className="container">
                 <table className="table table-striped">
                    <tbody>
                        <tr>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Statut</th>
                            <th>Date Arrivée</th>
                            <th>Date Départ</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                        {users.map((user : User)=>
                        <tr key={user.id}>
                                 <td>{user.nom}</td>
                                 <td>{user.prenom}</td>
                                 <td>{user.statut}</td>
                                 <td>{user.dateArrivee}</td>
                                 <td>{user.dateDepart}</td>
                                 <td><button className="btn btn-success"  onClick={this.handleUpdate(user.id)}>Update</button></td>
                                 <td><button className="btn btn-warning"  onClick={this.handleDelete(user.id)}>Delete</button></td>
                        </tr>
                        )}
                    </tbody>
                 </table>
                 </div>
                 <div className="row">
                     <button className="btn btn-success" onClick={this.handleAdd()}>Add</button>
                 </div>
             </div>
        );
    }
}
export default withRouter(UserList);