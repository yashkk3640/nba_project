import React, { Component } from 'react'
import axios from 'axios';
import {URL_EMAIL} from './paths';

export default class Subscription extends Component {

    state = {
        email : '',
        error : false,
        success :false,
        alreadyIn : false
    }


    saveSubscription = (email) => {

        axios.get(`${URL_EMAIL}?email=${email}`)
        .then(response => {
            if(!response.data.length){
                axios(URL_EMAIL,{
                    method : 'POST',
                    headers : {
                        'Accept':'application/json',
                        'Content-Type': 'application/json'
                    },
                    data : JSON.stringify({email})
                }).then(response => {
                    this.setState({
                        email:'',
                        success:true
                    });
                });
            }else{
                this.setState({
                    email:'',
                    alreadyIn:true
                })
            }
        })
    }


    handleSubmit = (event) => {
        event.preventDefault();
        let email = this.state.email;
        let regex = /\S+@\S+\.\S+/;

        if(regex.test(email)){
            this.saveSubscription(email);
        }else{
            this.setState({
                error: true
            })
        }
        setTimeout( ()=>{ this.setState({
            email:'',
            error:false,
            success :false,
            alreadyIn:false
        }) }
        ,3000);
    }

    onChangeForm = (event) => {
        this.setState({
            email : event.target.value
        })
    }

    render() {
        const state = this.state;
        return (
            <div className="subcribe_panel">
                <h3>Subcribe to US ! </h3>
                <div>
                    <form onSubmit = {this.handleSubmit}>
                        <input
                            type="text"
                            value = {state.email}
                            placeholder = "youremail@gmail.com"
                            onChange = {this.onChangeForm}
                        />
                        <div className={state.error ? "error show":"error"}>Check Your Email</div>
                        <div className={state.success ? "success show":"success"}>Thank YOU</div>
                        <div className={state.alreadyIn ? "success show":"success"}>You are already with US</div>
                    </form>
                </div>
                <small>
                    Lorem impusm fjslk kfjasj jfaslkjf lj alfsdkjfla sjflksdj falskdjflkaj falsjdfkljLorem impusm fjslk kfjasj jfaslkjf lj alfsdkjfla sjflksdj falskdjflkaj falsjdfklj
                </small>
            </div>
        )
    }
}
