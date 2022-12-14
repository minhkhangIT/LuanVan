import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailClinic.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailClinicById } from '../../../services/userService'
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';
// import { LANGUAGES } from '../../../utils';
// import { FormattedMessage } from 'react-intl';

class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            detailClinic: {},
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({
                currentDoctorid: id
            })

            let res = await getDetailClinicById(id);
            if (res && res.errCode === 0) {
                let arrDoctorId = [];
                let data = res.data;
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorClinic;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                            return arrDoctorId
                        })
                    }
                }
                this.setState({
                    detailClinic: res.data,
                    arrDoctorId: arrDoctorId,
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
            let res = await getDetailClinicById({
                id: id,
                location: location
            });
            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorClinic;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                            return arrDoctorId
                        })
                    }
                }

                this.setState({
                    DetailClinic: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
    }

    render() {
        let { arrDoctorId, detailClinic } = this.state;
        let { language } = this.props
        let imageBase64 = '';
        if (detailClinic.image) {
            imageBase64 = Buffer.from(detailClinic.image, 'base64').toString('binary');
        }
        return (
            <>
                <HomeHeader />
                <div className='detail-clinic-container'>
                    <div className='a' style={{ backgroundImage: `url(${imageBase64 ? imageBase64: ''})` }}></div>
                    <div className='description-clinic'>
                        {detailClinic && !_.isEmpty(detailClinic) &&
                            <>
                                <div className='name-clinic'>{language === LANGUAGES.VI ? detailClinic.nameVi : detailClinic.nameEn}</div>
                                <div dangerouslySetInnerHTML={{ __html: detailClinic.descriptionHTML }}></div>
                            </>
                        }
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
