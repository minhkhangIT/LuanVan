import React, { Component } from 'react';
import { connect } from "react-redux";
import { postVerifyBookAppointment } from "../../services/userService";
import HomeHeader from '../HomePage/HomeHeader';
import './VerifyEmail.scss';
import { FormattedMessage } from 'react-intl';

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: false
        }
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            const urlParams = new URLSearchParams(this.props.location.search);
            const token = urlParams.get('token');
            const doctorId = urlParams.get('doctorId');
            let res = await postVerifyBookAppointment({
                token: token,
                doctorId: doctorId
            })
            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                })
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        let { statusVerify, errCode } = this.state;
        return (
            <>
                <HomeHeader />
                <div className='vetify-email-container'>
                    {statusVerify === false ?
                        <div className='infor-booking' >Loading data...</div>
                        :
                        <div>
                            {
                                errCode === 0 ?
                                    <div className='infor-booking'><FormattedMessage id="doctor.manage-booking.booking-success" /></div>
                                    :
                                    <div className='infor-booking' ><FormattedMessage id="doctor.manage-booking.booking-failed" /> </div>
                            }
                        </div>
                    }
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
