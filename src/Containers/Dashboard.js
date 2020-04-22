import React, { Component }  from 'react';
import { Form , Breadcrumb , Col ,Modal} from 'react-bootstrap';
import PlayerCard from './PlayerCard';

var utils = require('./Utils')
const base_url = utils.getUrl('base');

class Dashboard extends Component {

  constructor(props){
    super(props)

    this.state ={
        username : '',
        password : '',
        playerId: '',
        show:false,
        showMsg:'',
        loggedIn:false
    }
    this.keyPress = this.keyPress.bind(this);
    }

    keyPress(e){
      if(e.charCode == 13){
        this.addPlayer(this.state.username  , this.state.password);
        this.setState({username:'',password:'',playerId:''})
      }
    }


    sendPassedData(user , pass , player_id) {
      let body =   {username: user , password: pass};
      utils.sendData(base_url +"/"+ player_id,body ).then(data => !data.isSuccessful ? this.handleShow('Player is taken') : this.setToken(user  ,player_id));
    }

    addPlayer(user , pass){
      let player_id = '';
        if(this.state.playerId == "1"){
            player_id = 'p1';
        }else if(this.state.playerId == "2"){
            player_id = 'p2';
        }else if(this.state.playerId == "3"){
            player_id = 'p3';
        }else if(this.state.playerId == "4"){
            player_id = 'p4';
        }
        if(this.state.username !== '' && this.state.password !== '' && this.state.playerId !== ''){
           this.sendPassedData(user , pass ,player_id);
        }else{

          this.handleShow('Fill all entries');
        }

    }
     handleClose = () => {this.setState({show:false , showMsg:''})};
     handleShow = (msg) => {this.setState({show:true , showMsg:msg})};
     setToken = (username , player_id) => {
        localStorage.setItem("player_id" , player_id);
        localStorage.setItem("game_id" , "1" );
        localStorage.setItem("username" , username);
        this.setState({loggedIn:true});
        window.location.reload();
     };

     componentDidMount(){
        const player_id = localStorage.getItem("player_id");
        const game_id = localStorage.getItem("game_id");
        const username = localStorage.getItem("username");

        if(player_id !== null && game_id !== null){
          this.setState({loggedIn:true});
        }
     }





    render(){

      const player_id = localStorage.getItem("player_id");
      const game_id = localStorage.getItem("game_id");
      const username = localStorage.getItem("username");


        return (
            <div className="container">
            <div className="row">
              <div className="col">

                <Breadcrumb>

                      <>
                      <Breadcrumb.Item active>GAME {game_id}</Breadcrumb.Item>
                      <Breadcrumb.Item active>PLAYER {player_id && player_id.substr(1)}</Breadcrumb.Item>
                      <Breadcrumb.Item active>{username}</Breadcrumb.Item>
                      </>
                      <>
                      <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Message</Modal.Title>
                        </Modal.Header>
                      <Modal.Body>{this.state.showMsg}</Modal.Body>
                      </Modal>
                    </>

                </Breadcrumb>

                <div>
          {
            !this.state.loggedIn &&
                <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formUsername">
                              <Form.Control value={this.state.username} placeholder="Username" onKeyPress={e => this.keyPress(e)}  onChange={(e) => {this.setState({username:e.target.value})}}/>
                            </Form.Group>


                            <Form.Group as={Col} controlId="formPassword">
                              <Form.Control  value={this.state.password} placeholder="Password"  onKeyPress={e => this.keyPress(e)} onChange={(e) => {this.setState({password:e.target.value})}}/>
                            </Form.Group>
                          <Form.Group as={Col} controlId="formPlayerId">
                              <Form.Control value={this.state.playerId} placeholder="Player ID"  onKeyPress={e => this.keyPress(e)} onChange={(e) => {this.setState({playerId:e.target.value})}}/>
                            </Form.Group>


                       </Form.Row>

                </Form>
    }
                </div>
            </div>
              </div>
              <div className="row">
                <div className="col">
                { game_id &&
                <PlayerCard />
                }
                </div>
              </div>
          </div>

        );
}
}

export default Dashboard;