import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {
    AppBar,
    Button,
    Dialog,
    FormControl,
    Icon,
    IconButton,
    Input,
    InputLabel,
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

export  default class AddBureau extends Component {
    constructor(props) {
        super(props);
        this.state={
            id:0,
            numero:"",
            nbPlaces:0,
            statut:"",
            hasError:false,
            message:"",
            editMode:false,
            editValue:{}
        };

    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.editValue!=undefined) {
            const val = nextProps.editValue;
            this.setState({
                id: val.id,
                numero: val.numero,
                nbPlaces: val.nbPlaces,
                statut: val.statut,
                utilisateurs: val.utilisateurs,
                editMode: nextProps.editMode
            });
        }
    }

    handleInput=(event)=>{
        const name=event.target.name;
        let value=event.target.value;

        this.setState({[name]:value});
        console.log(name,value)

    }

    onSubmit=(event)=>{
        const {numero,nbPlaces,statut,id}=this.state;
         this.props.saved({
             id:id,
             numero:numero,
             nbPlaces:nbPlaces,
             nbPlacesOccupees:0,
             utilisateurs:(this.state.editMode?this.state.utilisateurs:[]),
            statut:statut
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
                <Snackbar open={this.state.hasError}
                message={this.state.message}
                />
                <FormControl margin="normal" fullWidth={true}>
                <InputLabel htmlFor="numero">Numero</InputLabel>
                <Input  name="numero" id="numero"  onChange={this.handleInput} type="text" value={this.state.numero}/>
                </FormControl>
                <FormControl margin="normal" fullWidth={true}>
                <InputLabel htmlFor="nbPlaces">Places</InputLabel>
                <Input  id="nbPlaces" name="nbPlaces" type="number" inputProps={{ min: 1}} onChange={this.handleInput} value={this.state.nbPlaces}/>
                </FormControl>
                <FormControl margin="normal" fullWidth={true}>
                    <InputLabel htmlFor="statut">Statut</InputLabel>
                    <Input id="statut" name='statut' type="text" onChange={this.handleInput} value={this.state.statut}/>
                </FormControl>

            </form>
            </Dialog>

        );

    }


}
