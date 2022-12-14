import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss';
import { LANGUAGES } from '../../../../utils';
import { FormattedMessage } from 'react-intl';
import { Modal } from 'reactstrap'
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions'
import Select from 'react-select';
import { postPatientBookAppointment } from '../../../../services/userService'
import { toast } from 'react-toastify'
import moment from 'moment';
import ReactSpinner from 'react-bootstrap-spinner'
import validator from 'validator';

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            genders: '',
            selectedGender: '',
            doctorId: '',
            timeType: ''
        }
    }

    componentDidMount() {
        this.props.fetchGenderRedux();
    }

    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language;
        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.id;
                result.push(object);
                return result;
            })
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.dataScheduleToModal !== prevProps.dataScheduleToModal) {
            if (this.props.dataScheduleToModal && !_.isEmpty(this.props.dataScheduleToModal)) {
                this.setState({
                    doctorId: this.props.dataScheduleToModal.doctorId,
                    timeType: this.props.dataScheduleToModal.timeType
                })
            }
        }

    }

    handleOnchangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })
    }

    handleOnchangeDatePicker = (date) => {
        let d = moment.unix(date[0] / 1000).format('DD/MM/YYYY')
        this.setState({
            birthday: d
        })
    }

    handleChangeSelect = (selectedOption) => {

        this.setState({
            selectedGender: selectedOption
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['fullName', 'phoneNumber', 'email', 'address', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!validator.isMobilePhone(this.state.phoneNumber)) {
                toast.error("Phone is not valid");
                isValid = false;
                break;
            }
            if (!validator.isEmail(this.state.email)) {
                toast.error("Email is not valid");
                isValid = false;
                break;
            }

        }
        return isValid;

    }

    handleConfirmBooking = async () => {
        let timeString = this.buildTimeBooking(this.props.dataScheduleToModal);
        let doctorName = this.buildDoctorName(this.props.dataScheduleToModal);
        let validCheck = this.checkValidateInput()
        if (validCheck) {
            this.setState({
                loading: true
            })
            let res = await postPatientBookAppointment({
                fullName: this.state.fullName,
                phoneNumber: this.state.phoneNumber,
                patientAccountPhone: this.state.phoneNumber,
                email: this.state.email,
                address: this.state.address,
                reason: this.state.reason,
                date: this.props.dataScheduleToModal.date,
                birthday: this.state.birthday,
                gender: this.state.selectedGender.value,
                doctorId: this.state.doctorId,
                timeType: this.state.timeType,
                language: this.props.language,
                price: this.props.dataScheduleToModal.DoctorData.DoctorInfor.priceTypeData.valueVi,
                timeString: timeString,
                doctorName: doctorName
            })
            if (res && res.errCode === 0) {
                toast.success("Booking a new appointment success !")
                this.setState({
                    loading: false
                })
                this.props.closeBookingModal();
            } else {
                this.setState({
                    loading: false
                })
                toast.error(res.message + '!')
            }
        }
    }

    buildTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
            let date = language === LANGUAGES.VI ? moment.unix(+dataTime.date / 1000).format('DD/MM/YYYY') : moment.unix(+dataTime.date / 1000).locale('en').format('MM/DD/YYYY')
            return `${time} - ${date}`
        }
    }

    buildDoctorName = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let name = language === LANGUAGES.VI ? `${dataTime.DoctorData.lastName} ${dataTime.DoctorData.firstName}` : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;
            return name;
        }
    }
    render() {
        let { isOpenModalBooking, closeBookingModal, dataScheduleToModal } = this.props;
        let { loading } = this.state
        let doctorId = '';
        if (dataScheduleToModal && !_.isEmpty(dataScheduleToModal)) {
            doctorId = dataScheduleToModal.doctorId;
        }
        return (
            <>

                <Modal
                    isOpen={isOpenModalBooking}
                    // toggle={() => { this.toggle() }}
                    className={"booking-modal-container"}
                    size="lg"
                    centered
                    backdrop={true}
                >
                    {loading === true &&
                        <div className='loading'> <ReactSpinner type="border" color="primary" size="3" /></div>
                    }
                    <div className='booking-modal-content'>
                        <div className='booking-modal-header'>
                            <span className='left'><FormattedMessage id="patient.booking-modal.title" /></span>
                            <span className='right' onClick={closeBookingModal}><i className='fas fa-times'></i></span>
                        </div>
                        <div className='booking-modal-body'>
                            <div className='doctor-infor'>
                                <ProfileDoctor
                                    doctorId={doctorId}
                                    isShowDescriptionDoctor={false}
                                    dataScheduleToModal={dataScheduleToModal}
                                    isShowLinkDetail={false}
                                />
                            </div>

                            <div className='row'>
                                <div className='col-6 form-group'>
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.fullName" /></label>
                                    <input className='form-control'
                                        value={this.state.fullName}
                                        onChange={(event) => this.handleOnchangeInput(event, 'fullName')}
                                    />

                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.phoneNumber" /></label>
                                    <input className='form-control'
                                        value={this.state.phoneNumber}
                                        onChange={(event) => this.handleOnchangeInput(event, 'phoneNumber')} />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.email" /></label>
                                    <input className='form-control'
                                        value={this.state.email}
                                        onChange={(event) => this.handleOnchangeInput(event, 'email')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.gender" /></label>
                                    <Select
                                        value={this.state.selectedGender}
                                        onChange={this.handleChangeSelect}// callback function
                                        options={this.state.genders}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.birthday" /></label>
                                    <DatePicker
                                        onChange={this.handleOnchangeDatePicker}// callback function
                                        className="form-control"
                                        value={this.state.birthday}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.reason" /></label>
                                    <input className='form-control'
                                        value={this.state.reason}
                                        onChange={(event) => this.handleOnchangeInput(event, 'reason')}
                                    />
                                </div>
                                <div className='col-12 form-group'>
                                    <label><FormattedMessage id="patient.booking-modal.address" /></label>
                                    <input className='form-control'
                                        value={this.state.address}
                                        onChange={(event) => this.handleOnchangeInput(event, 'address')}
                                    />

                                </div>

                            </div>

                        </div>
                        <div className='booking-modal-footer'>
                            <button className='btn-booking-confirm' onClick={() => this.handleConfirmBooking()}><FormattedMessage id="patient.booking-modal.confirm" /></button>
                            <button className='btn-booking-cancel' onClick={closeBookingModal}><FormattedMessage id="patient.booking-modal.cancel" /></button>
                        </div>
                    </div>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGenderRedux: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
