import React,{Component} from 'react'
import {
  Input,
  Button,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead, TableRow,Tooltip
} from "@material-ui/core";
import AddUser from "./AddUser";
import Service from "../service/Service";
import {
  URL_USER_ADD,
  URL_USER_ALL, URL_USER_DELETE,
  URL_USER_UPDATE,URL_BU_ALL,URL_ST_ALL
} from "../utils/Constant";
import orderBy from "lodash/orderBy";
import xlsExport from "xlsexport";
import Papa from "papaparse";
const invertDirection={
  'asc':'desc',
  'desc':'asc'
}
export default class ListUser extends Component {

  constructor(props) {
    super(props);
    this.state={
      lesUtilisateurs:[],
      lesBureaux:[],
      lesStatuts:[],
      isOpened:false,
      modeEdit:false,
      editValue:{},
      columnToSort: '',
      sortDirection :'desc',
      res :[],
    }
    this.updateData = this.updateData.bind(this);
  }

  handleSort = columnName=>{
    this.state.columnToSort = columnName;
    this.state.sortDirection = this.state.columnToSort == columnName ? invertDirection[this.state.sortDirection] : 'asc';
    const users = orderBy(this.state.lesUtilisateurs,columnName,this.state.sortDirection);
    this.state.lesUtilisateurs = users;
    this.forceUpdate();
  }

  componentWillMount() {
    try {
      Service.get(URL_USER_ALL)
      .then(data=>{
        this.setState({lesUtilisateurs:data});
      });

    }catch (e) {
      console.log("erreur",e.toString());
    }
    try {
      Service.get(URL_BU_ALL)
      .then(data=>{
        this.setState({lesBureaux:data});
      });

    }catch (e) {
      console.log("erreur",e.toString());
    }
    try {
      Service.get(URL_ST_ALL)
      .then(data=>{
        this.setState({lesStatuts:data});
      });

    }catch (e) {
      console.log("erreur",e.toString());
    }
  }

  handleDelete=(event)=>{
    const id=event.currentTarget.getAttribute("tag");
    const {lesUtilisateurs}=this.state;
    this.setState({lesUtilisateurs:lesUtilisateurs.filter(item=> item.id!=id) })
    Service.update(URL_USER_DELETE+"/"+id,{},"DELETE")
  }

  expired = () => {
    alert("Cet utilisateur est un zombie")
  }

  notexpired = () => {
    alert("Cet utilisateur n'est pas un zombie")
  }

  handleAdd=(event)=>{
    this.setState({isOpened:true,editValue:{}})
  }

  dialogClose=()=>{
    this.setState({isOpened:false})
  }

  save=(p,modeEdit)=>{
    const lesUtilisateurs=this.state.lesUtilisateurs
    Service.update(modeEdit==false?URL_USER_ADD:(URL_USER_UPDATE+"/"+p.id),p,modeEdit?"PUT":"POST")
    .then(data=>{
      if(modeEdit==false) {
        lesUtilisateurs.push(p);
      }else
      {
        const index=lesUtilisateurs.findIndex((user)=>{
          return user.id==p.id;
        });
        lesUtilisateurs[index]=p;
      }
      this.setState({modeEdit:false,lesUtilisateurs:lesUtilisateurs});
    })
  }

  handleEdit=(event)=>{
    const lesUtilisateurs =this.state.lesUtilisateurs;
    const id=event.currentTarget.getAttribute("tag");
    const u=lesUtilisateurs.find((user)=>{
      return user.id==id;
    });
    this.setState({
      modeEdit:true,
      isOpened:true,
      editValue:u
    })
  }

  handleExport=(event)=>{
    const users=[];
    this.state.lesUtilisateurs.map((user)=>{
      users.push({
        "Nom usuel" : user.nom,
        "Prénom" : user.prenom,
        "Email" : user.email,
        "Début dossier" : String(new Date(user.dateArrivee).getDate())+'/'+String(new Date(user.dateArrivee).getMonth()+1)+'/'+String(new Date(user.dateArrivee).getFullYear()),
        "Fin dossier" : String(new Date(user.dateDepart).getDate())+'/'+String(new Date(user.dateDepart).getMonth()+1)+'/'+String(new Date(user.dateDepart).getFullYear()),
        "Statut" : user.statut.nom,
        "Bureau" : user.bureau ? user.bureau.numero:"",
        "Res. adm" : user.resAdm,
        "Laboratoire" : user.laboratoire,
        "Structure" : user.structure,
        "Observations" : user.observations
      })
    })
    const xls = new xlsExport(users, 'users');
    xls.exportToCSV("affect.csv");
  }

  handleImport=({ target })=>{
    var results= Papa.parse(target.files[0],{
      header :true,
      delimiter: ";",
      linebreak: "↵",
      complete: this.updateData
    });
  }

  updateData(result) {
    const data = result.data;
    const users=[];
    data.map((user)=>{
      let resStatuts = this.state.lesStatuts.filter(st => st.nom  == user["Statut"])
      let resBureaux = this.state.lesBureaux.filter(bu => bu.numero  == user["Bureau"])
      let date1 = user["Début dossier"].split("/");
      let date2 = user["Fin dossier"].split("/");
      let importedUser =({
        nom : user["Nom usuel"],
        prenom : user["Prénom"],
        email : user["Email"]?user["Email"]:"Prénom.Nom@loria.fr",
        nomStatut : resStatuts[0].nom,
        bureau :resBureaux.length>0 ? resBureaux[0] : null ,
        dateArrivee : new Date(date1[2],date1[1]-1,date1[0]),
        dateDepart : new Date(date2[2],date2[1]-1,date2[0]),
        statut : resStatuts[0],
        structure : user["Structure"],
        laboratoire : user["Laboratoire"],
        resAdm : user["Res. adm"],
        observations : user["Observations"]
      })

      Service.update(URL_USER_ADD,importedUser,"POST")
      .then(data=>{
        if(data.error){
          console.log(data);
          alert("Erreur lors de l'import : "+data.message);
        }
        else{
          this.state.lesUtilisateurs.push(importedUser);
          this.forceUpdate();
        }
      }
    );

  });
  }

