import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile, clearCurrentProfile, deleteAccount } from '../../actions/profileAction';
import Spinner from '../../common/Spinner';
import { Link } from 'react-router-dom';
import ProfileActives from './ProfileActives';
import Experience from './Experience';
import Education from './Education';

class DashBoard extends Component {
    componentDidMount() {
        //action
        this.props.getCurrentProfile();
    }
    onDeleteClick(e) {
        this.props.deleteAccount();
    }
    render() {
        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;

        let dashboardContent;
        if (profile === null || loading) {
            dashboardContent = <Spinner />
        } else {
            // dashboardContent = <h4>helloworld!</h4>
            if (Object.keys(profile).length > 0) {
                dashboardContent = <div>
                    <p className="lead text-muted">
                        Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
                    </p>
                    <ProfileActives />
                    {/*个人履历和教育经历*/}
                    <Experience experience={profile.experience} />

                    <Education education={profile.education} />
                    {/*删除个人信息按钮*/}
                    <div style={{ marginBottom: '60px' }}></div>
                    <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">删除当前账户信息</button>
                </div>
            } else {
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">欢迎{user.name}</p>
                        <p>没有任何用户信息，请添加一些用户信息</p>
                        <Link className="btn btn-lg btn-info" to="/create-profile">创建用户信息</Link>
                    </div>
                )
            }
        }
        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">Dashboard</h1>
                            {dashboardContent}
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}
DashBoard.protoTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}
// export default Register; 
//connect (mapStateToProps,mapDispatchToProps)
// 将状态映射为属性
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(DashBoard);
