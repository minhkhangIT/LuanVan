import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss';
// import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select'
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientForDoctor, getAllDoctorService, sendRemedyService, getAllCodeService, handleDeleteBooking } from '../../../services/userService'
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import RemedyModal from './RemedyModal';
import MedicalHistoryModal from './MedicalHistoryModal';
import { toast } from 'react-toastify';
class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: '',
            arrDoctorId: [],
            doctorIdSelected: 'ALL',
            statusSelected: 'S1',
            search: '',
            dataPatient: [],
            isOpenModalRemedy: false,
            isOpenMedicalHistoryModal: false,
            dataModalRemedy: {},
            loading: false,
            arrStatus: [],
            patientAccountId: ''
        }
    }

    async componentDidMount() {
        let { language } = this.props
        let status = await getAllCodeService("STATUS");
        let arrStatus = []
        if (status && status.errCode === 0 && status.data.length > 0) {
            status.data.map((item, index) => {
                let object = {}
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn
                object.value = item.id
                arrStatus.push(object)
                return arrStatus
            })
        }
        let listDoctor = await getAllDoctorService()
        listDoctor.data.unshift({
            lastName: "",
            firstName: this.props.language === LANGUAGES.VI ? "Tất cả" : "All",
            id: "ALL",
        })
        let arrDoctor = []
        if (listDoctor && listDoctor.errCode === 0 && listDoctor.data.length > 0) {
            listDoctor.data.map((item, index) => {
                let object = {}
                object.label = item.lastName + ` ` + item.firstName
                object.value = item.id
                arrDoctor.push(object)
                return arrDoctor
            })
        }
        this.setState({
            doctorIdSelected: arrDoctor[0],
            arrDoctorId: arrDoctor ? arrDoctor : [],
            arrStatus: arrStatus ? arrStatus : [],
            statusSelected: arrStatus[0]
        })
        let { currentDate, doctorIdSelected, statusSelected, search } = this.state;
        let formattedDate = ''
        if (currentDate !== '') {
            formattedDate = new Date(currentDate).getTime()
        }
        this.getDataPatient(doctorIdSelected.value, formattedDate, statusSelected.value, search)
    }

    getDataPatient = async (doctorId, formattedDate, status, search) => {
        let res = await getAllPatientForDoctor({
            doctorId: doctorId,
            date: formattedDate,
            status: status,
            search: search
        })
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            let { language } = this.props
            let status = await getAllCodeService("STATUS");
            let arrStatus = []
            if (status && status.errCode === 0 && status.data.length > 0) {
                status.data.map((item, index) => {
                    let object = {}
                    object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn
                    object.value = item.id
                    arrStatus.push(object)
                    return arrStatus
                })
            }
            let listDoctor = await getAllDoctorService()
            listDoctor.data.unshift({
                lastName: "",
                firstName: this.props.language === LANGUAGES.VI ? "Tất cả" : "All",
                id: "ALL",
            })
            let arrDoctor = []
            if (listDoctor && listDoctor.errCode === 0 && listDoctor.data.length > 0) {
                listDoctor.data.map((item, index) => {
                    let object = {}
                    object.label = item.lastName + ` ` + item.firstName
                    object.value = item.id
                    arrDoctor.push(object)
                    return arrDoctor
                })
            }
            this.setState({
                doctorIdSelected: arrDoctor[0],
                arrDoctorId: arrDoctor ? arrDoctor : [],
                arrStatus: arrStatus ? arrStatus : [],
                statusSelected: arrStatus[0]
            })
            let { currentDate, doctorIdSelected, statusSelected, search } = this.state;
            let formattedDate = ''
            if (currentDate !== '') {
                formattedDate = new Date(currentDate).getTime()
            }
            this.getDataPatient(doctorIdSelected.value, formattedDate, statusSelected.value, search)
        }
    }

    handleChangeDatePicker = (date) => {
        if (date.length === 1) {
            this.setState({
                currentDate: date[0]
            }, () => {
                let { currentDate, doctorIdSelected, statusSelected, search } = this.state;
                let formattedDate = new Date(currentDate).getTime()
                this.getDataPatient(doctorIdSelected.value, formattedDate, statusSelected.value, search)
            })
        }
    }

    handleConfirm = (item) => {
        let data = {
            bookingId: item.id,
            doctorId: item.doctorId,
            email: item.emailPatient,
            timeType: item.timeType,
            patientName: item.fullNamePatient
        }
        this.setState({
            isOpenModalRemedy: true,
            dataModalRemedy: data
        })
    }

    handleDetailMedicalHistory = (item) => {
        this.setState({
            patientAccountId: item.patientAccountId,
            isOpenMedicalHistoryModal: true
        })
    }

    handleDeleteSchedule = async (item) => {
        let res = await handleDeleteBooking(item.id)
        if (res && res.errCode === 0) {
            toast.success(res.message)
            let { currentDate, doctorIdSelected, statusSelected, search } = this.state;
            let formattedDate = ''
            if (currentDate !== '') {
                formattedDate = new Date(currentDate).getTime()
            }
            this.getDataPatient(doctorIdSelected.value, formattedDate, statusSelected.value, search)
        } else {
            if (res && res.errCode !== 0) {
                toast.error(res.errMessage)
            }
        }
    }


    closeModalRemedy = () => {
        this.setState({
            isOpenModalRemedy: false,
            dataModalRemedy: {},
            loading: false
        })
    }

    closeMedicalHistoryModal = () => {
        this.setState({
            isOpenMedicalHistoryModal: false,
        })
    }

    handleChangeSelectDoctor = (doctorIdSelected) => {
        this.setState({ doctorIdSelected }, async () => {
            let { currentDate, doctorIdSelected, statusSelected, search } = this.state;
            let formattedDate = ''
            if (currentDate !== '') {
                formattedDate = new Date(currentDate).getTime()
            }
            this.getDataPatient(doctorIdSelected.value, formattedDate, statusSelected.value, search)
        });
    }

    handleChangeSelectStatus = (statusSelected) => {
        this.setState({ statusSelected }, async () => {
            let { currentDate, doctorIdSelected, statusSelected, search } = this.state;
            let formattedDate = ''
            if (currentDate !== '') {
                formattedDate = new Date(currentDate).getTime()
            }
            this.getDataPatient(doctorIdSelected.value, formattedDate, statusSelected.value, search)
        });
    }

    sendRemedy = async (dataChildFromModal) => {
        this.setState({
            loading: true
        })
        let reExaminationDate = ''
        let { dataModalRemedy } = this.state
        if(dataChildFromModal.reExaminationDate){
            const [year, month, day] = (dataChildFromModal.reExaminationDate).split('-');
            reExaminationDate = [day,month,year].join('/');
        }
        let res = await sendRemedyService({
            email: dataChildFromModal.email,
            imgBase64: dataChildFromModal.image,
            doctorId: dataModalRemedy.doctorId,
            bookingId: dataModalRemedy.bookingId,
            timeType: dataModalRemedy.timeType,
            language: this.props.language,
            patientName: dataModalRemedy.patientName,
            diagnostic: dataChildFromModal.diagnostic,
            advice: dataChildFromModal.advice,
            prescription: dataChildFromModal.prescription,
            reExaminationDate: reExaminationDate

        })
        if (res.errCode === 0) {
            toast.success("Send remedy success")
            this.closeModalRemedy()
            let { currentDate, doctorIdSelected, statusSelected, search } = this.state;
            let formattedDate = ''
            if (currentDate !== '') {
                formattedDate = new Date(currentDate).getTime()
            }
            this.getDataPatient(doctorIdSelected.value, formattedDate, statusSelected.value, search)
        } else {
            toast.error("Send remedy fail")
            this.setState({
                loading: false
            })
        }
    }

    handleClearDateSearch = () => {
        this.setState({
            currentDate: ''
        })
        let { doctorIdSelected, statusSelected, search } = this.state;
        this.getDataPatient(doctorIdSelected.value, '', statusSelected.value, search)
    }

    handleOnChangeInputSearch = (event, name) => {
        let stateCopy = { ...this.state };
        stateCopy[name] = event.target.value;
        this.setState({
            ...stateCopy
        })
        let { currentDate, doctorIdSelected, statusSelected } = this.state;
        let formattedDate = ''
        if (currentDate !== '') {
            formattedDate = new Date(currentDate).getTime()
        }
        this.getDataPatient(doctorIdSelected.value, formattedDate, statusSelected.value, event.target.value)
    }

    render() {
        let { dataPatient, arrDoctorId, arrStatus, statusSelected } = this.state
        let { language } = this.props
        let placeholder = language === LANGUAGES.VI ? 'Nhập số điện thoại bệnh nhân...' : "Enter patient phone number..."
        return (
            <>
                <div className='manage-patient-container'>
                    <div className='manage-patient-title'>
                        <FormattedMessage id="manage-patient.title" />
                    </div>
                    <div className='manage-patient-body row'>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id="manage-patient.choose-date" /></label>
                            <div className="form-control date-picker-box">
                                <DatePicker
                                    className="date-picker"
                                    onChange={this.handleChangeDatePicker}
                                    value={this.state.currentDate}
                                />
                                <div className='icon-clear' onClick={() => this.handleClearDateSearch()}><i className="fas fa-eraser" title='Xóa'></i></div>
                            </div>
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id="manage-patient.choose-doctor" /></label>
                            <Select
                                value={this.state.doctorIdSelected}
                                onChange={this.handleChangeSelectDoctor}
                                options={arrDoctorId}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id="manage-patient.choose-status" /></label>
                            <Select
                                value={this.state.statusSelected}
                                onChange={this.handleChangeSelectStatus}
                                options={arrStatus}
                            />
                        </div>

                        <div className='col-12 '>
                            <div className='search-box'>
                                <div className='col-1'><FormattedMessage id="manage-patient.search" />:</div>
                                <input type='text' className='form-control col-3'
                                    placeholder={placeholder}
                                    value={this.state.search}
                                    onChange={(event) => this.handleOnChangeInputSearch(event, 'search')}
                                >
                                </input>
                            </div>
                        </div>

                        <div className='col-12 my-5'>
                            <table id="table-manage-patient">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th><FormattedMessage id="table.date" /></th>
                                        <th><FormattedMessage id="table.time" /></th>
                                        <th><FormattedMessage id="manage-patient.name-doctor" /></th>
                                        <th><FormattedMessage id="manage-patient.phone-doctor" /></th>
                                        <th><FormattedMessage id="manage-patient.name-patient" /></th>
                                        <th><FormattedMessage id="manage-patient.gender-patient" /></th>
                                        <th><FormattedMessage id="manage-patient.phone-patient" /></th>
                                        <th><FormattedMessage id="manage-patient.email-patient" /></th>
                                        <th><FormattedMessage id="manage-patient.address-patient" /></th>
                                        <th><FormattedMessage id="manage-patient.reason" /></th>
                                        {statusSelected && statusSelected.value === "S2"
                                            && <th><FormattedMessage id="table.actions" /></th>
                                        }
                                        <th><FormattedMessage id="table.delete" /></th>
                                        {statusSelected && (statusSelected.value === "S2" || statusSelected.value === "S3") &&
                                            <th><FormattedMessage id="table.medical-history" /></th>
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    <>
                                        {dataPatient && dataPatient.length > 0 &&
                                            dataPatient.map((item, index) => {
                                                let gender = language === LANGUAGES.VI ? item.genderDataPatient.valueVi : item.genderDataPatient.valueEn
                                                let time = language === LANGUAGES.VI ? item.timeTypeDataBooking.valueVi : item.timeTypeDataBooking.valueEn
                                                return (
                                                    <tr key={item.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{moment.unix(item.date / 1000).locale('en').format('DD/MM/YYYY')}</td>
                                                        <td>{time}</td>
                                                        <td>{item.DoctorDataBooking.lastName} {item.DoctorDataBooking.firstName}</td>
                                                        <td>{item.DoctorDataBooking.phoneNumber} </td>
                                                        <td>{item.fullNamePatient}</td>
                                                        <td>{gender}</td>
                                                        {this.state.search === item.phoneNumberPatient ?
                                                            <td style={{ color: 'red' }}> {item.phoneNumberPatient}</td>
                                                            :
                                                            <td>{item.phoneNumberPatient}</td>
                                                        }

                                                        <td>{item.emailPatient}</td>
                                                        <td>{item.addressPatient}</td>
                                                        <td>{item.reason}</td>
                                                        {statusSelected && statusSelected.value === "S2" &&
                                                            <td>
                                                                <button className='btn-edit' onClick={() => this.handleConfirm(item)}><i className="fas fa-clipboard-check" title='xác nhận đã khám'></i> </button>
                                                            </td>
                                                        }
                                                        <td>
                                                            <button className='btn-delete' onClick={() => this.handleDeleteSchedule(item)}><i className="fas fa-trash" title='Xóa'></i></button>
                                                        </td>
                                                        {statusSelected && (statusSelected.value === "S2" || statusSelected.value === "S3") &&
                                                            <td>

                                                                <button className='btn-edit' onClick={() => this.handleDetailMedicalHistory(item)}><i className="fas fa-money-check" title='Tiền sử bệnh án'></i> </button>
                                                            </td>
                                                        }
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
                <RemedyModal
                    isOpenModalRemedy={this.state.isOpenModalRemedy}
                    dataModalRemedy={this.state.dataModalRemedy}
                    closeModalRemedy={this.closeModalRemedy}
                    loading={this.state.loading}
                    sendRemedy={this.sendRemedy}
                />
                <MedicalHistoryModal
                    isOpenMedicalHistoryModal={this.state.isOpenMedicalHistoryModal}
                    dataModalRemedy={this.state.dataModalRemedy}
                    closeModalRemedy={this.closeMedicalHistoryModal}
                    patientAccountId={this.state.patientAccountId}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
