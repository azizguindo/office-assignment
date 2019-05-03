import React,{Component} from 'react'
import {
  Badge,
  Button,
  FormControl,
  Icon,
  Input,
  InputLabel, Menu, MenuItem,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead, TableRow, Tooltip
} from "@material-ui/core";
import Service from "../service/Service";
import {
  URL_ST_ADD, URL_ST_ALL, URL_ST_UPDATE,
  URL_USER_ADD,
  URL_USER_ALL, URL_USER_DELETE,
  URL_USER_UPDATE,URL_BU_ALL
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

    try {
      Service.get(URL_BU_ALL)
      .then(data=>{
        this.setState({lesBureaux:data});
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

  expired = () => {alert("Cet utilisateur est un zombie")
}

notexpired = () => {alert("Cet utilisateur n'est pas un zombie")
}

handleAdd=(event)=>{
  this.setState({isOpened:true})
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
        return user.numero==p.numero;
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
  console.log(u);
  this.setState({
    modeEdit:true,
    isOpened:true,
    editValue:u
  })
}

componentDidMount () {
  const{id} =this.props.match.params;
}

render() {
  console.log(this.props.match.params.id);
  const {lesUtilisateurs,anchorEL}=this.state;
  return(
    <div>
    <Table >
    <TableHead style={{background:"beige"}}>
    <TableCell>Info</TableCell>
    <TableCell>Nom</TableCell>
    <TableCell>Prenom</TableCell>
    <TableCell>Statut</TableCell>
    <TableCell>Date d'arrivée</TableCell>
    <TableCell>Date de départ</TableCell>
    <TableCell>Bureau</TableCell>
    <TableCell></TableCell>
    <TableCell></TableCell>
    </TableHead>
    <TableBody>
    {
      lesUtilisateurs.map((user)=>{
        if(user.bureau !== null){
          console.log(user);
          if( user.bureau.id !== this.props.match.params.id){
            return(
              <TableRow key={user.id}  style={{background:new Date(user.dateDepart) < new Date()?"red":""}} >
              <TableCell>
              {new Date(user.dateDepart) < new Date()?
                <Button onClick={this.expired} color={"primary"}><Icon>info</Icon></Button>:
                <Button onClick={this.notexpired} color={"primary"}><Icon>info</Icon></Button>
              }
              </TableCell>
              <TableCell>{user.nom}</TableCell>
              <TableCell>{user.prenom}</TableCell>
              <TableCell>{user.nomStatut}</TableCell>
              <TableCell>{String(new Date(user.dateArrivee).getDate())+
                '/'+String(new Date(user.dateArrivee).getMonth()+1)+
                '/'+String(new Date(user.dateArrivee).getFullYear())}
                </TableCell>
                <TableCell>{String(new Date(user.dateDepart).getDate())+
                  '/'+String(new Date(user.dateDepart).getMonth()+1)+
                  '/'+String(new Date(user.dateDepart).getFullYear())}
                  </TableCell>
                  <TableCell>
                  { user.bureau ? user.bureau.numero: "Non Affecté" }
                  </TableCell>
                  <TableCell>
                  <Button tag={user.id} onClick={this.handleDelete}   color={"primary"}><Icon>delete</Icon></Button>
                  </TableCell>
                  </TableRow>);
                }}
              }
            )
          }
          </TableBody>
          </Table>
          </div>
        );
      }





    }
