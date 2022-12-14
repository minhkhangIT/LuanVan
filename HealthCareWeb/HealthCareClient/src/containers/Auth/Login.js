import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { handleLoginAPI } from '../../services/userService'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errMessage: '',
            isShowPassword: false
        }
    }

    handleOnChangeInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginAPI(this.state.email, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }

            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
            }

        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    console.log(error.response.data);
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
        }
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleFoCus = () => {
        this.setState({
            errMessage: ''
        })
    }

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.handleLogin();
        }
    }

    render() {

        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-center text-login">Login</div>
                        <div className="col-12 form-group login-input">
                            <label>Email:</label>
                            <input type="text" className="form-control " placeholder="Enter your email" value={this.state.username} onChange={(event) => this.handleOnChangeInput(event)} name="email" onFocus={() => this.handleFoCus()}></input>
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Password:</label>
                            <div className="custom-input-password">
                                <input
                                    className="form-control"
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnChangeInput(event)}
                                    onFocus={() => this.handleFoCus()} name="password"
                                    onKeyDown={(event) => this.handleKeyDown(event)}
                                >
                                </input>
                                <span onClick={() => this.handleShowHidePassword()}>
                                    <i className={this.state.isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                                </span>
                            </div>
                            <div className="col-12 errMessage" style={{ color: 'red' }}>
                                {this.state.errMessage}
                            </div>
                            <div className="col-12">
                                <button className="btn-login" onClick={() => this.handleLogin()}>Login</button>
                            </div>
                            {/* <div className="col-12 ">
                                <span className="forgot-password">Forgot your password?</span>
                            </div>
                            <div className="col-12 text-center text-other-login">
                                <span>Or login with</span>
                            </div>
                            <div className="col-12 social-login">
                                <i className="fab fa-google google"></i>
                                <i className="fab fa-facebook-f facebook"></i>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
