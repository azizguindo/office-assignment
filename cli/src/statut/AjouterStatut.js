import React from 'react'
import {
    AppBar,
    Button, Dialog,
    FormControl, FormLabel,
    Icon,
    IconButton,
    Input,
    InputLabel, MenuItem,
    Select,
    Snackbar,
    Toolbar
} from "@material-ui/core";
const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
};
export default class AjouterStatut extends React.Component{

    constructor(props) {
        super(props);
        this.state={nom:"",place:0,type:"",isHandi:false}

    }
    componentWillReceiveProps(nextProps, nextContext) {
        const val=nextProps.editValue;
        this.setState( {
            nom:val.nom,
            type:val.type ,
            place:val.place,
            id:val.id,
            editMode:nextProps.editMode

        });

    }
    handleInput=(event)=>{
        const name=event.target.name;
        let value=event.target.value;
        this.setState({[name]:value});
    }
    onSubmit=(event)=>{
        const {nom,type,place}=this.state;
        console.log(nom,type,place)
        this.props.saved({
            nom:nom,
            type:type,
            place:place,
            id: this.state.id,
        },this.state.editMode);
        this.props.closed();
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
                    <FormControl margin="normal" fullWidth={true}>
                        <InputLabel htmlFor="statut">Statut</InputLabel>
                        <Select name={"statut"} id={"statut"} value={this.state.nom} onChange={this.handleInput}>
                            <em>None</em>
                            <MenuItem value={"prof"}>Prof</MenuItem>
                            <MenuItem value={"maitre"}>Maitre</MenuItem>
                            <MenuItem value={"stagiere"}>Vacataire</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl margin="normal" error={false} fullWidth={true}>
                        <InputLabel htmlFor="place">Place</InputLabel>
                        <Input  id="place" name="place" type="number"    onChange={this.handleInput} value={this.state.place}/>
                    </FormControl>


                    <FormControl margin="normal" fullWidth={true}>
                        <FormLabel htmlFor="type">Type</FormLabel>
                        <Input id="type"  name='type' type="text" onChange={this.handleInput} value={this.state.depart}/>
                    </FormControl>


                </form>
            </Dialog>
        );
    }


}
