import * as React from 'react';
import { RouteProps } from 'react-router';
import UserDataService from '../service/UserDataService';
import { withRouter } from 'react-router';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props{
}

interface State{
    id : number;
    nom : string;
    prenom : string;
    statut1 : string;
    dateArrivee : Date;
    dateDepart : Date;
}

interface Err{
    nom : string;
    prenom : string;
    statut1 : string;
    dateerr : string;
}

class UserComponentUpdate extends React.Component<Props & RouteProps ,State> {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.router.params.id,
            nom : "",
            prenom : "",
            statut1 : "",
            dateArrivee : new Date(),
            dateDepart : new Date()
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
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

        if(values.dateArrivee>values.dateDepart){
            errors.dateerr = "La date d'arrivée doit être avant la date de départ";
            alert(errors);
        }

        return errors;

    }

    onSubmit(values) {
        const user = {
            id: this.state.id,
            nom: values.nom,
            prenom: values.prenom,
            statut1: values.statut1,
            dateArrivee : new Date(values.dateArrivee),
            dateDepart : new Date(values.dateDepart)
        }

            UserDataService.updateUser(this.state.id, user)
                .then(() => this.props.router.push('/users'))
    }

    componentDidMount() {
        UserDataService.retrieveUser( this.state.id)
            .then(response => this.setState({
            nom: response.data.nom,
            prenom: response.data.prenom,
            statut1: response.data.statut1,
            dateArrivee : response.data.dateArrivee,
            dateDepart : response.data.dateDepart
            }));
    }

    handleArrivee(date) {
        this.setState({
          dateArrivee: date
        });
    }

    render() {
        return (
            <div>
                <h3>User</h3>
                <div className="container">
                    <Formik
                    initialValues={{id : this.props.router.params.id,
                                    nom : this.state.nom,
                                    prenom : this.state.prenom,
                                    statut1 : this.state.statut1,
                                    dateArrivee : this.state.dateArrivee,
                                    dateDepart : this.state.dateDepart
                                    }}
                    onSubmit={this.onSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validate={this.validate}
                    enableReinitialize={true}>
                        {
                            (props) => (
                                 <Form>
                                      <ErrorMessage name="dateerr" component="div" className="alert alert-warning" />
                                      <fieldset className="form-group">
                                           <label>Id</label>
                                           <Field className="form-control" type="text" name="id" disabled={true} />
                                      </fieldset>
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
                                           <Field  className="form-control" component="select" name="statut1" placeholder="Statut">
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
                                           <Field className="form-control" component={DatePicker} name="dateArrivee" placeHolder="Date"/>
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

export default withRouter(UserComponentUpdate);