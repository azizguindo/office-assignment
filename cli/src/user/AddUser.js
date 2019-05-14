import React,{Component} from 'react'
import {
  AppBar,
  Button,
  Dialog,
  FormControl,
  FormLabel, Icon, IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Toolbar
} from "@material-ui/core";
import { URL_ST_ALL} from "../utils/Constant";
import Service from "../service/Service";
import { Form, Field } from 'react-final-form';

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
      hasError:false,
      message:"",
      bureauxDispo:[],
      id:0,
      editMode:false,
      editValue:{},
      lesStatuts:[]
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const val=nextProps.editValue;
    console.log(this.state);
    this.setState( {
      nom:val.nom,
      prenom:val.prenom ,
      nomStatut: val.nomStatut,
      statut : val.statut,
      dateArrivee : val.dateArrivee,
      dateDepart : val.dateDepart,
      bureau: val.bureau,
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
  }


  handleInput=(event)=>{
    const name=event.target.name;
    let value=event.target.value;
    this.setState({[name]:value});
  }

  onSubmit=(event)=>{
    const {nom,prenom,nomStatut,dateArrivee,dateDepart}=this.state;
    this.state.lesStatuts.map((statut1)=>{
      if(statut1.nom === nomStatut){
        this.props.saved({
          nom:nom.charAt(0).toUpperCase() + nom.slice(1),
          prenom:prenom.charAt(0).toUpperCase() + prenom.slice(1),
          nomStatut:nomStatut,
          bureau:null,
          dateArrivee:dateArrivee,
          dateDepart:dateDepart,
          statut :statut1,
          id: this.state.id,
        },this.state.editMode);
        this.props.closed();
      }
      else{
        return null;
      }
    })
  }


  render() {
    let d1= "";
    if(this.state.dateArrivee){
      this.state.dateArrivee = new Date(this.state.dateArrivee);
      d1 = String(this.state.dateArrivee.getFullYear())+'-';
      if(this.state.dateArrivee.getMonth()+1<10){
        d1 = d1 + '0';
      }
      d1 = d1 + String(this.state.dateArrivee.getMonth()+1)+'-';
      if(this.state.dateArrivee.getDate()<10){
        d1 = d1 + '0';
      }
      d1 = d1 + String(this.state.dateArrivee.getDate());
    }

    let d2= "";
    if(this.state.dateDepart){
      this.state.dateDepart = new Date(this.state.dateDepart);
      d2 = String(this.state.dateDepart.getFullYear())+'-';
      if(this.state.dateDepart.getMonth()+1<10){
        d2 = d2 + '0';
      }
      d2 = d2 + String(this.state.dateDepart.getMonth()+1)+'-';
      if(this.state.dateDepart.getDate()<10){
        d2 = d2 + '0';
      }
      d2 = d2 + String(this.state.dateDepart.getDate());
    }

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
        {/*<form  style={{margin:"10%"}}>
          <FormControl margin="normal" error={false} fullWidth={false} required={true}>
            <InputLabel htmlFor="nom">Nom</InputLabel>
            <Input  id="nom" name="nom" type="text"    onChange={this.handleInput} value={this.state.nom} />
          </FormControl>
          <FormControl margin="normal" error={false} fullWidth={true}>
            <InputLabel htmlFor="prenom">Prénom</InputLabel>
            <Input  id="prenom" name="prenom" type="text"   onChange={this.handleInput} value={this.state.prenom}/>
          </FormControl>
          <FormControl margin="normal" fullWidth={true}>
            <InputLabel htmlFor="statut">Statut</InputLabel>
            <Select name={"nomStatut"} id={"nomStatut"} value={this.state.nomStatut} onChange={this.handleInput}>
              <em>Veuillez choisir un statut</em>
              <MenuItem value={"Professeur"}>Professeur</MenuItem>
              <MenuItem value={"PhD"}>PhD</MenuItem>
              <MenuItem value={"PostDoc"}>PostDoc</MenuItem>
              <MenuItem value={"Stagiaire"}>Stagiaire</MenuItem>
              <MenuItem value={"Admin"}>Admin</MenuItem>
            </Select>
          </FormControl>
          <FormControl margin="normal" fullWidth={true}>
            <FormLabel htmlFor="dateArrivee">Date d'arrivée</FormLabel>
            <Input id="dateArrivee" required={true} name='dateArrivee' type="date" onChange={this.handleInput} value={d1} />
          </FormControl>
          <FormControl margin="normal" fullWidth={true}>
            <FormLabel htmlFor="dateDepart">Date de départ</FormLabel>
            <Input id="dateDepart" required={true} name='dateDepart' type="date" onChange={this.handleInput} value={d2} />
          </FormControl>
        </form>
      */}

      <Form
    onSubmit={this.onSubmit}
  //  validate={validate}
    render={({ handleSubmit, pristine, invalid }) => (
      <form style={{margin:"10%"}} onSubmit={handleSubmit}>
        <div>
          <label>Nom</label>
          <Field name="nom" component="input" placeholder="Nom" />
        </div>

        <div>
          <label>Prenom</label>
          <Field name="prenom" component="input" placeholder="Prenom" />
        </div>

        <div>
                    <label>Statut</label>
                    <Field name="nomStatut" component="select">
                      <option />
                      <option value="Professeur">Professeur</option>
                      <option value="PhD">PhD</option>
                      <option value="PostDoc">PostDoc</option>
                      <option value="Stagiaire">Stagiaire</option>
                      <option value="Admin">Admin</option>
                    </Field>
                  </div>

              <div>
                    <label>Date d'arrivée</label>
                    <Field name="dateArrivee" component="input" placeholder="Date d'arrivée" type="date"/>
                  </div>
                  <div>
                        <label>Date de départ</label>
                        <Field name="dateDepart" component="input" placeholder="Date de départ" type="date"/>
                      </div>

        <button type="submit" disabled={pristine || invalid}>
          Submit
        </button>
      </form>
    )}
    />
      </Dialog>
    );
  }

}
