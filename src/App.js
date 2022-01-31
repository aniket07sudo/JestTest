import React , {Component} from 'react';
import {Route , withRouter , Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './components/Layout';
import BurgerBuilder from './containers/BurgerBuilder';
import Checkout from './containers/Checkout';
import logout from './components/logout';
import {authCheckState} from './store/actions/auth';
import auth from './containers/Auth';
import Orders from './components/Orders';
import './App.css';
import Movies from './mock/movies';

class App extends Component {

  componentDidMount() {
    this.props.onAutoSign();
  }
  render() {
    // let routes = (
    //   <Switch>
    //     <Route path="/auth" component={auth} />
    //   <Route path="/" exact component={BurgerBuilder}/>
      
    //   </Switch>
    // )
    // if(this.props.isAuth) {
    //   routes = (
    //     <Switch>
          
    //     <Route path="/checkout" component={Checkout}/>
    //     <Route path="/orders" component={Orders} />
    //     <Route path="/logout" component={logout} />
    //     <Route path="/" exact component={BurgerBuilder}/>
    //       </Switch>
    //   )
    // }
    return (
      <div>
        <Layout>
        {/* <Route path="/auth" component={auth} />
        <Route path="/checkout" component={Checkout}/>
        <Route path="/orders" component={Orders} />
        <Route path="/logout" component={logout} />
        <Route path="/" exact component={BurgerBuilder} /> */}
          <Route path="/" exact component={Movies} />
        </Layout>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuth:state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoSign:() => dispatch(authCheckState())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));