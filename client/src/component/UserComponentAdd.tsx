import * as React from 'react';
import { RouteProps } from 'react-router';
import UserDataService from '../service/UserDataService';
import { withRouter } from 'react-router';
import { Formik, Form, Field, ErrorMessage } from 'formik';

interface Props{
}

interface State{
    nom : string;
    prenom : string;
    statut : string;
    dateArrivee : Date;
    dateDepart : Date;
}

interface Err{
    nom : string;
    prenom : string;
    statut : string;
    dateArrivee : Date;
    dateDepart : Date;
}

class UserComponent extends React.Component<Props & RouteProps ,State> {

    constructor(props) {
        super(props);

        this.state = {
            nom : "",
            prenom : "",
            statut : "",
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


        return errors;

    }

    onSubmit(values) {
        const user = {
            nom : values.nom,
            prenom : values.prenom,
            statut : values.statut,
            dateArrivee : values.dateArrivee,
            dateDepart : values.dateDepart
        }
        UserDataService.createUser(user)
            .then(() => this.props.router.push('/users'))
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
                                           <Field  className="form-control" component="select" name="statut" placeholder="Statut">
                                                <option value="" selected={true} disabled={true} hidden={true}>Choose here</option>
                                                <option value="Enseignant">Enseignant</option>
                                                <option value="Etudiant">Etudiant</option>

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
                                      <button className="btn btn-success" type="submit">Save</button>
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