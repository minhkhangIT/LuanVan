import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import { LANGUAGES } from '../../../utils';
// import Select from 'react-select';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import { getScheduleByDateService } from '../../../services/userService'
import BookingModal from './Modal/BookingModal.js';
class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: [],
            isOpenModalBooking: false,
            dataScheduleToModal: {}
        }
    }

    async componentDidMount() {
        let { language } = this.props;
        let allDays = this.getArrayDays(language);
        this.setState({
            allDays: allDays,
        })
        if (this.props.detailDoctorId) {
            let res = await getScheduleByDateService(this.props.detailDoctorId, allDays[0].value);
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let allDays = this.getArrayDays(this.props.language);
            this.setState({
                allDays: allDays
            })
        }

        if (this.props.detailDoctorId !== prevProps.detailDoctorId) {
            let allDays = this.getArrayDays(this.props.language);
            let res = await getScheduleByDateService(this.props.detailDoctorId, allDays[0].value);
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getArrayDays = (language) => {
        let En = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        let Vi = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật']
        let arrDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`;
                    object.label = today;
                } else {

                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    for (let i = 0; i < Vi.length; i++) {
                        if (labelVi.substring(0, labelVi.indexOf("-") - 1) === En[i]) {
                            object.label = Vi[i] + labelVi.substring(labelVi.indexOf("-") - 1)
                        }
                    }
                }
            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`;
                    object.label = today;
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM');
                }
            }

            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            arrDays.push(object);
        }
        return arrDays;

    }

    handleOnChangeSelect = async (event) => {
        if (this.props.detailDoctorId && this.props.detailDoctorId !== -1) {
            let doctorID = this.props.detailDoctorId;
            let date = event.target.value
            let res = await getScheduleByDateService(doctorID, date);
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data ? res.data : []
                })
            }
        }
    }

    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleToModal: time
        })
    }

    closeBookingModal = () => {
        this.setState({
            isOpenModalBooking: false
        })
    }

    render() {
        let { allDays, allAvailableTime } = this.state;
        let { language } = this.props;
        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select onChange={(event) => this.handleOnChangeSelect(event)}>
                            {allDays && allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return (
                                        <option
                                            key={index}
                                            value={item.value}
                                        >
                                            {item.label}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='all-available-time'>
                        <div className='calendar'>
                            <i className='fas fa-calendar-alt'>
                                <span>
                                    <FormattedMessage id='schedule.title' />
                                </span>
                            </i>
                        </div>
                        <div className='time-content'>
                            {allAvailableTime && allAvailableTime.length > 0 ?
                                <>
                                    <div className='time-content-btn'>
                                        {
                                            allAvailableTime.map((item, index) => {
                                                let time = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                                return (
                                                    <button
                                                        key={index}
                                                        className={language === LANGUAGES.VI ? 'btn-Vi' : 'btn-En'}
                                                        onClick={() => this.handleClickScheduleTime(item)}
                                                    >
                                                        {time}
                                                    </button>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className='book-free'>
                                        <span><FormattedMessage id='schedule.choose' /> <i className='far fa-hand-point-up'></i> <FormattedMessage id='schedule.book-free' /></span>
                                    </div>
                                </>
                                :
                                <div className='empty-schedule'>
                                    <FormattedMessage id='schedule.empty' />
                                </div>
                            }
                        </div>

                    </div>
                </div>

                <BookingModal
                    isOpenModalBooking={this.state.isOpenModalBooking}
                    closeBookingModal={this.closeBookingModal}
                    dataScheduleToModal={this.state.dataScheduleToModal}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
