import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import UnlockModal from '../unlock/unlockModal.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/style2.css';
import {  Button, Navbar} from 'react-bootstrap';
import {  FaListUl } from "react-icons/fa";
import {
  ERROR,
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
  CONFIGURE_RETURNED
} from '../../constants'

import Store from "../../stores";
import LeftNav from "../leftnav/leftnav";

const emitter = Store.emitter
const store = Store.store



class Account extends Component {

  constructor(props) {
    super()

    const account = store.getStore('account')
    const themeType = store.getStore('themeType')
    const activeClass = store.getStore('activeClass')

    this.state = {
      activeClass : activeClass,
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

  toggleClass=(activeClassVal)=> {
    this.setState({ activeClass: !store.getStore('activeClass') });
    store.setStore({activeClass : !store.getStore('activeClass')})
  };
  toggleTheme=(themeTypeVal)=> {
    this.setState({themeType : themeTypeVal});
  }
  
 


  render() {

    const { modalOpen} = this.state

    return (
      <>


        <div className={!this.state.activeClass?"d-flex":"d-flex toggled"} id="wrapper">

        <LeftNav 
              toggleClass={this.toggleClass.bind(this)}
              toggleTheme={this.toggleTheme.bind(this)}
            />



          <div  className={!this.state.themeType?"nightmode-content":"daymode-content"} id="page-content-wrapper">

            <Navbar className="mt-3">
              <Button className="btn btn-primary" data-toggle="collapse" aria-expanded="false"
                onClick={this.toggleClass.bind(this)}
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
