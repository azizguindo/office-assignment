import React,{Component} from 'react'
import {
  AppBar,
  Button,
  Dialog,
  Icon,
  IconButton,
  MenuItem,
  Toolbar,
  Grid,
  Paper
} from "@material-ui/core";
import { URL_ST_ALL,URL_USER_ALL} from "../utils/Constant";
import Service from "../service/Service";
import { Form, Field } from 'react-final-form';
import {TextField,Select} from 'final-form-material-ui';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from 'material-ui-pickers';

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

export default class AddUser extends Component{

  constructor(props) {
    super(props);
    this.state={
      nom:"",
      prenom:"",
      email:"",
      nomStatut:"",
      bureau:"",
      dateArrivee:new Date(),
      dateDepart:new Date(),
      statut :{
        id : 0,
        nom : "",
        place :0,
        type : ""
      },
      structure :"",
      observations : "",
      resAdm : "",
      laboratoire:"",
      hasError:false,
      message:"",
      bureauxDispo:[],
      id:0,
      editMode:false,
      editValue:{},
      lesStatuts:[],
      lesUtilisateurs:[],
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const val=nextProps.editValue;
    this.setState( {
      nom:val.nom,
      prenom:val.prenom ,
      nomStatut: val.nomStatut,
      email:val.email,
      statut : val.statut,
      dateArrivee : val.dateArrivee ,
      dateDepart : val.dateDepart,
      bureau: val.bureau,
      structure :val.structure,
      observations : val.observations,
      laboratoire : val.laboratoire,
      resAdm : val.resAdm,
      id:val.id,
      editMode:nextProps.editMode
    });

  }

  componentDidMount() {
    try {
      Service.get(URL_ST_ALL)
      .then(data=>{
        this.setState({lesStatuts:data});
      });

    }catch (e) {
      console.log("erreur",e.toString());
    }

    try {
      Service.get(URL_USER_ALL)
      .then(data=>{
        this.setState({lesUtilisateurs:data});
      });

    }catch (e) {
      console.log("erreur",e.toString());
    }
  }

  DatePickerWrapper1(props) {
    const {
      input: { name, onChange, value, ...restInput },
      meta,
      ...rest
    } = props;
    const showError =
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
    meta.touched;
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    return (
      <DatePicker
        {...rest}
        name={name}
        helperText={showError ? meta.error || meta.submitError : undefined}
        error={showError}
        inputProps={restInput}
        onChange={onChange}
        value={value == '' ? new Date(year + 1, month, day): value}
        format="dd/MM/yyyy"
        />
    );
  }

  DatePickerWrapper(props) {
    const {
      input: { name, onChange, value, ...restInput },
      meta,
      ...rest
    } = props;
    const showError =
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
    meta.touched;

    return (
      <DatePicker
        {...rest}
        name={name}
        helperText={showError ? meta.error || meta.submitError : undefined}
        error={showError}
        inputProps={restInput}
        onChange={onChange}
        value={value == '' ? new Date() : value}
        format="dd/MM/yyyy"
        />
    );
  }

  handleInput=(event)=>{
    const name=event.target.name;
    let value=event.target.value;
    this.setState({[name]:value});
  }

  onSubmit=(values)=>{
    if(!values.dateArrivee){
      values.dateArrivee = new Date();
    }

    if(!values.dateDepart){
      var d = new Date();
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
      values.dateDepart = new Date(year + 1, month, day);
    }

    this.state.lesStatuts.map((statut1)=>{
      if(statut1.nom == values.nomStatut){
        this.props.saved({
          nom:values.nom.charAt(0).toUpperCase() + values.nom.slice(1),
          prenom:values.prenom.charAt(0).toUpperCase() + values.prenom.slice(1),
          email:values.email,
          nomStatut:values.nomStatut,
          bureau:this.state.bureau,
          dateArrivee:values.dateArrivee,
          dateDepart:values.dateDepart,
          statut :statut1,
          structure : values.structure,
          laboratoire: values.laboratoire,
          resAdm: values.resAdm,
          observations : values.observations,
          id: this.state.id,
        },this.state.editMode);
        this.props.closed();
      }
      else{
        return null;
      }
    })
  }

  validate=(values)=>{
    const errors = {};

    const emails = [];
    this.state.lesUtilisateurs.map((user)=>{
      emails.push(user.email)
    })
    const verif = emails.filter(mail=>mail==values.email);


    if (!values.nom) {
      errors.nom = 'Veuillez entrer un nom';
    } else if (values.nom.length < 2) {
      errors.nom= 'Au moins de caractères';
    } else if(!new RegExp("^([a-zA-Z'àâéèêôùûçÀÂÉÈÔÙÛÇ-]{1,30})$","g").test(values.nom)){
      errors.nom = 'Nom invalide'
    }

    if (!values.prenom) {
      errors.prenom= 'Veuillez entrer un prenom';
    } else if (values.prenom.length < 2) {
      errors.prenom= 'Au moins de caractères';
    } else if(!new RegExp("^([a-zA-Z'àâéèêôùûçÀÂÉÈÔÙÛÇ-]{1,30})$","g").test(values.prenom)){
      errors.prenom = 'Prenom invalide'
    }

    if(values.dateArrivee>values.dateDepart){
      errors.dateArrivee= "La date d'arrivée doit être avant la date de départ";
      errors.dateDepart= "La date d'arrivée doit être avant la date de départ";
    }
if(!this.state.editMode){
    if(verif.length==1){
      errors.email= 'Cet email existe deja';
    }
  }
    return errors;
  }

  render() {
    return(
      <Dialog open={this.props.opened}  fullScreen={true}>
        <AppBar className={styles.appBar}>
          <Toolbar>
            <IconButton color="inherit" onClick={this.props.closed} aria-label="Close">
              <Icon>close</Icon>
            </IconButton>
            <Button color="inherit" onClick={this.onSubmit1}>
              <Icon>save</Icon>
            </Button>
          </Toolbar>
        </AppBar>
        <Form
          onSubmit = {this.onSubmit}
          initialValues={{nom : this.state.nom,
            prenom: this.state.prenom,
            nomStatut:this.state.nomStatut,
            email:this.state.email,
            resAdm : this.state.resAdm,
            laboratoire : this.state.laboratoire,
            structure:this.state.structure,
            observations: this.state.observations,
            dateArrivee : this.state.dateArrivee,
            dateDepart : this.state.dateDepart}}
            validate={this.validate}
            render={({ handleSubmit, reset, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit} style={{margin:"10%"}}>
                <Paper style={{ padding: 16 }}>
                  <Grid container alignItems="flex-start" spacing={8}>
                    <Grid item xs={6}>
                      <Field
                        fullWidth
                        required
                        name="nom"
                        component={TextField}
                        type="text"
                        label="Nom"
                        />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        fullWidth
                        required
                        name="prenom"
                        component={TextField}
                        type="text"
                        label="Prenom"
                        />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        fullWidth
                        required
                        name="email"
                        component={TextField}
                        type="email"
                        label="Email"
                        />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        fullWidth
                        required
                        name="resAdm"
                        component={TextField}
                        type="text"
                        label="Res. Adm"
                        />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        fullWidth
                        name="nomStatut"
                        component={Select}
                        label="Statut"
                        formControlProps={{ fullWidth: true }}
                        >
                        <MenuItem value={"Professeur"}>Professeur</MenuItem>
                        <MenuItem value={"PhD"}>PhD</MenuItem>
                        <MenuItem value={"PostDoc"}>PostDoc</MenuItem>
                        <MenuItem value={"Stagiaire"}>Stagiaire</MenuItem>
                        <MenuItem value={"Admin"}>Admin</MenuItem>
                      </Field>
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        fullWidth
                        name="laboratoire"
                        component={Select}
                        label="Laboratoire"
                        formControlProps={{ fullWidth: true }}
                        >
                        <MenuItem value={"LORIA"}>LORIA</MenuItem>
                        <MenuItem value={"INRIA"}>INRIA</MenuItem>
                      </Field>
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        fullWidth
                        required
                        name="structure"
                        component={TextField}
                        type="text"
                        label="Structure"
                        />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        fullWidth
                        required
                        name="observations"
                        component={TextField}
                        type="text"
                        label="Observations"
                        />
                    </Grid>

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid item xs={6}>
                        <Field
                          fullWidth
                          name="dateArrivee"
                          component={this.DatePickerWrapper}
                          label="Date d'arrivée"
                          />
                      </Grid>
                      <Grid item xs={6}>
                        <Field
                          fullWidth
                          name="dateDepart"
                          component={this.DatePickerWrapper1}
                          label="Date de départ"
                          />
                      </Grid>
                    </MuiPickersUtilsProvider>
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
                  </Grid>
                </Paper>
              </form>)}
              />


          </Dialog>
        );
      }

    }
