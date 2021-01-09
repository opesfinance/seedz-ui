import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withNamespaces } from 'react-i18next';
import UnlockModal from '../unlock/unlockModal.jsx'


import { Button, Navbar } from 'react-bootstrap';
import {  FaArrowLeft,FaListUl } from "react-icons/fa";


import {
  CONFIGURE_RETURNED,
} from '../../constants'
import LeftNav from "../leftnav/leftnav";
import Store from "../../stores";
const emitter = Store.emitter
const store = Store.store


class WhaleTank extends Component {

  constructor(props) {
    super()

    const account = store.getStore('account')
    const themeType = store.getStore("themeType") 
    const activeClass = store.getStore("activeClass")

    this.state = {
      activeClass: activeClass,
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

 
  toggleClass=(activeClassVal)=> {
    this.setState({ activeClass: !store.getStore('activeClass') });
    store.setStore({activeClass : !store.getStore('activeClass')})
  };
  toggleTheme=(themeTypeVal)=> {
    this.setState({themeType : themeTypeVal});
  }
  
  

  

  render() {
    const {  account, modalOpen } = this.state;
    var address = null;
    if (account.address) {
      address = account.address.substring(0,6)+'...'+account.address.substring(account.address.length-4,account.address.length)
    }


    return (
      <>

        <div className={!this.state.activeClass?"d-flex":"d-flex toggled"} id="wrapper">

            
          <LeftNav 
            toggleClass={this.toggleClass.bind(this)}
            toggleTheme={this.toggleTheme.bind(this)}
            />


            <div  className={!this.state.themeType?"nightmode-content":"daymode-content"} id="page-content-wrapper">

              <Navbar className="mt-3">
              <Navbar.Toggle />
               { <Button className="btn btn-primary" data-toggle="collapse" aria-expanded="false"
                  onClick={this.toggleClass.bind(this)}
                  ><FaListUl/></Button> }

               

                
                <Navbar.Collapse className="justify-content-end">
                  <Button className="btn btn-primary" onClick={this.overlayClicked }>
                    { address && 'Wallet : ' + address}
                    { !address && 'Connect Wallet'}
                  </Button>
                </Navbar.Collapse>
              </Navbar>

              <div className="container-fluid">
              
                <h1>Whale Tank</h1>
                
                <div className="row">
                  <div className="col-lg-3 col-md-12 col-sm-12"></div>
                  <div className="col-lg-6 col-md-12 col-sm-12 text-center mx-auto my-auto">
                    <img alt="" 
                    className="whaleTankImg"
                    src={require("../../assets/WhaleTank.png")} height="300" />
                    <h4>COMING SOON!</h4>
                    <h5>Don't stop farming! Soon you'll be</h5>
                    <h5>able to vote to add new projects!</h5>
                  </div>
                  <div className="col-lg-3 col-md-12 col-sm-12"></div>
                </div>

                

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

export default withNamespaces()(withRouter((WhaleTank)));
