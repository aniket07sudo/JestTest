import React , { Component } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import Spinner from '../components/Spinner';
import { auth } from '../store/actions/auth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
class Auth extends Component {
   
        state = {
            controls: {
                email:{
                    elementType:'input',
                    elementConfig:{
                        type:'email',
                        placeholder:'Your Email'
                    },
                    value: '',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                password:{
                    elementType:'input',
                    elementConfig:{
                        type:'password',
                        placeholder:'Your Password'
                    },
                    value: '',
                    validation:{
                        required:true,
                        minlength:8
                    },
                    valid:false,
                    touched:false
                }
            },
            isSignup:true
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
                ...this.state.controls
            }
            const updatedElement = {
                ...updatedOrderForm[identifier]
            }
            updatedElement.value = event.target.value;
            updatedElement.valid = this.checkValidity(updatedElement.value,updatedElement.validation);
            updatedElement.touched = true;
         
            updatedOrderForm[identifier] = updatedElement;
            this.setState({controls:updatedOrderForm});  
        }
        submitHandler = (event) => {
            event.preventDefault();
            this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup);
        }
        switchHandler = () => {
            this.setState(prevState => {
                return {
                    isSignup:!prevState.isSignup
                }
            })
        }
        render() {
            const formElement = [];
        for (let key in this.state.controls) {
            formElement.push({
                id:key,
                config:this.state.controls[key]
            });
        }
        let form = ( 
            <form onSubmit={this.submitHandler}>
                {formElement.map(form => (
                    <Input elementType={form.config.elementType} elementConfig={form.config.elementConfig} value={form.config.value} formValid touched={form.config.touched} changed={(event) => this.inputChangedHandler(event,form.id)}/>
                ))}
                <Button type="Success" clicked={this.orderHandler}>Submit</Button>
            </form>
                );
                let error = null;
                if(this.props.loading) {
                    form = <Spinner />
                }
                if(this.props.error) {
                    error = (
                    <p>{this.props.error.message}</p>
                    )
                }
                let authRedirect = null;
                if(this.props.isAuth) {
                    authRedirect = <Redirect to={this.props.authRedirect} />
                } 
                return(
                    <div>
                        {authRedirect}
                        {error}
                        <h1>Auth</h1>
                       {form}
                <Button type="Danger" clicked={this.switchHandler}>Switch to {this.state.isSignup ? 'Sign up' : 'Sign in'}</Button>
                    </div>
                )
    }
}

const mapStateToProps = state => {
    return {
        loading:state.auth.loading,
        error:state.auth.error,
        isAuth:state.auth.token !== null,
        authRedirect:state.auth.authRedirect
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth:(email,password,isSignup) => dispatch(auth(email,password,isSignup))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);