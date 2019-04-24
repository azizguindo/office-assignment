import * as React from 'react';
import { RouteProps } from 'react-router';
import UserDataService from '../service/UserDataService';
import StatusDataService from '../service/StatusDataService';
import { withRouter } from 'react-router';
import { Formik, Form, Field, ErrorMessage } from 'formik';

interface Props{
}

interface Statut{
    id : number;
    nom : string;
    place : number;
    type : string ;
}


interface State{
    nom : string;
    prenom : string;
    nomStatut : string;
    dateArrivee : Date;
    dateDepart : Date;
    statut : Statut;
    statuts : Array<Statut>;
}

interface Err{
    nom : string;
    prenom : string;
    nomStatut : string;
    dateArrivee : Date;
    dateDepart : Date;
    statut : Statut;
    statuts : Array<Statut>;
}

class UserComponent extends React.Component<Props & RouteProps ,State> {

    constructor(props) {
        super(props);

        this.state = {
            nom : "",
            prenom : "",
            nomStatut : "",
            dateArrivee : new Date(),
            dateDepart : new Date(),
            statut : {id : 0,nom:"",place:0,type:"Std"},
            statuts : []
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {
        StatusDataService.retrieveStatuts()
            .then(response => this.setState({
                statuts : response.data
            }));
    }

    validate(values) {
        const errors = {} as Err;
        if (!values.nom) {
            errors.nom = 'Enter a Name';
        } else if (values.nom.length < 2) {
            errors.nom= 'Enter at least 2 Characters in Nom';
        }

        if (!values.prenom) {
             errors.prenom= 'Enter a Prenom';
        } else if (values.prenom.length < 2) {
             errors.prenom= 'Enter at least 2 Characters in Prenom';
        }


        return errors;

    }

    onSubmit(values) {

        this.state.statuts.map((statut1: Statut)=>{
               if(statut1.nom === values.nomStatut){
                   const user = {
                       nom : values.nom.charAt(0).toUpperCase() + values.nom.slice(1),
                       prenom : values.prenom.charAt(0).toUpperCase() + values.prenom.slice(1),
                       nomStatut : values.nomStatut,
                       dateArrivee : new Date(values.dateArrivee),
                       dateDepart : new Date(values.dateDepart),
                       statut : statut1
                   }
                   alert(JSON.stringify(statut1))
                   UserDataService.createUser(user)
                       .then(() => this.props.router.push('/users'))
               }
          })


    }


    render() {

        return (
            <div>
                <h3>User</h3>
                <div className="container">
                    <Formik
                    initialValues={{nom: ""}}
                    onSubmit={this.onSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validate={this.validate}
                    enableReinitialize={true}>
                        {
                            (props) => (
                                 <Form>
                                      <fieldset className="form-group">
                                           <label>Nom</label>
                                           <Field className="form-control" type="text" name="nom" />
                                           <ErrorMessage name="nom" component="div" className="alert alert-warning" />
                                      </fieldset>
                                      <fieldset className="form-group">
                                           <label>Prenom</label>
                                           <Field className="form-control" type="text" name="prenom" />
                                           <ErrorMessage name="prenom" component="div" className="alert alert-warning" />
                                      </fieldset>
                                      <fieldset className="form-group">
                                           <label>Statut</label>
                                           <Field  className="form-control" component="select" name="nomStatut" placeholder="Statut">
                                                <option value="" selected={true} disabled={true} hidden={true}>Choose here</option>
                                                <option value="Professeur">Professeur</option>
                                                <option value="PhD">PhD</option>
                                                <option value="PostDoc">PostDoc</option>
                                                <option value="Admin">Admin</option>
                                                <option value="Stagiaire">Stagiaire</option>
                                           </Field>
                                      </fieldset>
                                      <fieldset className="form-group">
                                           <label>Date Arrivée</label>
                                           <Field  className="form-control" type="date" name="dateArrivee"/>
                                      </fieldset>
                                      <fieldset className="form-group">
                                           <label>Date Départ</label>
                                           <Field  className="form-control" type="date" name="dateDepart"/>
                                      </fieldset>
                                      <button className="btn btn-success" type="submit">Enregistrer</button>
                                 </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        );
    }
}

export default withRouter(UserComponent);