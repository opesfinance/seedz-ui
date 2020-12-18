import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Divider,
  Typography,
} from '@material-ui/core';


import UnlockModal from '../unlock/unlockModal.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/style2.css';
import { Container, Col, Row, Button, Navbar, Nav, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { FaRegListAlt, FaArrowLeft, FaListUl } from "react-icons/fa";
import {
  ERROR,
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
  CONFIGURE,
  CONFIGURE_RETURNED
} from '../../constants'

import Store from "../../stores";
import LeftNav from "../leftnav/leftnav";

const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store



class Account extends Component {

  constructor(props) {
    super()

    const account = store.getStore('account')
    const themeType = store.getStore('themeType')

    this.state = {
      activeClass : false,
      loading: false,
      account: account,
      assets: store.getStore('assets'),
      modalOpen: false,
      themeType : themeType
    }
  }
  componentWillMount() {
    emitter.on(ERROR, this.errorReturned);
    emitter.on(CONNECTION_CONNECTED, this.connectionConnected);
    emitter.on(CONNECTION_DISCONNECTED, this.connectionDisconnected);
    emitter.on(CONFIGURE_RETURNED, this.configureReturned);
  }

  componentWillUnmount() {
    emitter.removeListener(ERROR, this.errorReturned);
    emitter.removeListener(CONNECTION_CONNECTED, this.connectionConnected);
    emitter.removeListener(CONNECTION_DISCONNECTED, this.connectionDisconnected);
    emitter.removeListener(CONFIGURE_RETURNED, this.configureReturned);
  };

  connectionConnected = () => {
    // this.setState({ account: store.getStore('account') })
  };

  configureReturned = () => {
    // this.props.history.push('/')
  }

  connectionDisconnected = () => {
    this.setState({ account: store.getStore('account'), loading: false })
  }

  errorReturned = (error) => {
    //TODO: handle errors
  };

  toggleClass=()=> {
    const { activeClass } = this.state
    this.setState({ activeClass: !activeClass });
  };

  toggleTheme = ()=>{
    const themeType = store.getStore('themeType');
    store.setStore({'themeType': !themeType});
    this.setState({'themeType' : !themeType});
    console.log("THEME Account : ", !themeType)
    
  }
  
 


  render() {
    const { classes } = this.props
    const { activeClass, loading , themeType,modalOpen, account} = this.state

    return (
      <>


        <div className={!activeClass?"d-flex":"d-flex toggled"} id="wrapper">

          <div className={!themeType?"nigthmode-sidebar":"daymode-sidebar"} id="sidebar-wrapper">
            
            <LeftNav  props={this.props} themeType={themeType} />

            <div className={!themeType?"nigthmode-sidebar-text nav-footer d-flex align-items-end":"daymode-sidebar-text nav-footer d-flex align-items-end"} >
              <Button className="btn-block btnClear" 
               onClick={this.toggleClass}>
                <FaArrowLeft/> Hide Menu
              </Button>
              <br/>
             
             
              
            </div>

            <div className="onoffswitch1 text-center">
              <input type="checkbox" name="onoffswitch1" className="onoffswitch1-checkbox" id="myonoffswitch1"
              onClick={this.toggleTheme}  
              checked={themeType} />
              <label className="onoffswitch1-label" htmlFor="myonoffswitch1">
                  <span className="onoffswitch1-inner"></span>
                  <span className="onoffswitch1-switch"></span>
              </label>
            </div>



          </div>



          <div  className={!themeType?"nightmode-content":"daymode-content"} id="page-content-wrapper">

            <Navbar className="mt-3">
              <Button className="btn btn-primary" data-toggle="collapse" aria-expanded="false"
                onClick={this.toggleClass}
                ><FaListUl/></Button>

              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Button className="btn btn-primary" onClick={this.unlockClicked }>
                  Connect Wallet
                </Button>
              </Navbar.Collapse>
            </Navbar>

            <div className="container-fluid text-center">
           
            <h1 className="mt-5">GET THE POWER YOU DESERVE</h1>
            <h4>The fairest distribution model the world has ever seen.</h4>
            <h6>Yield Farmers can now utilize the most valuable asset in the world to gain themselves an inside position on the next Mega-Corporation we build.</h6>
            
              </div>
          </div>


        </div>


        { modalOpen && this.renderModal() }
      </>
    )
  }

  renderModal = () => {
    return (
      <UnlockModal closeModal={ this.closeModal } modalOpen={ this.state.modalOpen } />
    )
  }

  unlockClicked = () => {
    this.setState({ modalOpen: true, loading: true })
  }

  closeModal = () => {
    this.setState({ modalOpen: false, loading: false })
  }
}

export default withRouter(Account);
