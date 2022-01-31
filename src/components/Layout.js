import React, { Component } from 'react';
import Aux from '../hoc/Auxiliary';
import Toolbar from './Toolbar';
import './Layout.css';
import { connect } from 'react-redux';
class layout extends Component {

    render() {
        return(
            <Aux>
            <Toolbar isauthenticated={this.props.isAuth} />
            <main className="content">
                {this.props.children}
            </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuth:state.auth.token !== null
    }
}

export default connect(mapStateToProps)(layout);