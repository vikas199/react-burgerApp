import React, { Component } from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import {connect} from 'react-redux'
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
    state={
        showSideDrawer: false
    }
    SideDrawerClose = () => {
       this.setState({ showSideDrawer: false})
    }

    drawerToggleClose = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }
    render(){
        return(
    <Aux>
        <Toolbar open={this.drawerToggleClose}
        isAuth={this.props.token} />
        <SideDrawer isAuth={this.props.token} open={this.state.showSideDrawer} closed={this.SideDrawerClose}/>
        <main className={classes.Content}>
            {this.props.children}
        </main>
    </Aux>
        )}
};

const mapStateToProps = state => {
    return {
        token:state.auth.token !== null
    }
}

export default connect(mapStateToProps, null)(Layout);