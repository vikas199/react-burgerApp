import React, { Component } from 'react';
import {Route, Switch, withRouter, Redirect } from 'react-router-dom';
import {connect} from 'react-redux'
import * as actions from './actions/index'


import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/checkout/Checkout'
import Orders from './containers/Orderss/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'

class App extends Component {
  componentDidMount(){
    this.props.authCheckState()
  }
  render () {
    let routes = (
      <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
      </Switch>
    )

    if(this.props.isAuthTrue){
     routes=(
      <Switch>
      <Route path="/checkout" component={Checkout} />
      <Route path="/orders" component={Orders} />
      <Route path="/logout" component={Logout} />
      <Route path="/auth" component={Auth} />
   
    <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
      </Switch>
      )
    }
    return (
      <div>
        <Layout>
          <Switch>
       {routes}
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthTrue: state.auth.token !== null
  }
}
const mapDispatchToProps = dispatch => {
  return{
    authCheckState: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
