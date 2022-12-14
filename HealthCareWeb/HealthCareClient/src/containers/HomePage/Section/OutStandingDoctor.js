import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router'
import avatar_default from '../../../assets/images/avatar_default.png'

class OutStandingDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrDoctors: []
        }
    }

    componentDidMount() {
        this.props.loadTopDoctor('');
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux
            })
        }
    }

    handleViewDetailDoctor = (doctor) => {
        this.props.history.push(`/detail-doctor/${doctor.id}`)
    }


    handleViewMore = () => {
        this.props.history.push(`/outstanding-doctor`)
    }

    render() {
        let arrDoctors = this.state.arrDoctors;
        let { language } = this.props;
        return (
            <div className='section-share section-outstanding-doctor' >
                <div className='section-container'>
                    <div className='section-header' onClick={() => this.handleViewMore()}>
                        <span>
                            <FormattedMessage id="homepage.outstanding-doctor" />
                        </span>
                        <button><FormattedMessage id="homepage.more-info" /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {
                                arrDoctors && arrDoctors.length > 0
                                && arrDoctors.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                                    }
                                    let nameVi = `${item.positionData.valueVi},${item.lastName} ${item.firstName}`;
                                    let nameEn = `${item.positionData.valueEn},${item.firstName} ${item.lastName}`;
                                    return (
                                        <div key={item.id} className="section-customize" onClick={() => this.handleViewDetailDoctor(item)} >
                                            <div className='customize-border border-outstanding-doctor'>
                                                <div className='outer-bg'>
                                                    <div className='bg-image section-outstanding-doctor'
                                                        style={{ backgroundImage: `url(${imageBase64 !== '' ? imageBase64 : avatar_default})` }}
                                                    ></div>
                                                </div>
                                                <div className='position text-center'>
                                                    <div className='a'>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                    {item.DoctorInfor.dataSpecialty &&
                                                        <div>{language === LANGUAGES.VI ? item.DoctorInfor.dataSpecialty.nameVi : item.DoctorInfor.dataSpecialty.nameEn}</div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        topDoctorsRedux: state.admin.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctor: (by) => dispatch(actions.fetchTopDoctor(by))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
