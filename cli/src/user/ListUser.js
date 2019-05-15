import React,{Component} from 'react'
import {
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
  URL_USER_UPDATE
} from "../utils/Constant";

export default class ListUser extends Component {

  constructor(props) {
    super(props);
    this.state={
      lesUtilisateurs:[],
      lesBureaux:[],
      isOpened:false,
      modeEdit:false,
      editValue:{},
    }
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
  }

  handleDelete=(event)=>{

    const id=event.currentTarget.getAttribute("tag");
alert(id);
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

  render() {
    const {lesUtilisateurs}=this.state;
    return(
      <div>
        <div>
          <Button onClick={this.handleAdd}><Icon>add_circle</Icon></Button>
          <AddUser editMode={this.state.modeEdit} editValue={this.state.editValue}  opened={this.state.isOpened} closed={this.dialogClose} saved={this.save}></AddUser>
        </div>
        <Table >
          <TableHead style={{background:" #3f51b5 "}}>
            <TableCell>Info</TableCell>
            <TableCell>Nom</TableCell>
            <TableCell>Prenom</TableCell>
            <TableCell>Statut</TableCell>
            <TableCell>Date d'arrivée</TableCell>
            <TableCell>Date de départ</TableCell>
            <TableCell>Bureau</TableCell>
            <TableCell></TableCell>
          </TableHead>
          <TableBody>
            {
              lesUtilisateurs.map((user)=>(
                <TableRow key={user.id}  style={{background:new Date(user.dateDepart) < new Date()?"rgba(255,0,0,0.6)":""}} >
                  <TableCell>
                    <Tooltip title ={new Date(user.dateDepart) < new Date()?"Cet utilisateur est un zombie":"Cet utilisateur n'est pas un zombie"}>
                      <Button color={new Date(user.dateDepart) < new Date()?"action":"primary"}><Icon>info</Icon></Button>
                     </Tooltip>
                  </TableCell>
                  <TableCell>{user.nom}</TableCell>
                  <TableCell>{user.prenom}</TableCell>
                  <TableCell>{user.nomStatut}</TableCell>
                  <TableCell>{String(new Date(user.dateArrivee).getDate())+'/'+String(new Date(user.dateArrivee).getMonth()+1)+'/'+String(new Date(user.dateArrivee).getFullYear())}</TableCell>
                  <TableCell>{String(new Date(user.dateDepart).getDate())+'/'+String(new Date(user.dateDepart).getMonth()+1)+'/'+String(new Date(user.dateDepart).getFullYear())}</TableCell>
                  <TableCell>{ user.bureau ? user.bureau.numero: "Non Affecté" }</TableCell>
                  <TableCell><Button tag={user.id} onClick={this.handleDelete} color={"primary"}><Icon>delete</Icon></Button>
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
