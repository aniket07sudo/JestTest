import React, { Component } from 'react';
import CheckoutSummary from '../components/CheckoutSummary';
import {Route , Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import ContactData from '../components/ContactData';
import Spinner from '../components/Spinner';
class Checkout extends Component {
    // state = {
    //     ingredients:{
    //         salad:1,
    //         meat:1,
    //         bacon:1,
    //         cheese:1
    //     }
    // }

    // componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     for (let params of query.entries()) {
    //         ingredients[params[0]] = +params[1];
    //     }
    //     this.setState({ingredients:ingredients});
    // }
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render() {
        let check;
        if(this.props.loading) {
         check = <Spinner />;
        }
        
        if(this.props.ings){
            check = (
                <div>
                     <CheckoutSummary ingredients={this.props.ings} checkoutCancelled={this.checkoutCancelledHandler} checkoutContinue={this.checkoutContinueHandler} />
                <Route path={this.props.match.url + '/contact-data'} render={(props) => <ContactData ingredients={this.props.ing} {...props} />}/>
                </div>
            )
        }
        let purchaseRedirect = this.props.purchased ? <Redirect to="/" /> : null;
        return(
            <div>
                {purchaseRedirect}
               {check}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings:state.burgerBuilder.ingredients,
        loading:state.order.loading,
        purchased:state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);