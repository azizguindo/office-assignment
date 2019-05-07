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

export default class ListStatut extends Component {


  constructor(props) {
    super(props);
    this.state={
      lesStatuts:[],
      isOpened:false,
      modeEdit:false,
      editValue:{},
    }
  }

  componentWillMount() {
    try {
      Service.get(URL_ST_ALL)
      .then(data=>{
        this.setState({lesStatuts:data});
      });

    }catch (e) {
      console.log("erreur",e.toString());
    }
  }


  render() {
    return(
      <div>
        <Table >
            <TableHead style={{background:"beige"}}>
              <TableCell>Nom Statut</TableCell>
              <TableCell>Place</TableCell>
              <TableCell>Type</TableCell>
            </TableHead>
            <TableBody>
              {
                this.state.lesStatuts.map((statut)=>(
                    <TableRow key={statut.id} >
                      <TableCell>{statut.nom}</TableCell>
                      <TableCell>{statut.place}</TableCell>
                      <TableCell>{statut.type}</TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
          </Table>
      </div>
    );
  }

}
