import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import TextFieldGroup from '../../common/TextFieldGroup'

import { registerUser } from '../../actions/authAction';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
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
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }
    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
        }
        //调用action
        this.props.registerUser(newUser, this.props.history);

    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    render() {
        const { errors } = this.state;
        return (
            <div className="register">

                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">注册</h1>
                            <p className="lead text-center">创建新的账户</p>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    type="text" name="name"
                                    value={this.state.name || ''}
                                    onChange={this.onChange}
                                    placeholder="请输入用户名/邮箱"
                                    error={errors.name}
                                />
                                <TextFieldGroup
                                    type="email" name="email"
                                    value={this.state.email || ''}
                                    onChange={this.onChange}
                                    placeholder="请输入用户名/邮箱"
                                    error={errors.email}
                                    info="我们使用了gravatar全球公认头像, 如果需要有头像显示, 请使用在gravatar注册的邮箱"
                                />
                                <TextFieldGroup
                                    type="password" name="password"
                                    value={this.state.password || ''}
                                    onChange={this.onChange}
                                    placeholder="请输入密码"
                                    error={errors.password}
                                />
                                <TextFieldGroup
                                    type="password" name="password2"
                                    value={this.state.password2 || ''}
                                    onChange={this.onChange}
                                    placeholder="请确认密码"
                                    error={errors.password2}
                                />

                                <input type="submit" className="btn btn-info btn-block mt-4" />

                            </form>
                        </div>
                    </div>
                </div>
            </div >

        )
    }
}
Register.protoTypes = {
    registerUser: PropTypes.func.isRequired,
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
    { registerUser } //mapDispatchToProps
)(withRouter(Register))

