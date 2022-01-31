import React , {Component} from 'react';
import axios from '../axios-orders';
import withError from './WithError';
import Spinner from './Spinner';
import Order from './Order';
import { connect } from 'react-redux';
import { fetchOrder } from '../store/actions/order';

class Orders extends Component {
    state = {
        orders:[],
        loading: true
    }
    componentDidMount() {
       this.props.onFetchOrders(this.props.token,this.props.userId);
    }
    render() {
        let order = <Spinner />
        if(!this.props.loading) {
            order = this.props.orders.map(order => (
                <Order key={order.id} ingredients={order.ingredients} />
             ))
        }
        return(
            <div>
                { order }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders:state.order.orders,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders:(token,userId) => dispatch(fetchOrder(token,userId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withError(Orders,axios));