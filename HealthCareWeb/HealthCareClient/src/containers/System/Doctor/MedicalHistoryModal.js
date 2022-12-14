import React, { Component } from 'react';
import { connect } from "react-redux";
import './MedicalHistoryModal.scss';
import { FormattedMessage } from 'react-intl';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { getPrescriptionByPatientAccountId } from '../../../services/userService'
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
class MedicalHistoryModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listMedicalHistory: []
        }
    }

    componentDidMount() {
        this.getDataPrescriptionPatient(this.props.patientAccountId)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.isOpenMedicalHistoryModal !== this.props.isOpenMedicalHistoryModal && this.props.isOpenMedicalHistoryModal) {
            this.getDataPrescriptionPatient(this.props.patientAccountId)
        }

    }

    getDataPrescriptionPatient = async (id) => {
        let res = await getPrescriptionByPatientAccountId(id, "ALL")
        if (res && res.errCode === 0) {
            this.setState({
                listMedicalHistory: res.data
            })
        }
    }

    handleCloseMedicalHistoryModal = () => {
        this.props.closeModalRemedy()
    }

    render() {
        let { listMedicalHistory } = this.state
        let { language } = this.props
        let count = 0
        return (
            <>
                <Modal
                    isOpen={this.props.isOpenMedicalHistoryModal}
                    size="lg"
                    centered
                    backdrop={true}
                >

                    <ModalHeader> <FormattedMessage id="doctor.manage-booking.medical-history-title" /></ModalHeader>

                    <ModalBody>
                        <div className='container disable-scroll'>
                            {listMedicalHistory && listMedicalHistory.length > 0 &&
                                listMedicalHistory.map((item, index) => {
                                    if (item.Prescription)
                                        count = count + 1
                                    return (
                                        item.Prescription &&
                                        <div className='content-medical' key={index} >
                                            <div>
                                                <label className='label'><i className="fa fa-user icon"></i><FormattedMessage id="doctor.manage-booking.patient" />:</label>
                                                <label>{item.fullNamePatient}</label>
                                            </div>
                                            <div>
                                                <label className='label'><i className="fa fa-calendar icon"></i><FormattedMessage id="doctor.manage-booking.birthday" />:</label>
                                                <label>{item.birthdayPatient}</label>
                                            </div>
                                            <div>
                                                <label className='label'><i className="fa fa-map-marker icon"></i><FormattedMessage id="doctor.manage-booking.address" />:</label>
                                                <label>{item.addressPatient}</label>
                                            </div>
                                            <div>
                                                <label className='label'><i className="fa fa-stethoscope icon"></i><FormattedMessage id="doctor.manage-booking.diagnostic" />:</label>
                                                <label>{item.Prescription ? item.Prescription.diagnostic : ''}</label>
                                            </div>
                                            <div>
                                                <label className='label'><i className="fa fa-medkit icon"></i><FormattedMessage id="doctor.manage-booking.prescription" />:</label>
                                                <label>{item.Prescription ? item.Prescription.prescription : ''}</label>
                                            </div>
                                            <div>
                                                <label className='label'><i className="fa fa-calendar icon"></i><FormattedMessage id="doctor.manage-booking.date-booking" />:</label>
                                                <label>{moment.unix(item.date / 1000).locale('en').format('DD/MM/YYYY')}</label>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            {
                                count === 0 &&
                                <div style={{ textAlign: 'center', color: 'red', fontSize: '16px' }}>
                                    {language === LANGUAGES.VI ? "Chưa có tiền sử khám bệnh !" : "No medical history !"}
                                </div>
                            }
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button color='primary' onClick={() => this.handleCloseMedicalHistoryModal()}><FormattedMessage id="doctor.manage-booking.close" /></Button>
                    </ModalFooter>

                </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalHistoryModal);
