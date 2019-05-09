import React,{Component} from 'react'
import {
    Badge,
    Button, Icon,
    List,
    ListItem,
    Menu,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow, Tooltip
} from "@material-ui/core";
import AddBureau from "./add-bureau";
import Service from "../service/Service";
import {URL_BU_ADD, URL_BU_ALL, URL_BU_DELETE, URL_BU_UPDATE, URL_USER_ALL} from "../utils/Constant";
import {Link} from "react-router-dom";
import Affecter from "../affecter/affecter";
export default class ListBureau  extends Component{

    constructor(props) {

        super(props);
        let searchStyle={
            width:"2px",
            background:"gray"
        };
        this.state = {
            lesBureaux:[],
            anchorEL:null,
            isSearch:false,
            isOpened:false,
            openAffectDial:false,
            modeEdit:false,
            editValue:{},
            searchStyle:searchStyle,
            findItem:[],
            bureauAffect:null,
        };

    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log("componentWillMount");
    }
    componentWillMount() {
        console.log("componentWillMount");
      try {
          Service.get(URL_BU_ALL)
              .then(data=>{
                 this.setState({lesBureaux:data});
              });

      }catch (e) {
         console.log("erreur",e.toString());
      }

    }

    handleEdit=(event)=>{
        const numero=event.currentTarget.getAttribute("tag");

        const lesBureaux=this.state.lesBureaux;

        const u=lesBureaux.find((user)=>{

            return user.numero==numero;
        });
        console.log(u);
        this.setState({
            modeEdit:true,
            isOpened:true,
            editValue:u
        })

    }
    handleAdd=(event)=>{
        this.setState({isOpened:true})
    }
    dialogClose=()=>{
        this.setState({isOpened:false})
    }
    save=(p,modeEdit)=>
    {
        const lesBureaux=this.state.lesBureaux;
        console.log("save",p);
        Service.update(modeEdit==false?URL_BU_ADD:(URL_BU_UPDATE+"/"+p.id),p,modeEdit?"PUT":"POST")
            .then(data=>{
                console.log(data)
                if(modeEdit==false) {
                    lesBureaux.push(p);

                }else
                {
                    const index=lesBureaux.findIndex((user)=>{
                        return user.numero==p.numero;
                    });

                    lesBureaux[index]=p;

                }
                this.setState({modeEdit:false,lesBureaux:lesBureaux});
            })
    }
    handleDelete=(event)=> {
        const id=event.currentTarget.getAttribute("tag");
        const {lesBureaux}=this.state;
        this.setState({lesBureaux:lesBureaux.filter(item=> item.id!=id) })
        Service.update(URL_BU_DELETE+"/"+id,{},"DELETE")
    }
    dialogCloseAffec=()=>{
        this.setState({isOpened:false})
    }
    handleAffecte=(event)=>{
        const id=event.currentTarget.getAttribute("tag");
        const {lesBureaux}=this.state;
        console.log(id)
         const bureau=lesBureaux.find((bu)=>{
             return bu.id==id;
        })
        this.setState({
            openAffectDial:true,
            bureauAffect:bureau
        })
        console.log("cliquez",bureau)
    }
    onSortByEtat=(event)=>{
        this.setState({isSearch:true,findItem:[]});
        const sorted=event.currentTarget.getAttribute("sorted");
        let data=this.state.lesBureaux;
        let isSorted=true;
       let value=""
        switch (sorted) {
            case "none":
                value="dec"
                data.sort((a,b)=>{

                    return -(a.nbPlaces-a.utilisateurs.length)+(b.nbPlaces-b.utilisateurs.length)
                })
                break;
            case "dec":
                value="cro";
                data.sort((a,b)=>{
                    return (a.nbPlaces-a.utilisateurs.length)-(b.nbPlaces-b.utilisateurs.length)
                })

                break;
            case "cro":
                value="none"
                isSorted=false;
                data.sort((a,b)=>{
                    return (a.id-b.id);
                })
                break;
        }
        console.log(data[0])
        this.setState({lesBureaux:data});
        console.log("onSortByEtat",value)
        event.currentTarget.setAttribute("sorted",value);
    }
    onSortByPlaces=(event)=>{
        this.setState({isSearch:false,findItem:[]});
        const sorted=event.currentTarget.getAttribute("sorted");
        let data=this.state.lesBureaux;
        let isSorted=true;
        let value=""
        switch (sorted) {
            case "none":
                value="dec"
                data.sort((a,b)=>{

                    return (a.nbPlaces-b.nbPlaces)
                })
                break;
            case "dec":
                value="cro";
                data.sort((a,b)=>{
                    return -a.nbPlaces+b.nbPlaces;
                })

                break;
            case "cro":
                value="none"
                isSorted=false;
                data.sort((a,b)=>{
                    return (a.id-b.id);
                })
                break;
        }
        console.log(data[0])
        this.setState({lesBureaux:data});
        console.log("onSortByEtat",value)
        event.currentTarget.setAttribute("sorted",value);
    }
    searchChange=(event)=>{
        console.log("change")
        const lesBureaux=this.state.lesBureaux;
        let isSearch=true;
        if(event.target.value.length==0)
            isSearch=false;
     const   data=lesBureaux.filter(bu=>{
            return bu.numero.search(event.target.value)!=-1
        })
        console.log(data);
        this.setState({isSearch:true,findItem:data});
    }
    evalOccupation(utilisateurs){
        console.log("evalOccupation",utilisateurs.reduce((count,user)=>user.statut.nbPlaces+count,0))
       return utilisateurs.reduce((count,user)=>user.statut.place+count,0)
    }
    render() {
       // const {lesBureaux,anchorEL}=this.state;
        const lesBureaux=(this.state.isSearch&&this.state.findItem.length!=0)?this.state.findItem:this.state.lesBureaux;
        const anchorEL=this.state.anchorEL;
        return(
            <div>
                <div>
                    <div>
                        <Button onClick={this.handleAdd}><Icon>add_circle</Icon></Button>
                        <AddBureau editMode={this.state.modeEdit} editValue={this.state.editValue}  opened={this.state.isOpened} closed={this.dialogClose} saved={this.save}></AddBureau>
                    </div>
                </div>
                <div>
                    <div>
                        <Affecter  bureau={this.state.bureauAffect}  opened={this.state.openAffectDial} closed={this.dialogCloseAffec} saved={this.saveAffect}></Affecter>
                    </div>
                </div>
                <Table >
                    <TableHead style={{background:"beige"}}>
                        <TableCell>Numero<input style={{background:"beige",borderColor:"white",color:"black"}} onChange={this.searchChange}  type={"text"}/></TableCell>
                        <TableCell>Places <Button sorted={"none"} onClick={this.onSortByPlaces}><Icon>sort</Icon></Button></TableCell>
                        <TableCell>Occupation</TableCell>
                        <TableCell>Statut</TableCell>
                        <TableCell >Etat<Button sorted={"none"} onClick={this.onSortByEtat}><Icon>sort</Icon></Button></TableCell>
                        <TableCell></TableCell>
                    </TableHead>
                    <TableBody>
                        {
                            lesBureaux.map((row)=>(
                                <TableRow key={row.id}  style={{background:row.nbPlaces-this.evalOccupation(row.utilisateurs)==0?"blue":""}} >
                                    <TableCell>{row.numero}</TableCell>
                                    <TableCell>{row.nbPlaces}</TableCell>
                                    <TableCell>{this.evalOccupation(row.utilisateurs)} details</TableCell>
                                    <TableCell>{row.statut}</TableCell>
                                    <TableCell><Badge showZero={true} color={row.nbPlaces-this.evalOccupation(row.utilisateurs)==0?"secondary":""} badgeContent={row.nbPlaces-row.utilisateurs.length}>
                                        <Icon>mail</Icon>
                                    </Badge></TableCell>
                                    <TableCell>
                                        <Tooltip title={"supprimer"}>
                                            <Button  tag={row.id} onClick={this.handleDelete}   color={"primary"}><Icon>delete</Icon></Button>
                                        </Tooltip>
                                        <Tooltip title={"modifier"}>
                                            <Button tag={row.numero} onClick={this.handleEdit} color={"primary"}><Icon>edit</Icon></Button>
                                        </Tooltip>
                                        <Tooltip title={"Affecter"}>
                                            <Button  tag={row.id} onClick={this.handleAffecte} disabled={row.utilisateurs.length==row.nbPlaces}>
                                                <Icon>person_add</Icon>
                                            </Button>
                                        </Tooltip>
                                    </TableCell>

                                    <Menu anchorEl={anchorEL} open={Boolean(anchorEL)} >
                                        <MenuItem>l</MenuItem>
                                        <MenuItem>l</MenuItem>
                                        <MenuItem>l</MenuItem>
                                    </Menu>
                                </TableRow>

                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        );
    }


}
