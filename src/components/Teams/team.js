import React, { Component } from 'react'
import axios from 'axios';
import { URL_TEAM } from '../Utils/paths';


export default class Team extends Component {
    
    state = {
        data : []
    }

    componentDidMount(){
        axios.get(`${URL_TEAM}?name=${this.props.match.params.id}`)
        .then(response => {
            this.setState({
                data : response.data[0]
            })
        })
    }

    squadPlayer = (squad) => (
        squad ?
        squad.map(player =>(
            <div key={player.name} className="item player_wrapper">
                <img alt={player.name} src={`/images/avatar.png`} />
                <h4>{player.name}</h4>
            </div>
            ))
        :null
    )
    renderData = (data) => (
        data ?
        
        <div className="team_data_wrapper">
        <div className="left">
            <img alt={data.name} src={`/images/teams/${data.logo}`} />
        </div>
        <div className="right">
            <h1>{data.name}</h1>
            <p>{data.description}</p>
            <br/>
            <div className="squad">
                {this.squadPlayer(data.squad)}
            </div>
        </div>
        </div>
        :null
    )
    render() {
        return (
            <div className="team_data">
                {this.renderData(this.state.data)}
            </div>
        )
    }
}
