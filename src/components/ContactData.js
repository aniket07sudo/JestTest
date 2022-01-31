import React , {Component} from 'react';
import axios from '../axios-orders';
import withErrorHandler from './WithError';
import {connect} from 'react-redux';
import Spinner from './Spinner';
import Input from './Input';
import Button from './Button';
import './Button.css';
import { purchaseBurger } from '../store/actions/order';

class ContactData extends Component {
    state = {
        orderForm: {
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value: '',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            street: {
                elementType:'input',
                elementConfig: {
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            zipCode: {
                elementType:'input',
                elementConfig: {
                    type:'text',
                    placeholder:'Zip Code'
                },
                value:'',
                validation:{
                    required:true,
                    minlength:3,
                    maxlength:5
                },
                valid:false,
                touched:false
            },
            country: {
                elementType:'input',
                elementConfig: {
                    type:'text',
                    placeholder:'Your Country'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            email: {
                elementType:'input',
                elementConfig: {
                    type:'email',
                    placeholder:'Your Email'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            delivery:{
                elementType:'select',
                elementConfig: {
                    options:[
                        { value:'fastest', displayValue:'Fastest'},
                        { value:'cheapest', displayValue:'Cheapest'}
                    ]
                },
                validation:{},
                valid:true,
                touched:true,
            }
        },
        formIsValid:false
    }

    orderHandler = (event) => {
        event.preventDefault();
         this.setState({loading:true});
         const formData = {};
         for(let formElementIdentifier in this.state.orderForm) {
             formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
         }
         console.log(formData);
        const order = {
            ingredients:this.props.ing,
            form:formData,
            userId:this.props.userId
        }
        this.props.onOrderBurger(order,this.props.token);
        // axios.post('/orders.json',order).then(response => 
        //     { 
        //     this.setState({loading:false}); 
        //     this.props.history.push('/'); 
        //     }).catch(error => this.setState({loading:false}));
    }
    checkValidity(value,rules) {
        let isValid = true;
        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minlength) {
            isValid = value.length >= rules.minlength && isValid;
        }
        if(rules.maxlength) {
            isValid = value.length <= rules.maxlength && isValid;
        }
        return isValid;
    }
    inputChangedHandler = (event,identifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedElement = {
            ...updatedOrderForm[identifier]
        }
        updatedElement.value = event.target.value;
        updatedElement.valid = this.checkValidity(updatedElement.value,updatedElement.validation);
        updatedElement.touched = true;
     
        updatedOrderForm[identifier] = updatedElement;
        let formValid = true;
        for(let inputIdentifier in updatedOrderForm) {
            formValid = updatedOrderForm[inputIdentifier].valid && formValid;
        }
        this.setState({orderForm:updatedOrderForm,formIsValid:formValid});  
    }
    render() {
        const formElement = [];
        for (let key in this.state.orderForm) {
            formElement.push({
                id:key,
                config:this.state.orderForm[key]
            });
        }
        let form = ( 
        <form>
            {formElement.map(form => (
                <Input elementType={form.config.elementType} elementConfig={form.config.elementConfig} value={form.config.value} invalid={!form.config.valid} touched={form.config.touched} changed={(event) => this.inputChangedHandler(event,form.id)}/>
            ))}
            <Button type="Success" clicked={this.orderHandler} disabled={!this.state.formIsValid}>Submit</Button>
        </form>
            );
        if(this.props.loading) {
            form = <Spinner />
        }
        return(
            <div>
                <h1>Enter Your Contact data</h1>
               {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ing: state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger:(orderData,token) => dispatch(purchaseBurger(orderData,token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));
