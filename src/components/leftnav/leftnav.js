import React  from "react";
import { Link } from 'react-router-dom';
import Store from "../../stores";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/style2.css';
import { Button } from 'react-bootstrap';
import { FaRegListAlt, FaArrowLeft } from "react-icons/fa";


const store = Store.store

class LeftNav extends React.Component{

    constructor(props){
        super(props)

        const themeType = store.getStore("themeType")
        const activeClass = store.getStore("activeClass") 
        this.state = {
            themeType : themeType,
            activeClass : activeClass
        }
    }

    toggleClassClick() {
        this.setState({ activeClass: this.state.activeClass });
        store.setStore({activeClass : this.state.activeClass})
        this.props.toggleClass(this.state.activeClass)
      };
    
    toggleThemeClick(){
        this.setState({themeType : !this.state.themeType});
        store.setStore({themeType : !this.state.themeType})
        localStorage.setItem("themeType", !this.state.themeType)
        this.props.toggleTheme(!this.state.themeType);
       
    }
       
    render(){

        return (
            <>
                 <div className={this.state.themeType?"nigthmode-sidebar":"daymode-sidebar"} id="sidebar-wrapper">

                    <div className="sidebar-heading text-center ">
                        <img
                            alt=""
                            src={ require('../../assets/opes-logo-big.png') }
                            width="100"
                            height="100"
                            className="d-inline-block"
                            />{' '}
                    </div>
                    
                    <div className={this.state.themeType?"nigthmode-sidebar-text list-group list-group-flush":"daymode-sidebar-text list-group list-group-flush"}  >
                        <Link className="list-group-item list-group-item-action" to="/#" ><FaRegListAlt/> Dashboard</Link>
                        <Link className="list-group-item list-group-item-action" to="/hives"><FaRegListAlt/> Hives</Link>
                        <Link className="list-group-item list-group-item-action" to="/farm"><FaRegListAlt/> Farms</Link>
                        <Link className="list-group-item list-group-item-action" to="/whaletank"><FaRegListAlt/> Whale Tank</Link>
                    </div>


                    <div className={this.state.themeType?"nigthmode-sidebar-text nav-footer d-flex align-items-end":"daymode-sidebar-text nav-footer d-flex align-items-end"} >
                        <Button className="btn-block btnClear" 
                            onClick={this.toggleClassClick.bind(this)}>
                            <FaArrowLeft/> Hide Menu
                        </Button>
                        <br/>
                    </div>

                    
                    <div className="onoffswitch1 text-center">
                        <input type="checkbox" name="onoffswitch1" className="onoffswitch1-checkbox" id="myonoffswitch1"
                            onClick={this.toggleThemeClick.bind(this)} 
                            defaultChecked={!this.state.themeType}/>
                        <label className="onoffswitch1-label" htmlFor="myonoffswitch1">
                            <span className="onoffswitch1-inner"></span>
                            <span className="onoffswitch1-switch"></span>
                        </label>
                    </div>


                     
                </div>
            </>
        )
    }
    
}

export default LeftNav