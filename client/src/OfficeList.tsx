import * as React from 'react';
import OfficeDataService from './service/OfficeDataService';
import { RouteProps } from 'react-router';
import { withRouter } from 'react-router';
import {History} from 'history';

interface OfficeListProps {
    history : History;
}

interface OfficeListState {
    offices : Array<Office>;
    isLoading : boolean;
}

interface Office{
    id : number;
    numero : string;
    nbPlaces : number;
    nbPlacesOccupees : number;
    statut : string;
    users : Array<User>
}

interface User{
    id : number;
    nom : string;
    prenom : string;
}

class OfficeList extends React.Component<OfficeListProps & RouteProps ,OfficeListState>{
    constructor(props : any){
        super(props);
        this.state = {
            offices : [],
            isLoading : false
        };
        this.refreshOffices = this.refreshOffices.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    refreshOffices(){
        OfficeDataService.retrieveAllOffices()
            .then(response=>{
                this.setState({offices : response.data,isLoading :false});
        });
    }

    componentDidMount() {
            this.setState({isLoading: true});
            this.refreshOffices();

        }

    handleDelete=(id) =>(event:any)=> {
        OfficeDataService.deleteOffice(id)
        .then(res => {
            this.refreshOffices();
        }
        )
    }

    handleAdd=() =>(event:any)=>{
        this.props.router.push(`/offices/add`);
    }

    handleUpdate=(id) =>(event:any)=> {
        this.props.router.push(`/offices/update/${id}`);
    }

    render() {
       const {offices,isLoading} = this.state;

        if (isLoading){
            return <p>Loading...</p>
        }
        return (
             <div>
                 <h2>Office List</h2>
                 <div className="container">
                 <table className="table table-bordered table-striped">
                    <tbody>
                        <tr>
                            <th>Numéro</th>
                            <th>Capacité</th>
                            <th>Occupation</th>
                            <th>Statut</th>
                            <th/>
                            <th/>
                        </tr>
                        {offices.map((office : Office)=>
                        <tr key={office.id}>
                                 <td>{office.numero}</td>
                                 <td>{office.nbPlaces}</td>
                                 <td>{office.nbPlacesOccupees}</td>
                                 <td>{office.statut}</td>
                                 <td><button className="btn btn-success"  onClick={this.handleUpdate(office.id)}>Modifier</button></td>
                                 <td><button className="btn btn-warning"  onClick={this.handleDelete(office.id)}>Supprimer</button></td>
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

export default withRouter(OfficeList);