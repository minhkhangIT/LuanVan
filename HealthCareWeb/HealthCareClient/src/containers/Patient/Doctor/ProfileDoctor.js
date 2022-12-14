import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import './ProfileDoctor.scss';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { getProfileDoctorByIdService } from '../../../services/userService'
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';
class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }

    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId);
        this.setState({
            dataProfile: data
        })

    }


    async componentDidUpdate(prevProps, prevState, snapshot) {

    }


    getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorByIdService(id);
            if (res && res.errCode === 0) {
                result = res.data
            }
        }
        return result;
    }

    renderTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
            let date = language === LANGUAGES.VI ? this.convertDate(moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')) : moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
            return (
                <>
                    <div>{time} &emsp;{date}</div>
                </>
            )
        }
    }

    convertDate = (date) => {
        let Vi = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        let En = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật']
        for (let i = 0; i < Vi.length; i++) {
            if (date.substring(0, date.indexOf("-") - 1) === Vi[i]) {
                return En[i] + date.substring(date.indexOf("-") - 1)
            }
        }
    }

    render() {
        let { language, isShowDescriptionDoctor, dataScheduleToModal, isShowLinkDetail, doctorId } = this.props;
        let { dataProfile } = this.state;
        let nameEn = '';
        let nameVi = '';
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi},${dataProfile.lastName} ${dataProfile.firstName} `;
            nameEn = `${dataProfile.positionData.valueEn},${dataProfile.firstName} ${dataProfile.lastName} `;
        }
      
        if(dataProfile.DoctorInfor && dataProfile.DoctorInfor.dataSpecialty){
            nameVi = nameVi + " || " +dataProfile.DoctorInfor.dataSpecialty.nameVi
            nameEn = nameEn + " || " +dataProfile.DoctorInfor.dataSpecialty.nameEn
        }   
        return (
            <>
                <div className='profile-doctor-container'>
                    <div className='intro-doctor'>
                        <div className='content-left'
                            style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}
                        >
                        </div>
                        <div className='content-right'>
                            <div className='content-right-up'>
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className='content-right-down'>
                                {isShowDescriptionDoctor && isShowDescriptionDoctor === true ?
                                    <>
                                        {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description
                                            && <span>
                                                {dataProfile.Markdown.description}
                                            </span>
                                        }
                                    </>
                                    :
                                    <>
                                        {this.renderTimeBooking(dataScheduleToModal)}
                                    </>
                                }
                            </div>
                        </div>

                    </div>
                    {
                        isShowLinkDetail === true &&
                        <div className='view-detail-doctor'>
                            <Link to={`/detail-doctor/${doctorId}`}>XEM THÊM</Link>
                        </div>
                    }

                    <div className='price'>
                        <FormattedMessage id="patient.booking-modal.price" /> &nbsp;
                        {dataProfile && dataProfile.DoctorInfor && language === LANGUAGES.VI &&
                            <NumberFormat
                                value={dataProfile.DoctorInfor.priceTypeData.valueVi}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'VND'}
                                className='currency'
                            />
                        }
                        {dataProfile && dataProfile.DoctorInfor && language === LANGUAGES.EN &&

                            <NumberFormat
                                value={dataProfile.DoctorInfor.priceTypeData.valueEn}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'$'}
                                className='currency'
                            />
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
