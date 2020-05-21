import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authAction';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../../common/TextFieldGroup'

class Login extends Component {
    constructor() {
        super();
        this.state = {
            password: "",
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        const { errors } = nextProps;
        if (errors && errors !== prevState.errors) {
            return {
                errors
            };
        }
        if (nextProps.auth.isAuthenticated) {
            nextProps.history.push("/dashboard");
            return;
        }
        return null;
    }
    // UNSAFE_componentWillReceiveProps(nextProps) {
    //     if (nextProps.auth.isAuthenticated) {
    //         this.props.history.push("/dashboard");
    //         return;
    //     }
    //     if (nextProps.errors) {
    //         this.setState({
    //             errors: nextProps.errors
    //         })
    //     }
    // }
    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            email: this.state.email,
            password: this.state.password
        }
        //console.log(newUser);
        this.props.loginUser(newUser, this.props.history);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    render() {
        const { errors } = this.state;
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">登录</h1>
                            <p className="lead text-center">使用已有的账户登录</p>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    type="email" name="email"
                                    value={this.state.email || ''}
                                    onChange={this.onChange}
                                    placeholder="请输入用户名/邮箱"
                                    error={errors.email}
                                />
                                <TextFieldGroup
                                    type="password" name="password"
                                    value={this.state.password || ''}
                                    onChange={this.onChange}
                                    placeholder="请输入密码"
                                    error={errors.password}
                                />

                                <input type="submit" className="btn btn-info btn-block mt-4" />

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
Login.protoTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}
// export default Register; 
//connect (mapStateToProps,mapDispatchToProps)
// 将状态映射为属性
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(
    mapStateToProps,//mapStateToProps
    { loginUser } //mapDispatchToProps
)(withRouter(Login))
