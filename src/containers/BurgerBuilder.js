import React , {Component} from 'react';
import Aux from '../hoc/Auxiliary';
import Burger from '../components/Burger';
import BuildControls from '../components/BuildControls';
import Modal from '../components/Modal';
import OrderSummary from '../components/OrderSummary';
import axios from '../axios-orders';
import Spinner from '../components/Spinner';
import withError from '../components/WithError';
import {connect} from 'react-redux';
import {addIngredient , removeIngredients , initIngredients} from '../store/actions/BurgerBuilder';
import { purchaseInit } from '../store/actions/order';
import { authRedirect } from '../store/actions/auth';

export class BurgerBuilder extends Component {

    state = {
        purchasing:false,
        loading:false
    }
    componentDidMount() {
      this.props.onInitIngredients();
 
    }
    updatePurchase(ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum,el) => {
            return sum + el;
        },0);
        return sum > 0;
    }
    purchaseHandler = () => {
        if(this.props.isAuthenticated) {
            this.setState({purchasing:true});
        } else {
            this.props.onAuthRedirect('/checkout');
            this.props.history.push("/auth");
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing:false});
    }
    purchaseContinue = () => {
       
        // const queryParams = [];
        // for (let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.props.ing[i]));
        // }
        // const queryString = queryParams.join("&");
        // this.props.history.push({
        //     pathname:'/checkout',
        //     search:'?' + queryString
        // });
        this.props.onPurchaseInit();
        this.props.history.push('/checkout');
    }
    render() {
        const disabledInfo = {
            ...this.props.ing
        }
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
  
        let burger = this.props.error ? <p>Ingredients Can't Be Loaded</p> : <Spinner />;
        if(this.props.ing) {
           burger = (
                <Aux>
                <Burger ingredients={this.props.ing}/>
                <BuildControls ingredientAdded={this.props.onIngredientAdded} 
                ingredientRemoved={this.props.onIngredientRemoved} 
                isAuth={this.props.isAuthenticated} 
                disabled={disabledInfo} 
                price={this.props.price} 
                purchasable={this.updatePurchase(this.props.ing)} 
                ordered={this.purchaseHandler} />
                </Aux>
            );
            orderSummary = <OrderSummary price={this.props.price} ingredients={this.props.ing} cancel={this.purchaseCancelHandler} continueModal={this.purchaseContinue}/>;
        }
        // if(this.state.loading) {
        //     orderSummary=<Spinner />;
        // }
        return(
            <Aux>
                <Modal show={this.state.purchasing} cancelModal={this.purchaseCancelHandler} >
                  {orderSummary}
                </Modal>
            {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ing:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        isAuthenticated:state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded:(ingName) => dispatch(addIngredient(ingName)),
        onIngredientRemoved:(ingName) => dispatch(removeIngredients(ingName)),
        onInitIngredients:() => dispatch(initIngredients()),
        onPurchaseInit:() => dispatch(purchaseInit()),
        onAuthRedirect:(path) => dispatch(authRedirect(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withError(BurgerBuilder,axios));