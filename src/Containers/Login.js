import React, { useEffect, useState, Component }  from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import PlayerCard from './PlayerCard';
import { Redirect } from 'react-router-dom';

class Login extends Component {
    constructor(props){
        super(props)
        let loggedIn = false;
        this.state ={
            username : '',
            password : ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
     handleSubmit (e) {
        e.preventDefault();
        const game_id = 1;
        let player_id;
        if(this.state.password === '1'){
            player_id = 'p1';
        }else if(this.state.password === '2'){
            player_id = 'p1';
        }else if(this.state.password === '3'){
            player_id = 'p1';
        }else if (this.state.password === '4'){
            player_id = 'p1';
        }
        localStorage.setItem("player_id",player_id);
        localStorage.setItem("game_id","1");
        localStorage.setItem("username",this.state.username);
        
        this.setState({
            loggedIn:true
        })
    }

    render(){
        const player_id = localStorage.getItem("player_id");
        const game_id = localStorage.getItem("player_id");

        if(player_id !== null && game_id !==null){
            return <Redirect to="/play" />
        }
        return (

        <div class="container  align-items-center">
            <Card style={{ width: '15rem'  ,'position':'centre' , 'border':'none'}}>
            <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Username" onChange={(e) => this.setState({username:e.target.value})}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => this.setState({password:e.target.value})} />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                        Submit
                    </Button>
                </Form>
            </Card>
        </div>

        );
}
}

export default Login;