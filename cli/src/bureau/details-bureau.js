import React,{Component} from 'react'
import Service from "../service/Service";
import {URL_BU_ALL, URL_BU_GET_ONE} from "../utils/Constant";
export default class DetailsBureau extends Component{

    constructor(props) {
        super(props);
        this.state={id:props.params["id"]}
    }
    componentWillMount() {
        console.log("componentWillMount");
        try {
            Service.get(URL_BU_GET_ONE+"/"+this.state.id)
                .then(data=>{
                    this.setState({bureau:data});
                });

        }catch (e) {
            console.log("erreur",e.toString());
        }

    }

    render()
    {
        return (
            <div>




            </div>
        )
    }


}
