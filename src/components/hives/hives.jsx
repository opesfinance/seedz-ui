import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withNamespaces } from 'react-i18next';
import UnlockModal from '../unlock/unlockModal.jsx'


import {  Button, Navbar} from 'react-bootstrap';
import { FaListUl } from "react-icons/fa";


import {
  CONFIGURE_RETURNED,
  GET_BALANCES_RETURNED,
  GET_BOOSTEDBALANCES_RETURNED
} from '../../constants/constants'
import LeftNav from "../leftnav/leftnav";
import Store from "../../stores/store";
const emitter = Store.emitter

const store = Store.store


class Hives extends Component {

  constructor(props) {
    super()

    const account = store.getStore('account')
    const rewardPools = store.getStore('rewardPools')
    const themeType = store.getStore('themeType')
    const activeClass = store.getStore('activeClass')


    this.state = {
      activeClass: activeClass,
      rewardPools: rewardPools,
      loading: !(account && rewardPools),
      account: account,
      themeType : themeType
    };



  };

  componentWillMount() {
    emitter.on(CONFIGURE_RETURNED, this.configureReturned);
    emitter.on(GET_BALANCES_RETURNED, this.balancesReturned);
    emitter.on(GET_BOOSTEDBALANCES_RETURNED, this.balancesReturned);
  }

  componentWillUnmount() {
    emitter.removeListener(CONFIGURE_RETURNED, this.configureReturned);
    emitter.removeListener(GET_BALANCES_RETURNED, this.balancesReturned);
    emitter.removeListener(GET_BOOSTEDBALANCES_RETURNED, this.balancesReturned);
  }

  balancesReturned = () => {
    const rewardPools = store.getStore('rewardPools')
    this.setState({ rewardPools: rewardPools })
  }
  boostInfoReturned = () => {
    const rewardPools = store.getStore('rewardPools')
    this.setState({ rewardPools: rewardPools })
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
    const { account, modalOpen } = this.state;

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
                  onClick={this.toggleClass.bind()}
                  ><FaListUl/></Button> }
                <Navbar.Collapse className="justify-content-end">
                  <Button className="btn btn-primary" onClick={this.overlayClicked }>
                    { address && 'Wallet : ' + address}
                    { !address && 'Connect Wallet'}
                  </Button>
                </Navbar.Collapse>
              </Navbar>

              <div className="container-fluid">
            
                <h2>Hives</h2>
                <h5>Choose your pairing for your one year membership.</h5>

                <div className="row">
                  <div className="col-lg-2 col-md-12 col-sm-12"></div>
                  
                  
                  { this.renderHives('uniswap') }

                  { this.renderHives('balancer') }


                  <div className="col-lg-2 col-md-12 col-sm-12"></div>


                </div>
              
              </div>
          </div>

        </div>



        
        { modalOpen && this.renderModal() }
      </>
    )
  };

 

  renderHives=(rewardName)=>{
    const { rewardPools } = this.state
    return rewardPools.filter((rewardPool) => {
      if([rewardName].includes(rewardPool.id) ) {
        return true
      }
      return false
    }).map((rewardPool) => {
      return (
        <>

            <div className="col-lg-4 col-md-12 col-sm-12 p-5 my-auto">
                    <div className="card newBorder">
                      <table >
                          <tbody> 
                            <tr className="newtable">
                              <th>{ rewardPool.name }<br/>(BPT)</th>
                              <td><button className="btn btn-primary">Stake</button></td>
                            </tr>
                            <tr>
                              <th>BONUS</th>
                              <td>20039</td>
                            </tr>
                            <tr>
                              <th>NEXT LEVEL IN</th>
                              <td>20 days</td>
                            </tr>
                            <tr>
                              <th>WEEKLY REWARDS</th>
                              <td>20039 seedz</td>
                            </tr>
                            <tr>
                              <th>POOL LIQUIDITY</th>
                              <td>$20039 USD</td>
                            </tr>
                            <tr>
                              <th>MY BEAST MODES</th>
                              <td>4</td>
                            </tr>
                            <tr>
                              <th>MY REWARDS</th>
                              <td>20039 seedz</td>
                            </tr>
                          </tbody>
                      </table>
                    </div>
                  </div>

        </>
      )
    });
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

export default withNamespaces()(withRouter((Hives)));
