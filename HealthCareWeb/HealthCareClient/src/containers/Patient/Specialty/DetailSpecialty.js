import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailSpecialty.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailSpecialtyById, getAllCodeService } from '../../../services/userService'
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';
// import { LANGUAGES } from '../../../utils';
// import { FormattedMessage } from 'react-intl';

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            detailSpecialty: {},
            listProvince: [],

        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({
                currentDoctorid: id
            })
            let res = await getDetailSpecialtyById({
                id: id,
                location: 'ALL'
            });

            let resProvince = await getAllCodeService('PROVINCE')
            if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
                let arrDoctorId = [];
                let data = res.data;
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                            return arrDoctorId
                        })
                    }
                }
                let dataProvince = resProvince.data;
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        createAt: "ALL",
                        id: "ALL",
                        type: "PROVINCE",
                        valueEn: "ALL",
                        valueVi: "Toàn quốc"
                    })
                }
                this.setState({
                    detailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: dataProvince ? dataProvince : []
                })
            }
        }
    }



    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleOnchangeSelect = async (event) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let location = event.target.value;
            let res = await getDetailSpecialtyById({
                id: id,
                location: location
            });
            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                            return arrDoctorId
                        })
                    }
                }

                this.setState({
                    detailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
    }

    render() {
        let { arrDoctorId, detailSpecialty, listProvince } = this.state;
        let imageBase64 = '';
        if (detailSpecialty.image) {
            imageBase64 = Buffer.from(detailSpecialty.image, 'base64').toString('binary');
        }
        let { language } = this.props
        return (
            <>
                <HomeHeader />
                <div className='detail-specialty-container'>
                    <div className='description-specialty' >
                        <div className='a' style={{ backgroundImage: `url(${imageBase64 ? imageBase64: ''})` }}></div>
                            {detailSpecialty && !_.isEmpty(detailSpecialty) &&
                                <div dangerouslySetInnerHTML={{ __html: detailSpecialty.descriptionHTML }}></div>
                            }
                    </div>
                    <div className='search-specialty-doctor'>
                        <select onChange={(event) => this.handleOnchangeSelect(event)}>
                            {listProvince && listProvince.length > 0 &&
                                listProvince.map((item, index) => {
                                    return (
                                        <option key={item.id}
                                            value={item.id}
                                        >
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    {arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {
                            return (
                                <div className='each-doctor' key={item}>
                                    <div className='dt-content-left'>
                                        <div className='profile-doctor'>
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDescriptionDoctor={true}
                                                isShowLinkDetail={true}

                                            />
                                        </div>
                                    </div>
                                    <div className='dt-content-right'>
                                        <div className='doctor-schedule'>
                                            <DoctorSchedule
                                                detailDoctorId={item}
                                            />
                                        </div>
                                        <div className='doctor-extra-infor'>
                                            <DoctorExtraInfor
                                                detailDoctorId={item}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
