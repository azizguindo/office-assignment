import * as React from 'react';
import { RouteProps } from 'react-router';
import OfficeDataService from '../service/OfficeDataService';
import { withRouter } from 'react-router';
import { Formik, Form, Field, ErrorMessage } from 'formik';

interface Props{
}

interface State{
    numero : string ;
    nbPlaces : number ;
    nbPlacesOccupees : number;
    statut : string ;
    users : Array<User>;
}

interface User{
    id : number;
    nom : string;
    prenom : string;
}


interface Err{
    numero : string;
}

class OfficeComponentAdd extends React.Component<Props & RouteProps ,State> {

    constructor(props) {
        super(props);
        this.state = {
            numero : "",
            nbPlaces : 0,
            nbPlacesOccupees : 0,
            statut: "",
            users : []
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }



    validate(values) {
        const errors = {} as Err;
        if (!values.numero) {
            errors.numero = 'Enter a Name';
            }


        return errors;
    }

    onSubmit(values) {
        const office = {
            numero : values.numero,
            statut : values.statut,
            nbPlaces : values.nbPlaces,
            nbPlacesOccupees : 0,
            users : []
        }
        OfficeDataService.createOffice(office)
        .then(() => this.props.router.push('/offices'))

    }


    render() {

        return (
            <div>
                <h3>User</h3>
                <div className="container">
                    <Formik
                    initialValues={{numero: ""}}
                    onSubmit={this.onSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validate={this.validate}
                    enableReinitialize={true}>
                        {
                            (props) => (
                                 <Form>
                                      <fieldset className="form-group">
                                           <label>Numéro</label>
                                           <Field className="form-control" component="select" name="classe" >
                                               <option value="" selected={true} disabled={true} hidden={true}>Choose here</option>
                                               <option value="A">A</option>
                                               <option value="B">B</option>
                                               <option value="C">C</option>
                                           </Field>
                                           <Field className="form-control" type="number" name="numero"  min = "100" max = "500"/>
                                           <ErrorMessage name="numero" component="div" className="alert alert-warning" />
                                      </fieldset>
                                      <fieldset className="form-group">
                                           <label>Capacité</label>
                                           <Field className="form-control" type="text" name="nbPlaces" />
                                           <ErrorMessage name="nbPlaces" component="div" className="alert alert-warning" />
                                      </fieldset>
                                      <fieldset className="form-group">
                                           <label>Statut</label>
                                           <Field  className="form-control" component="select" name="statut" placeholder="Statut">
                                                <option value="" selected={true} disabled={true} hidden={true}>Choose here</option>
                                                <option value="Standard">Standard</option>
                                                <option value="ZRR">ZRR</option>
                                           </Field>
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

export default withRouter(OfficeComponentAdd);