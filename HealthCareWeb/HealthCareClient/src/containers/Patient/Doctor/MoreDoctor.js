import React, { Component } from 'react';
import { connect } from "react-redux";
import './MoreDoctor.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import * as actions from '../../../store/actions';
import avatar_default from '../../../assets/images/avatar_default.png'
import { LANGUAGES } from '../../../utils';
import ReactSpinner from 'react-bootstrap-spinner'

class MoreDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            arrDoctors: [],
            search: ''
        }
    }

    componentDidMount() {
        this.props.loadTopDoctor('');
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux,
                loading: false
            })
        }
        if (prevState.search !== this.state.search) {
            this.setState({
                loading: true
            })
            this.props.loadTopDoctor(this.state.search)
        }
    }

    handleViewDetailDoctor = (doctor) => {
        this.props.history.push(`/detail-doctor/${doctor.id}`)
    }

    handleOnChangeInput = (event) => {
        this.setState({
            search: event.target.value
        })
    }

    handleOnClickDelSearch = () => {
        this.setState({
            search: ''
        })
    }

    render() {
        let { language } = this.props
        let { arrDoctors, loading, search } = this.state
        let placeHolder = language === LANGUAGES.VI ? 'Tìm bác sĩ' : 'Search doctors'
        return (
            <>
                {loading === true &&
                    <div className='loading'> <ReactSpinner type="border" color="primary" size="3" /></div>
                }
                <HomeHeader />
                <div className='search'>
                    <i className="fas fa-search"></i>
                    <input type='text' placeholder={placeHolder} value={search} onChange={(event) => this.handleOnChangeInput(event)} />
                    {search !== '' &&
                        <i className="fas fa-times" onClick={() => this.handleOnClickDelSearch()}></i>
                    }
                </div>
                {loading === false &&
                    <div className='more-doctor-container'>
                        <div className='content'>
                            {arrDoctors && arrDoctors.length > 0 ?
                                arrDoctors.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                                    }
                                    return (
                                        <div className='doctor-detail' key={item.id}>
                                            <div className='img'
                                                style={{ backgroundImage: `url(${imageBase64 !== '' ? imageBase64 : avatar_default})` }}
                                                onClick={() => this.handleViewDetailDoctor(item)}
                                            ></div>
                                            <div className='name'>
                                                <div className='name-doctor'  style={{color:"red",fontSize:'1.3rem'}}>
                                                    {language === LANGUAGES.VI && item.positionData ? item.positionData.valueVi : item.positionData.valueEn} ||
                                                    {language === LANGUAGES.VI ? item.lastName + ' ' + item.firstName : item.firstName + ' ' + item.lastName}</div>
                                                <div className='name-specialty'>
                                                    {item.DoctorInfor.dataSpecialty &&
                                                        <div>{language === LANGUAGES.VI ? item.DoctorInfor.dataSpecialty.nameVi : item.DoctorInfor.dataSpecialty.nameEn}</div>
                                                    }
                                                </div>
                                            </div>

                                        </div>
                                    )
                                })
                                :
                                <div className='doctor-detail-null'>Không tìm thấy bác sĩ !</div>
                            }
                        </div>
                    </div>
                }
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        topDoctorsRedux: state.admin.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctor: (by) => dispatch(actions.fetchTopDoctor(by))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoreDoctor);
