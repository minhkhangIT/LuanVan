import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfor.scss';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
// import { getScheduleByDateService } from '../../../services/userService';
import { getExtraInforDoctorByIdService } from '../../../services/userService';
import NumberFormat from 'react-number-format';
class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: true,
            extraInfor: {}
        }
    }

    async componentDidMount() {
        if (this.props.detailDoctorId) {
            let res = await getExtraInforDoctorByIdService(this.props.detailDoctorId);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

        if (this.props.detailDoctorId !== prevProps.detailDoctorId) {
            let res = await getExtraInforDoctorByIdService(this.props.detailDoctorId);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }
    }

    handleShowDetailInfor = () => {
        this.setState({
            isShowDetailInfor: !this.state.isShowDetailInfor
        })
    }
    render() {
        let { isShowDetailInfor, extraInfor } = this.state;
        let { language } = this.props;
        return (
            <>
                <div className='doctor-extra-infor-container'>
                    <div className='doctor-extra-infor-content-up'>
                        <div className='text-address'><FormattedMessage id='patient.extra-infor-doctor.text-address' /></div>
                        <div className='name-clinic'>{extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''}</div>
                        <div className='detail-address'>{extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''}</div>
                    </div>
                    <div className='doctor-extra-infor-content-down'>
                        {isShowDetailInfor === false ?
                            <div>
                                <span className='title-price'><FormattedMessage id='patient.extra-infor-doctor.price' />: &nbsp; </span>
                                <span className='short-infor'>
                                    {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI
                                        &&
                                        <NumberFormat
                                            value={extraInfor.priceTypeData.valueVi}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'VND'}
                                            className='currency'
                                        />
                                    }
                                    {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN
                                        &&
                                        <NumberFormat
                                            value={extraInfor.priceTypeData.valueEn}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'$'}
                                            className='currency'
                                        />
                                    }
                                    <span className='link-show-doctor-extra-infor' onClick={() => this.handleShowDetailInfor()}><FormattedMessage id='patient.extra-infor-doctor.detail' /></span>
                                </span>
                            </div>
                            :
                            <>
                                <div className='detail-infor'>
                                    <div className='detail-infor-up'>
                                        <span className='left'><FormattedMessage id='patient.extra-infor-doctor.price' /></span>
                                        <span className='right'>
                                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI
                                                &&
                                                <NumberFormat
                                                    value={extraInfor.priceTypeData.valueVi}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'VND'}
                                                    className='currency'
                                                />
                                            }
                                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN
                                                &&
                                                <NumberFormat
                                                    value={extraInfor.priceTypeData.valueEn}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'$'}
                                                    className='currency'
                                                />
                                            }
                                        </span>
                                        <div className='note'>
                                            {extraInfor && extraInfor.note ? extraInfor.note : ''}
                                        </div>
                                    </div>
                                    <div className='detail-infor-down'>
                                        <FormattedMessage id='patient.extra-infor-doctor.payment' />
                                    </div>
                                    <div>

                                    </div>
                                    <div><span className='link-show-doctor-extra-infor' onClick={() => this.handleShowDetailInfor()} ><FormattedMessage id='patient.extra-infor-doctor.hide-price' /></span></div>
                                </div>

                            </>
                        }

                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
