import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions/authAction'

import { clearCurrentProfile } from '../../actions/profileAction'
//有状态组件 rcc

class Navbar extends Component {
    onLogoutClick(e) {
        e.preventDefault();
        this.props.clearCurrentProfile();
        this.props.logoutUser();
    }
    render() {
        const { isAuthenticated, user } = this.props.auth;
        const guestLink = (<ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/register">
                    注册 </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">
                    登录
            </Link>
            </li>
        </ul>);
        const authLinks = (<ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link to="/feed" className="nav-link" >评论</Link>
            </li>
            <li className="nav-item">
                <Link to="/dashboard" className="nav-link" >Dashboard</Link>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/#" onClick={this.onLogoutClick.bind(this)}>
                    {/* <img className="rounded-circle" src={user.avatar} alt={user.name} />  */}
                    退出 </a>
            </li>

        </ul>)
        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                    <div className="container">
                        <Link className="navbar-brand" to="/landing">有间书店</Link>

                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="mobile-nav">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/Profiles">开发者</Link>
                                </li>
                            </ul>
                            {isAuthenticated ? authLinks : guestLink}

                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

Navbar.protoTypes = {
    logoutUser: PropTypes.func.isRequired,
    clearCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}
// export default Register; 
//connect (mapStateToProps,mapDispatchToProps)
// 将状态映射为属性
const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(Navbar);
