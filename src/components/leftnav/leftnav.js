import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/style2.css';
import { Container, Col, Row, Button, Navbar, Nav, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { FaRegListAlt, FaArrowLeft, FaArrowRight, FaListUl } from "react-icons/fa";

  
import Store from "../../stores";
const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store


function LeftNav(props){
    
    const [activeClass, setSideBar ] = useState('')

    const open_whaletank = ()=>{
        props.props.history.push('/whaletank')
    }
    const open_stores = ()=>{
        props.props.history.push('/stores')
    }
    const open_farm = ()=>{
        props.props.history.push('/farm')
    }
    const open_home = ()=>{
        props.props.history.push('/')
    }

    

   
       
        return (
            <>
                <div className="sidebar-heading text-center ">
                <img
                    alt=""
                    src={ require('../../assets/opes-logo-big.png') }
                    width="100"
                    height="100"
                    className="d-inline-block"
                    />{' '}
                </div>
                
                <div className={!props.themeType?"nigthmode-sidebar-text list-group list-group-flush":"daymode-sidebar-text list-group list-group-flush"}  >
                <a href="#" className="list-group-item list-group-item-action" onClick={open_home} ><FaRegListAlt/> Dashboard</a>
                <a href="#" className="list-group-item list-group-item-action" onClick={open_farm}><FaRegListAlt/> Farms</a>
                <a href="#" className="list-group-item list-group-item-action" onClick={open_stores}><FaRegListAlt/> Store</a>
                <a href="#" className="list-group-item list-group-item-action" onClick={open_whaletank}><FaRegListAlt/> Whale Tank</a>
                </div>
            </>
        )
    
}

export default LeftNav