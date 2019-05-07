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

export default class EditUser extends Component{
  constructor(props) {
    super(props);
    this.state={
      nom:this.props.match.params.nom,
      prenom:this.props.match.params.prenom,
      nomStatut:this.props.match.params.nomStatut,
      bureau : this.props.match.params.bureau,
      dateArrivee : this.props.match.params.dateArrivee,
      dateDepart : this.props.match.params.dateDepart,
      id : this.props.match.params.id,
      statut :this.props.match.params.statut
    };
  }


  render() {
    const {id}=this.props.match.params;
    return(
        <form onSubmit={this.onSubmit} style={{width: "50%", marginLeft: "20%"}}>
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
    );
  }

}
