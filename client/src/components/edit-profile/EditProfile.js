import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';

import TextFieldGroup from '../../common/TextFieldGroup';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup'
import SelectGroup from '../../common/SelectGroup'
import InputGroup from '../../common/InputGroup'
import { getCurrentProfile, createProfile } from '../../actions/profileAction'
import isEmpty from '../../validation/is-Empty'

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySocialInputs: false,
            errors: {},
            profile: {
                handle: '',
                company: '',
                website: '',
                location: '',
                status: '',
                skills: '',
                githubusername: '',
                bio: '',
                wechat: '',
                qq: '',
                tengxunkt: '',
                wangyikt: '',
            }
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }
    componentDidMount() {
        this.props.getCurrentProfile();
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        const { errors, profile } = nextProps;

        if (errors && errors !== prevState.errors) {
            return {
                errors
            };
        }
        if (profile && profile.profile) {
            const { wechat, qq, tengxunkt, wangyikt } = profile.profile.social;
            let newprofile = profile.profile;
            newprofile.wechat = wechat;
            newprofile.qq = qq;
            newprofile.tengxunkt = tengxunkt;
            newprofile.wangyikt = wangyikt;
            return {
                displaySocialInputs: !isEmpty(wechat) || !isEmpty(qq) || !isEmpty(tengxunkt) || !isEmpty(wangyikt),
                profile: newprofile
            }
        }

        return null;
    }
    onSubmit(e) {
        e.preventDefault();
        const { profile } = this.state;
        const profileData = {
            handle: profile.handle,
            company: profile.company,
            website: profile.website,
            location: profile.location,
            status: profile.status,
            skills: profile.skills.join(','),
            githubusername: profile.githubusername || '',
            bio: profile.bio || '',
            wechat: profile.wechat || '',
            qq: profile.qq || '',
            tengxunkt: profile.tengxunkt || '',
            wangyikt: profile.wangyikt || ''
        }
        this.props.createProfile(profileData, this.props.history);
    }
    onChange(e) {
        e.preventDefault();
        const { profile } = this.state;
        if (e.target.name === "qq" || e.target.name === "wechat" || e.target.name === "tengxunkt" || e.target.name === "wangyikt")
            profile.social[e.target.name] = e.target.value;

        profile[e.target.name] = e.target.value;
        this.setState({ profile: profile })
    }
    render() {
        const { errors, displaySocialInputs, profile } = this.state;
        const options = [
            { label: "* 请选择您的职业", value: "* 请选择您的职业" },
            { label: 'Junior Developer', value: '前端初级工程师' },
            { label: 'Senior Developer', value: '前端中级工程师' },
            { label: 'HighDeveloper', value: '前端高级工程师' },
            { label: 'Manager', value: '前端管理' },
            { label: 'backend Developer', value: '后端开发' },
            { label: 'python machine learning', value: 'Python机器学习' },
            { label: 'Other', value: '其他' }
        ];
        let socialInput;
        if (displaySocialInputs) {
            socialInput = (
                <div>
                    <InputGroup
                        placeholder="微信公众号"
                        name="wechat"
                        icon="fab fa-weixin"
                        value={profile.wechat}
                        onChange={this.onChange}
                        error={errors.wechat}
                    />

                    <InputGroup
                        placeholder="qq"
                        name="qq"
                        icon="fab fa-qq"
                        value={profile.qq}
                        onChange={this.onChange}
                        error={errors.qq}
                    />

                    <InputGroup
                        placeholder="腾讯课堂网址"
                        name="tengxunkt"
                        icon="fab fa-wechat"
                        value={profile.tengxunkt}
                        onChange={this.onChange}
                        error={errors.tengxunkt}
                    />

                    <InputGroup
                        placeholder="网易云课堂网址"
                        name="wangyikt"
                        icon="fab fa-wechat"
                        value={profile.wangyikt}
                        onChange={this.onChange}
                        error={errors.wangyikt}
                    />
                </div>
            );
        }
        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">编辑个人信息</h1>
                            <small className="d-block pb-3">* 表示必填项</small>

                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="* Profile Handle"
                                    name="handle"
                                    value={profile.handle}
                                    onChange={this.onChange}
                                    error={errors.handle}
                                    info="此处的handle是在后端接口中需要用来查询数据的, 通常是写你email的名字"
                                />
                                <SelectGroup
                                    placeholder="Status"
                                    name="status"
                                    value={profile.status}
                                    onChange={this.onChange}
                                    options={options}
                                    error={errors.status}
                                    info="请告知我们您目前所从事的岗位"
                                />
                                <TextFieldGroup
                                    placeholder="公司"
                                    name="company"
                                    value={profile.company}
                                    onChange={this.onChange}
                                    error={errors.company}
                                    info="可以是你自己的公司或者是你的在职公司"
                                />
                                <TextFieldGroup
                                    placeholder="网址"
                                    name="website"
                                    value={profile.website}
                                    onChange={this.onChange}
                                    error={errors.website}
                                    info="你公司网址或者是你在职公司网址"
                                />
                                <TextFieldGroup
                                    placeholder="坐标"
                                    name="location"
                                    value={profile.location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                    info="你所在的城市及所在区 (例如. 北京市昌平区)"
                                />
                                <TextFieldGroup
                                    placeholder="* 编程语言技能"
                                    name="skills"
                                    value={profile.skills}
                                    onChange={this.onChange}
                                    error={errors.skills}
                                    info="请使用逗号隔开你所掌握的语言 (例如: HTML,CSS,JavaScript,PHP)"
                                />
                                <TextFieldGroup
                                    placeholder="Github 用户名"
                                    name="githubusername"
                                    value={profile.githubusername}
                                    onChange={this.onChange}
                                    error={errors.githubusername}
                                    info="如果你希望将你的项目分享给大家, 可以填写你的github用户名"
                                />
                                <TextAreaFieldGroup
                                    placeholder="自我介绍"
                                    name="bio"
                                    value={profile.bio}
                                    onChange={this.onChange}
                                    error={errors.bio}
                                    info="简单介绍一下自己"
                                />
                                <div className="mb-3">
                                    <button
                                        className="btn btn-light"
                                        type="button" onClick={() => {
                                            this.setState(prevState => ({
                                                displaySocialInputs: !prevState.displaySocialInputs
                                            }))
                                        }}>
                                        添加社交帐号
                                    </button>
                                    <span className="text-muted">
                                        选项
                                    </span>
                                </div>
                                {
                                    socialInput
                                }
                                <input type="submit" value="提交" className="btn btn-info btn-block mt-4" />

                            </form>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, { getCurrentProfile, createProfile })(withRouter(EditProfile));