  render() {
    const {lesUtilisateurs}=this.state;
    return(
      <div>
        <div>
          <Button onClick={this.handleAdd}><Icon>add_circle</Icon></Button>
          <AddUser editMode={this.state.modeEdit} editValue={this.state.editValue}  opened={this.state.isOpened} closed={this.dialogClose} saved={this.save}></AddUser>
          <Button onClick={this.handleExport}><Icon>cloud_download</Icon></Button>
          <input
            accept=".csv"
            style={{ display: 'none' }}
            id="raised-button-file"
            onChange={this.handleImport}
            type="file"
            />
          <label htmlFor="raised-button-file">
            <Button variant="raised" component="span" >
              <Icon>cloud_upload</Icon>
            </Button>
          </label>
        </div>
        <Table >
          <TableHead style={{background:"secondary"}}>
            <TableCell>Info</TableCell>
            <TableCell onClick = {()=>this.handleSort('nom')}>Nom Usuel<Icon>{this.state.sortDirection =='desc' && this.state.columnToSort == "nom"?'arrow_drop_up':'arrow_drop_down'}</Icon></TableCell>
            <TableCell onClick = {()=>this.handleSort('prenom')}>Prenom<Icon>{this.state.sortDirection =='desc'&& this.state.columnToSort == "prenom"?'arrow_drop_up':'arrow_drop_down'}</Icon></TableCell>
            <TableCell onClick = {()=>this.handleSort('email')}>Email<Icon>{this.state.sortDirection =='desc'&& this.state.columnToSort == "email"?'arrow_drop_up':'arrow_drop_down'}</Icon></TableCell>
            <TableCell onClick = {()=>this.handleSort('dateArrivee')}>Début dossier<Icon>{this.state.sortDirection =='desc'&& this.state.columnToSort == "dateArrivee"?'arrow_drop_up':'arrow_drop_down'}</Icon></TableCell>
            <TableCell onClick = {()=>this.handleSort('dateDepart')}>Fin dossier<Icon>{this.state.sortDirection =='desc'&& this.state.columnToSort == "dateDepart"?'arrow_drop_up':'arrow_drop_down'}</Icon></TableCell>
            <TableCell onClick = {()=>this.handleSort('nomStatut')}>Statut<Icon>{this.state.sortDirection =='desc'&& this.state.columnToSort == "nomStatut"?'arrow_drop_up':'arrow_drop_down'}</Icon></TableCell>
            <TableCell onClick = {()=>this.handleSort('bureau')}>Bureau<Icon>{this.state.sortDirection =='desc'&& this.state.columnToSort == "bureau"?'arrow_drop_up':'arrow_drop_down'}</Icon></TableCell>
            <TableCell onClick = {()=>this.handleSort('laboratoire')}>Laboratoire<Icon>{this.state.sortDirection =='desc'&& this.state.columnToSort == "laboratoire"?'arrow_drop_up':'arrow_drop_down'}</Icon></TableCell>
            <TableCell onClick = {()=>this.handleSort('structure')}>Structure<Icon>{this.state.sortDirection =='desc'&& this.state.columnToSort == "structure"?'arrow_drop_up':'arrow_drop_down'}</Icon></TableCell>
          <TableCell></TableCell>
          </TableHead>
          <TableBody>
            {
              lesUtilisateurs.map((user)=>(
                <TableRow key={user.id}  style={{background:new Date(user.dateDepart) < new Date()?user.bureau?"rgba(244, 173, 66)":"rgba(255,0,0,0.6)":""}} >
                  <TableCell>
                    <Tooltip title ={new Date(user.dateDepart) < new Date()?"Cet utilisateur est un zombie":"Cet utilisateur n'est pas un zombie"}>
                      <Button color={new Date(user.dateDepart) < new Date()?"action":"primary"}><Icon>info</Icon></Button>
                    </Tooltip>
                  </TableCell>
                  <TableCell>{user.nom}</TableCell>
                  <TableCell>{user.prenom}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{String(new Date(user.dateArrivee).getDate())+'/'+String(new Date(user.dateArrivee).getMonth()+1)+'/'+String(new Date(user.dateArrivee).getFullYear())}</TableCell>
                  <TableCell>{String(new Date(user.dateDepart).getDate())+'/'+String(new Date(user.dateDepart).getMonth()+1)+'/'+String(new Date(user.dateDepart).getFullYear())}</TableCell>
                  <TableCell>{user.nomStatut}</TableCell>
                  <TableCell>{ user.bureau ? user.bureau.numero: "Non Affecté" }</TableCell>
                  <TableCell>{ user.laboratoire ? user.laboratoire: "N/A" }</TableCell>
                  <TableCell>{ user.structure}</TableCell>
                  <TableCell>{ new Date(user.dateDepart) < new Date() && !user.bureau ?<Button tag={user.id} onClick={this.handleDelete} color={"primary"}><Icon>delete</Icon></Button>:""}
                    <Button tag={user.id} onClick={this.handleEdit} color={"primary"}><Icon>edit</Icon></Button>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    );
  }
}
