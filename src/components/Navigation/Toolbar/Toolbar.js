import React from 'react';
import classes from './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'

const Toolbar = (props) => (
   
    <header className={classes.Toolbar}>
        <div onClick={props.open}>Menu</div>
        <Logo height="80%"/>
        <nav className={classes.DesktopOnly}> 
            <NavigationItems isAuthenticated={props.isAuth} />
            </nav>
        </header>
)

export default Toolbar;