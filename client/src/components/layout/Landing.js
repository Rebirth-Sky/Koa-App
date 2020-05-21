import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Landing extends Component {
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }
    render() {
        return (
            <div className="landing">
                <div className="dark-overlay landing-inner text-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h1 className="display-3 mb-4">有间书店</h1>
                                <Link className="lead" to="/"> 专注于线上借阅, 搜罗闲置书籍, 用心做服务! </Link>
                                <hr />
                                <Link to="/register" className="btn btn-lg btn-info mr-2">注册</Link>
                                <Link to="/login" className="btn btn-lg btn-light">登录</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
    }
}

Landing.protoTypes = {
    auth: PropTypes.object.isRequired
}
// export default Register; 
//connect (mapStateToProps,mapDispatchToProps)
// 将状态映射为属性
const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps)(Landing);
