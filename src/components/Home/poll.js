import React, { Component } from 'react'
import axios from 'axios';
import {URL_TEAM} from '../Utils/paths';

export default class Poll extends Component {
    state = {
     pollTeam : []   
    }

    getPull(){
        axios.get(`${URL_TEAM}?poll=true&_sort=count&_order=desc`)
        .then(response => {
            this.setState({
                pollTeam : response.data
            })
        })
    }

    componentDidMount(){
        this.getPull();
    }

    addCount(count,id){
        axios(`${URL_TEAM}/${id}`,{
            method:'PATCH',
            headers:{
                'Accept':'application/json',
                'Content-Type': 'application/json'
            },
            data : JSON.stringify({count : (count + 1) })
        }).then(
            () => this.getPull()
        )

    }


    renderPoll(){
        const position = ['1 st','2 nd','3 rd'];

        return this.state.pollTeam.map(
            (team,index) => 
            <div
            key={index}
            className="poll_item"
            onClick= {() => this.addCount(team.count,team.id) }
            >
                <img alt={team.team} src ={`/images/teams/${team.logo}`}/>
                <h4>{position[index]}</h4>
                <div>
                    {team.count} votes
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                <div className="home_poll">
                    <h3>Who will be the next winne</h3>
                    <div className="poll_container">
                        {this.renderPoll()}
                    </div>
                </div>
            </div>
        )
    }
}
