import React,{Component} from 'react'
import {
    AppBar,
    Button,
    Dialog,
    Icon,
    IconButton,
    Toolbar,
    Grid,
    MenuItem
} from "@material-ui/core";

import { Form, Field } from 'react-final-form';
import {TextField,Select} from 'final-form-material-ui';
const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
};

export  default class AddBureau extends Component {
    constructor(props) {
        super(props);
        this.state={
            id:0,
            numero:"",
            nbPlaces:0,
            statut:"",
            hasError:false,
            message:"",
            editMode:false,
            editValue:{}
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.editValue!=undefined) {
            const val = nextProps.editValue;
            this.setState({
                id: val.id,
                numero: val.numero,
                nbPlaces: val.nbPlaces,
                statut: val.statut,
                utilisateurs: val.utilisateurs,
                editMode: nextProps.editMode
            });
        }
    }

    handleInput=(event)=>{
        const name=event.target.name;
        let value=event.target.value;
        this.setState({[name]:value});
        console.log(name,value)

    }

    validate=(values)=>{
      const errors = {};
      if (!values.numero) {
        errors.numero = 'Veuillez entrer un numero';
      } else if (values.numero.length != 4) {
        errors.numero= "Le numero doit avoir 4 caracteres (A/B/C suivi d'un nombre a 3 chiffres)";
      }else if(!new RegExp("^([A-C][1-9][0-9]{2})$","g").test(values.numero)){
        errors.numero = "Numero invalide (A/B/C suivi d'un nombre a 3 chiffres. Ex : A100)"
      }

      if (!values.places) {
        errors.places= 'Veuillez entrer un nombre de places';
      } else if (values.places< 1) {
        errors.places= 'Au moins une place';
      }
      return errors;
    }

    onSubmit=(values)=>{
        const {id}=this.state;
         this.props.saved({
             id:id,
             numero:values.numero,
             nbPlaces:values.places,
             nbPlacesOccupees:0,
            statut:values.statut
        },this.state.editMode);
        this.props.closed();
    }

    render() {
        return(
            <Dialog open={this.props.opened}  fullScreen={true}>
                <AppBar className={styles.appBar}>
                    <Toolbar>
                        <IconButton color="inherit" onClick={this.props.closed} aria-label="Close">
                            <Icon>close</Icon>
                        </IconButton>

                        <Button color="inherit" onClick={this.onSubmit}>
                            <Icon>save</Icon>
                        </Button>
                    </Toolbar>
                </AppBar>
                <Form
                  onSubmit = {this.onSubmit}
                  initialValues={{numero:this.state.numero,places:this.state.nbPlaces,statut:this.state.statut}}
                  validate={this.validate}
                  render={({ handleSubmit, reset, submitting, pristine, values }) => (
                    <form  onSubmit={handleSubmit} style={{margin:"10%"}}>
                      <Grid item style={{ marginTop: 16 }}>
                      <Field
                        fullWidth
                        required
                        name="numero"
                        component={TextField}
                        type="text"
                        label="Numéro"
                        inputProps={{maxlength:"4"}}
                        />
                      </Grid>
                      <Grid item style={{ marginTop: 16 }}>
                      <Field
                        fullWidth
                        required
                        name="places"
                        component={TextField}
                        type="number"
                        label="Places"
                      />
                    </Grid>
                    <Grid item style={{ marginTop: 16 }}>
                      <Field
                        fullWidth
                        required
                        name="statut"
                        component={Select}
                        label="Statut"
                        formControlProps={{ fullWidth: true }}
                        >
                        <MenuItem value={"Standard"}>Standard</MenuItem>
                        <MenuItem value={"ZRR"}>ZRR</MenuItem>
                      </Field>
                    </Grid>
                      <Grid item style={{ marginTop: 16 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          disabled={submitting}
                          >
                          Submit
                        </Button>
                      </Grid>
                    </form>
                  )}
                  />
            </Dialog>

        );

    }


}
