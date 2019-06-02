import React,{Component} from 'react'
import {
  Button,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead, TableRow,Tooltip
} from "@material-ui/core";
import Service from "../service/Service";
import {
  URL_USER_ADD,
  URL_USER_ALL, URL_USER_DELETE,
  URL_USER_UPDATE,URL_BU_ALL
} from "../utils/Constant";
import ToolTip1 from 'react-portal-tooltip';

export default class ListUser extends Component {
  constructor(props) {
    super(props);
    this.state={
      lesUtilisateurs:[],
      lesBureaux:[],
      isOpened:false,
      modeEdit:false,
      editValue:{},
      isTooltipActive: false
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

  showTooltip() {
    this.setState({isTooltipActive: true})
  }
  hideTooltip() {
    this.setState({isTooltipActive: false})
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



  handleUnassign=(event)=>{
    const id=event.currentTarget.getAttribute("tag");
    const lesUtilisateurs =this.state.lesUtilisateurs;
    const u=lesUtilisateurs.find((user)=>{
      return user.id==id;
    });
    this.setState({lesUtilisateurs:lesUtilisateurs.filter(item=> item.id!=id) });
    u.bureau = null;
    Service.update((URL_USER_UPDATE+"/"+u.id),u,"PUT");
  }

  render() {
    const {lesUtilisateurs}=this.state;
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
          </TableHead>
          <TableBody>
            {
              lesUtilisateurs.map((user)=>{
                if(user.bureau != null){
                  if( user.bureau.id == this.props.match.params.id){
                    return(
                      <TableRow key={user.id}  style={{background:new Date(user.dateDepart) < new Date()?"rgba(255,0,0,0.6)":""}} >
                        <TableCell>
                          <Tooltip title ={new Date(user.dateDepart) < new Date()?"Cet utilisateur est un zombie":"Cet utilisateur n'est pas un zombie"}>
                            <Button color={new Date(user.dateDepart) < new Date()?"action":"primary"}><Icon>info</Icon></Button>
                           </Tooltip>
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
                              <TableCell id={"text"} onMouseEnter={this.showTooltip.bind(this)} onMouseLeave={this.hideTooltip.bind(this)}>
                                { user.bureau ? user.bureau.numero: "Non Affecté" }
                                <ToolTip1 active={this.state.isTooltipActive} position="bottom" parent={"#text"}>
                                    <div>
                                        {user.id}
                                    </div>
                                </ToolTip1>
                              </TableCell>
                              <TableCell>
                                <Tooltip title={"Désaffecter"}>
                                  <Button tag={user.id} onClick={this.handleUnassign} color={"primary"}><Icon>remove_circle</Icon></Button>
                                </Tooltip>
                              </TableCell>
                            </TableRow>);
                          }
                          else{
                            return null;
                          }
                        }
                        else {
                          return null;
                        }
                      }
                    )
                  }
                </TableBody>
              </Table>
            </div>
          );
        }
      }
