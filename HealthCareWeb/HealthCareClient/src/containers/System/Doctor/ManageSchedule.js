import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select'
import * as actions from "../../../store/actions";
// import { CRUD_ACTIONS, LANGUAGES, dateFormat } from '../../../utils';
import { LANGUAGES } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
// import FormattedDate from '../../../components/Formating/FormattedDate';
import { toast } from 'react-toastify';
import _ from 'lodash'
import { saveScheduleDoctorService, getDoctorHaveScheduleService, getDoctorById, getScheduleByDateService, handleDeleteSchedule } from '../../../services/userService'
class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctorsHaveSchedule: [],
            listDoctors: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: [],
            dateSearch: moment(new Date()).startOf('day').valueOf(),
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctorRedux();
        this.props.fetchAllScheduleHoursRedux();
        let dateSearch = new Date(this.state.dateSearch).getTime()
        this.getDoctorHaveSchedule(dateSearch)
    }

    getDoctorHaveSchedule = async (date) => {
        let result = []
        let res = await getDoctorHaveScheduleService(date);
        if (res && res.errCode === 0 && res.data && res.data.length > 0) {
            res.data.map(async item => {
                let doctorInfo = await getDoctorById(item.doctorId);
                let scheduleDoctor = await getScheduleByDateService(item.doctorId, date)
                if (doctorInfo && doctorInfo.errCode === 0 && scheduleDoctor && scheduleDoctor.errCode === 0) {
                    let object = {}
                    object.id = doctorInfo.data.id
                    object.firstName = doctorInfo.data.firstName
                    object.lastName = doctorInfo.data.lastName
                    object.email = doctorInfo.data.email
                    object.phone = doctorInfo.data.phoneNumber
                    object.schedule = scheduleDoctor.data
                    result.push(object)
                    this.setState({
                        listDoctorsHaveSchedule: result
                    })
                }
            });
        } else {
            this.setState({
                listDoctorsHaveSchedule: []
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.dateSearch !== this.state.dateSearch) {
            let dateSearch = new Date(this.state.dateSearch).getTime()
            await this.getDoctorHaveSchedule(dateSearch)
        }

        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime;
            if (data && data.length > 0) {
                data = data.map(item => ({
                    ...item, isSelected: false
                }))
            }
            this.setState({
                rangeTime: data
            })
        }
    }

    handleChangeSelect = (selectedDoctor) => {
        this.setState({ selectedDoctor }, async () => {
            let currentDate = new Date(this.state.currentDate).getTime()
            let scheduleDoctor = await getScheduleByDateService(selectedDoctor.value, currentDate);
            let data = this.props.allScheduleTime;
            if (data && data.length > 0) {
                data = data.map(item => ({
                    ...item, isSelected: false
                }))
            }
            if (data && data.length > 0 && scheduleDoctor && scheduleDoctor.errCode === 0 && scheduleDoctor.data.length > 0) {
                data = data.map(item => {
                    scheduleDoctor.data.forEach(schedule => {
                        if (item.id === schedule.timeType) {
                            item.isSelected = true;
                        }
                    })
                    return item
                })
            }
            this.setState({
                rangeTime: data
            })
        });
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelEn = `${item.firstName} ${item.lastName}`;
                let labelVi = `${item.lastName} ${item.firstName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
                return result;
            })
        }
        return result;
    }

    handleChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            let currentDate = new Date(date[0]).getTime()
            let scheduleDoctor = await getScheduleByDateService(this.state.selectedDoctor.value, currentDate);
            let data = this.props.allScheduleTime;
            if (data && data.length > 0) {
                data = data.map(item => ({
                    ...item, isSelected: false
                }))
            }
            if (data && data.length > 0 && scheduleDoctor && scheduleDoctor.errCode === 0 && scheduleDoctor.data.length > 0) {
                data = data.map(item => {
                    scheduleDoctor.data.forEach(schedule => {
                        if (item.id === schedule.timeType) {
                            item.isSelected = true;
                        }
                    })
                    return item
                })
            }
            this.setState({
                rangeTime: data
            })
        }
        )
    }

    handleChangeSearchByDate = (date) => {
        this.setState({
            dateSearch: date[0]
        })
    }

    handleClickButtonTime = (time) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }

    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state;
        let result = [];
        if (!currentDate) {
            toast.error("Invalid date !");
            return
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("Invalid selected doctor !");
            return
        }
        let formatedDate = currentDate.getTime();
        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(time => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formatedDate;
                    object.timeType = time.id;
                    result.push(object);
                    return result;
                })
            } else {
                toast.error("Invalid selected time !");
                return
            }
        }
        let res = await saveScheduleDoctorService({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            date: formatedDate
        })
        let dateSearch = new Date(this.state.dateSearch).getTime()
        if (res.errCode === 0) {
            toast.success("Save schedule success !");
            this.getDoctorHaveSchedule(dateSearch)
        } else {
            toast.error("Save schedule failed !");
        }
        this.getDoctorHaveSchedule(dateSearch)
    }

    handleDeleteSchedule = async (id, date) => {
        let res = await handleDeleteSchedule(id, date)
        if (res && res.errCode === 0) {
            toast.success("Delete schedule success")
            let dateSearch = new Date(this.state.dateSearch).getTime()
            this.getDoctorHaveSchedule(dateSearch)
            let currentDate = new Date(this.state.currentDate).getTime()
            if (id === this.state.selectedDoctor.value && date === currentDate) {
                let data = this.props.allScheduleTime;
                if (data && data.length > 0) {
                    data = data.map(item => ({
                        ...item, isSelected: false
                    }))
                }
                this.setState({
                    rangeTime: data
                })
            }

        } else {
            toast.error("Delete schedule failed")
        }
    }
    render() {
        let { rangeTime, listDoctorsHaveSchedule } = this.state;
        let dateSearch = new Date(this.state.dateSearch).getTime()
        let { language } = this.props;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
        return (
            <>
                <div className='manage-schedule-container'>
                    <div className='manage-schedule-title'>
                        <FormattedMessage id="manage-schedule.title" />
                    </div>
                    <div className='schedule-container'>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id="manage-schedule.choose-doctor" />
                                </label>
                                <Select
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.listDoctors}
                                />
                            </div>

                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id="manage-schedule.choose-date" />
                                </label>
                                <DatePicker
                                    className="form-control"
                                    onChange={this.handleChangeDatePicker}
                                    value={this.state.currentDate}
                                    minDate={yesterday}
                                />
                            </div>

                            <div className='col-12 pick-hour-container'>
                                {
                                    rangeTime && rangeTime.length > 0 &&
                                    rangeTime.map((item, index) => {
                                        return (
                                            <button
                                                key={index}
                                                className={item.isSelected === true ? 'btn btn-schedule active' : 'btn btn-schedule'}
                                                onClick={() => this.handleClickButtonTime(item)}
                                            >
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </button>
                                        )
                                    })
                                }
                            </div>
                            <div className='col-12'>
                                <button className='btn btn-primary btn-save-schedule'
                                    onClick={() => this.handleSaveSchedule()}
                                >
                                    <FormattedMessage id="manage-schedule.save" />
                                </button>
                            </div>

                        </div>
                        <div className='list-schedule row my-5'>
                            <div className='col-2-5 title-schedule'><FormattedMessage id="manage-schedule.titleSearch" /></div>
                            <DatePicker
                                className="form-control col-1"
                                onChange={this.handleChangeSearchByDate}
                                value={this.state.dateSearch}
                                minDate={yesterday}
                            />
                            <div className='col-12 my-4'>
                                <table id="table-schedule">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th><FormattedMessage id="table.fullName" /></th>
                                            <th><FormattedMessage id="table.phone" /></th>
                                            <th>Email</th>
                                            <th><FormattedMessage id="table.time" /></th>
                                            {/* <th><FormattedMessage id="table.actions" /></th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <>
                                            {listDoctorsHaveSchedule && listDoctorsHaveSchedule.length > 0 &&
                                                listDoctorsHaveSchedule.map((item, index) => {
                                                    return (
                                                        <tr key={item.id} >
                                                            <td>{index + 1}</td>
                                                            <td>{item.firstName} {item.lastName}</td>
                                                            <td>{item.phone}</td>
                                                            <td>{item.email}</td>
                                                            <td key={item.id}>
                                                                {item.schedule.map((item) => {
                                                                    return (
                                                                        <div key={item.id}>{language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn}</div>
                                                                    )
                                                                })}
                                                            </td>
                                                            {/* <td>
                                                                <button className='btn-delete' onClick={() => this.handleDeleteSchedule(item.id, dateSearch)}><i className="fas fa-trash"></i></button>
                                                            </td> */}
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allScheduleTime: state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
        fetchAllScheduleHoursRedux: () => dispatch(actions.fetchAllScheduleHours())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
