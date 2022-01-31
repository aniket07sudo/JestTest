import React, { Component } from 'react';
import Aux from '../hoc/Auxiliary';
import Modal from './Modal';

const withError = (WrappedContent , axios ) => {
    return class extends Component {

        state= {
            error:null
        }
        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error:null});
                return req;
            })
            this.resInterceptor = axios.interceptors.response.use(res => res,error => {
                this.setState({error:error});
            })
        }
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
        errorConfirmed = () => {
            this.setState({error:null});
        }
        render() {
            return (
                <Aux>
                    <Modal show={this.state.error} cancelModal={this.errorConfirmed}>
                       {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedContent {...this.props} />
                </Aux>
            )
        }
    }
}

export default withError;