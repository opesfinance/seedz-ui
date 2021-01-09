import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { withNamespaces } from 'react-i18next';
import UnlockModal from '../unlock/unlockModal.jsx'


import { Button, Navbar} from 'react-bootstrap';
import { FaListUl, FaTwitter, FaGithubAlt, FaFacebook, FaLink } from "react-icons/fa";


import {
  CONFIGURE_RETURNED,
} from '../../constants'
import LeftNav from "../leftnav/leftnav";
import Store from "../../stores";
const emitter = Store.emitter
const store = Store.store


class Farm extends Component {

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
                  onClick={this.toggleClass.bind(this)}
                  ><FaListUl/></Button> }

               

                
                <Navbar.Collapse className="justify-content-end">
                  <Button className="btn btn-primary " onClick={this.overlayClicked }>
                   { address && 'Wallet : ' + address}
                   { !address && 'Connect Wallet'}
                  </Button>
                </Navbar.Collapse>
              </Navbar>

              <div className="container-fluid">
            
                <h2>Farms</h2>
                <h5>Plant your seedz to yield out tokens of your favorite projects.</h5>
              
                <div className="row">

                  { this.renderFarmItem('balancer') }
              

                </div>
              
              </div>
          </div>

        </div>



        
        { modalOpen && this.renderModal() }
      </>
    )
  };


  renderFarmItem=(rewardName)=>{
    const { rewardPools } = this.state
    return rewardPools.filter((rewardPool) => {
      if([ rewardName].includes(rewardPool.id) ) {
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
                              <th>Balacer Pool<br/>(BPT)</th>
                              <td><button className="btn btn-primary btn-block h-100 w-100"
                                onClick={ () => { this.navigateStakePage(rewardPool) }}
                              >Stake</button></td>
                            </tr>
                            <tr>
                              <th>APY</th>
                              <td>20039</td>
                            </tr>
                            <tr>
                              <th>DAYS LEFT</th>
                              <td>20 days</td>
                            </tr>
                            <tr>
                              <th>WEEKLY REWARDS</th>
                              <td>20039 seedz</td>
                            </tr>
                            <tr>
                              <th>MY BEAST MODES</th>
                              <td>4</td>
                            </tr>
                            <tr>
                              <th>MY REWARDS</th>
                              <td>20039 seedz</td>
                            </tr>
                            <tr>
                              <td colSpan="2" className="text-center">
                                  <Link to="/"><FaTwitter/></Link> &nbsp;
                                  <Link to="/"><FaGithubAlt /></Link> &nbsp;
                                  <Link to="/"><FaFacebook /></Link> &nbsp;
                                  <Link to="/"><FaLink/></Link>
                              </td>
                            </tr>
                          </tbody>
                      </table>
                    </div>
                  </div>
        </>
        )
      })
  }

 

  navigateStakePage = (rewardPool) =>{
    store.setStore({ currentPool: rewardPool })
    this.props.history.push('/stake')
  }

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

export default withNamespaces()(withRouter((Farm)));
