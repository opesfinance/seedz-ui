import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withNamespaces } from 'react-i18next';
import UnlockModal from '../unlock/unlockModal.jsx'


import { Container, Col, Row, Button, Navbar, Nav, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { FaRegListAlt, FaArrowLeft,FaListUl } from "react-icons/fa";


import {
  ERROR,
  CONFIGURE_RETURNED,
  GET_BALANCES, 
  GET_BALANCES_RETURNED
} from '../../constants'
import LeftNav from "../leftnav/leftnav";
import Store from "../../stores";
const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store


class Stores extends Component {

  constructor(props) {
    super()

    const account = store.getStore('account')
    const themeType = store.getStore('themeType')

    this.state = {
      activeClass: false,
      account: account,
      themeType : themeType
    };
  };

  componentWillMount() {
    emitter.on(CONFIGURE_RETURNED, this.configureReturned);
  }

  componentWillUnmount() {
    emitter.removeListener(CONFIGURE_RETURNED, this.configureReturned);
  }

  configureReturned = () => {
    this.setState({ loading: false })
  }

  toggleClass=()=> {
    const { activeClass } = this.state
    this.setState({ activeClass: !activeClass });
  };

  toggleTheme = ()=>{
    const themeType = store.getStore('themeType');
    store.setStore({'themeType': !themeType});
    this.setState({'themeType' : !themeType});
  }
  
  

  

  render() {
    const { classes, t, location } = this.props;
    const themeType = store.getStore('themeType')
    console.log("THEME HOME : ", themeType)
    const { activeClass, account, modalOpen } = this.state;

    var address = null;
    if (account.address) {
      address = account.address.substring(0,6)+'...'+account.address.substring(account.address.length-4,account.address.length)
    }


    return (
      <>

        <div className={!activeClass?"d-flex":"d-flex toggled"} id="wrapper">

            <div className={!themeType?"nigthmode-sidebar":"daymode-sidebar"} id="sidebar-wrapper">
              
            <LeftNav  props={this.props} themeType={themeType}/>


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
                checked={themeType}/>
                <label className="onoffswitch1-label" htmlFor="myonoffswitch1">
                    <span className="onoffswitch1-inner"></span>
                    <span className="onoffswitch1-switch"></span>
                </label>
              </div>



            </div>



            <div  className={!themeType?"nightmode-content":"daymode-content"} id="page-content-wrapper">

              <Navbar className="mt-3">
              <Navbar.Toggle />
               { <Button className="btn btn-primary" data-toggle="collapse" aria-expanded="false"
                  onClick={this.toggleClass}
                  ><FaListUl/></Button> }

               

                
                <Navbar.Collapse className="justify-content-end">
                  <Button className="btn btn-primary" onClick={this.overlayClicked }>
                  Wallet :  { address}
                  </Button>
                </Navbar.Collapse>
              </Navbar>

              <div className="container-fluid">
            
            
              
              
              <h1>STORES PAGE</h1>
              
              
              </div>
          </div>

        </div>



        
        { modalOpen && this.renderModal() }
      </>
    )
  };

 


  renderModal = () => {
    return (
      <UnlockModal closeModal={ this.closeModal } modalOpen={ this.state.modalOpen } />
    )
  }

  overlayClicked = () => {
    this.setState({ modalOpen: true })
  }

  closeModal = () => {
    this.setState({ modalOpen: false })
  }



}

export default withNamespaces()(withRouter((Stores)));
