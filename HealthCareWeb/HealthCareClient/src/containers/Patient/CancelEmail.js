import React, { Component } from 'react';
import { connect } from "react-redux";
import { postCancelBookAppointment } from "../../services/userService";
import HomeHeader from '../HomePage/HomeHeader';
import './VerifyEmail.scss';
import { FormattedMessage } from 'react-intl';

class CancelEmail extends Component {
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
            let res = await postCancelBookAppointment({
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
                                    <div className='infor-booking'><FormattedMessage id="doctor.manage-booking.cancel-success" /></div>
                                    :
                                    <div className='infor-booking' ><FormattedMessage id="doctor.manage-booking.cancel-failed" /> </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CancelEmail);
