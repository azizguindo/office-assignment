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
      dateArrivee:Date,
      dateDepart:Date,
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
      email: val.email,
      nomStatut: val.nomStatut,
      bureau: null,
      dateArrivee: val.dateArrivee,
      dateDepart: val.dateDepart,
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
          nom:nom,
          prenom:prenom,
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
          <Input  id="nom" name="nom" type="text"    onChange={this.handleInput} value={this.state.nom}/>
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
          <FormLabel  htmlFor="dateArrivee">Date d'arrivée</FormLabel>
          <Input id="dateArrivee" required={true} name='dateArrivee' type="date" onChange={this.handleInput} value={this.state.dateArrivee}/>
        </FormControl>
        <FormControl margin="normal" fullWidth={true}>
          <FormLabel htmlFor="dateDepart">Date de départ</FormLabel>
          <Input id="dateDepart"  name='dateDepart' type="date" onChange={this.handleInput} value={this.state.dateDepart}/>
        </FormControl>
      </form>
    </Dialog>
  );
}

}
