import React,{Component} from 'react'
import {Button, FormControl, Input, InputLabel} from "@material-ui/core";
export default class EditBureau extends Component{
    constructor(props) {
        super(props);
        this.state={numero:this.props.match.params.id
            ,places:this.props.match.params.place,
            occupe:this.props.match.params.occupe};
    }

    render() {
        const {id}=this.props.match.params
        return (
            <form onSubmit={this.onSubmit} style={{width: "50%", marginLeft: "20%"}}>
                <FormControl margin="normal" fullWidth={true}>
                    <InputLabel htmlFor="numero">Numero</InputLabel>
                    <Input name="numero" id="numero" onChange={this.handleInput} type="text" value={this.state.numero}/>
                </FormControl>
                <FormControl margin="normal" fullWidth={true}>
                    <InputLabel htmlFor="places">Places</InputLabel>
                    <Input id="places" name="places" type="number" onChange={this.handleInput}
                           value={this.state.places}/>
                </FormControl>
                <FormControl margin="normal" fullWidth={true}>
                    <InputLabel htmlFor="occupe">Statut</InputLabel>
                    <Input id="occupe" disabled={true} name='occupe' type="text" onChange={this.handleInput}
                           value={this.state.occupe}/>
                </FormControl>
                <Button variant="contained" color="primary">Valider</Button>
            </form>
        );
    }

}
