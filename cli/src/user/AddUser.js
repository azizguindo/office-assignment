import React,{Component,useState } from 'react'
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
import{MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";

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
    const {nom,prenom,nomStatut,dateArrivee,dateDepart,bureau,statut}=this.state;
    this.state.lesStatuts.map((statut1)=>
    {if(statut1.nom === nomStatut){
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
    }},
  )
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
      <form  style={{margin:"10%"}}>
        <FormControl margin="normal" error={false} fullWidth={true}>
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

    </Dialog>
  );
}

}
