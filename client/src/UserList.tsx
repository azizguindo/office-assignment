import * as React from 'react';
import UserDataService from './service/UserDataService';
import { RouteProps } from 'react-router';
import { withRouter } from 'react-router';
import {History} from 'history';

interface Bureau{
    id : number;
    nbPlaces : number;
    nbPlacesOccupees : number;
    numero : string;
    statut : string;
}

interface Statut{
    id : number;
    nom : string;
    place : number;
    type : string ;
}

interface User{
    id : number;
    nom : string;
    prenom : string;
    nomStatut : string;
    dateArrivee : Date;
    dateDepart : Date;
    date1 : string;
    date2 : string;
    statut : Statut ;
    bureau : Bureau;
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
                this.state.users.map((user : User)=>{
                            user.date1 = String(new Date(user.dateArrivee).getDate())+'/'+String(new Date(user.dateArrivee).getMonth()+1)+'/'+String(new Date(user.dateArrivee).getFullYear());
                            user.date2 = String(new Date(user.dateDepart).getDate())+'/'+String(new Date(user.dateDepart).getMonth()+1)+'/'+String(new Date(user.dateDepart).getFullYear());
                            }
                        );
                this.setState({users : this.state.users,isLoading :false});
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
                 <table className="table table-bordered table-striped">
                    <tbody>
                        <tr>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Statut</th>
                            <th>Date Arrivée</th>
                            <th>Date Départ</th>
                            <th>Bureau</th>
                            <th/>
                            <th/>
                        </tr>
                        {users.map((user : User)=>
                        <tr key={user.id}>
                                 <td>{user.nom}</td>
                                 <td>{user.prenom}</td>
                                 <td>{user.nomStatut}</td>
                                 <td>{user.date1}</td>
                                 <td>{user.date2}</td>
                                 <td>Non affecté</td>
                                 <td><button className="btn btn-success"  onClick={this.handleUpdate(user.id)}>Modifier</button></td>
                                 <td><button className="btn btn-warning"  onClick={this.handleDelete(user.id)}>Supprimer</button></td>
                        </tr>
                        )}
                    </tbody>
                 </table>
                 </div>
                 <div className="row">
                     <button className="btn btn-success" onClick={this.handleAdd()}>Ajouter</button>
                 </div>
             </div>
        );
    }
}
export default withRouter(UserList);