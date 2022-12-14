import React, { Component } from 'react';
import { connect } from "react-redux";
import './RemedyModal.scss';
import { FormattedMessage } from 'react-intl';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { CommonUtils } from "../../../utils"
import ReactSpinner from 'react-bootstrap-spinner'
class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingId: '',
            loading: false,
            email: '',
            image: '',
            diagnostic: '',
            advice: '',
            prescription: '',
            reExaminationDate: '',
            previewImgURL: '',
        }
    }

    componentDidMount() {
        if (this.props.dataModalRemedy) {
            this.setState({
                email: this.props.dataModalRemedy.email,
                bookingId: this.props.dataModalRemedy.bookingId,
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModalRemedy !== this.props.dataModalRemedy) {
            this.setState({
                email: this.props.dataModalRemedy.email,
                bookingId: this.props.dataModalRemedy.bookingId,
            })
        }
    }


    closeModalRemedy = () => {
        this.props.closeModalRemedy(this.state)
    }

    handleOnChangeInput = (event, name) => {
        let stateCopy = { ...this.state };
        stateCopy[name] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleOnchangeImage = async (event) => {
        let files = event.target.files;
        let file = files[0];
        if (file) {
            let base64 = await CommonUtils.convertBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                image: base64
            })
        }

    }


    handleSendRemedy = () => {
        this.setState ({
            bookingId: '',
            loading: false,
            email: '',
            image: '',
            diagnostic: '',
            advice: '',
            prescription: '',
            reExaminationDate: '',
            previewImgURL: '',
        })
        this.props.sendRemedy(this.state)
    }


    render() {
        let { isOpenModalRemedy, loading, closeModalRemedy } = this.props
        let { email, diagnostic, advice, prescription, reExaminationDate } = this.state
        return (
            <>
                <Modal
                    isOpen={isOpenModalRemedy}
                    className={"booking-modal-container"}
                    size="lg"
                    centered
                    backdrop={true}
                >
                    {loading === true &&
                        <div className='loading'> <ReactSpinner type="border" color="primary" size="3" /></div>
                    }
                    <ModalHeader> <FormattedMessage id="doctor.manage-booking.remedy-title" /></ModalHeader>
                    <ModalBody>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>Tên bệnh nhân</label>
                                <input type='email' className='form-control' value={this.props.dataModalRemedy.patientName} readOnly
                                    onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Email bệnh nhân</label>
                                <input type='email' className='form-control' value={email} readOnly
                                    onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                />
                            </div>
                            <div className='col-12 form-group'>
                                <label>Chuẩn đoán bệnh (<label style={{ color: 'red' }}>*</label>)</label>
                                <textarea type='text' className='form-control' value={diagnostic}
                                    placeholder='Nhập chuẩn đoán bệnh'
                                    onChange={(event) => this.handleOnChangeInput(event, 'diagnostic')}
                                />
                            </div>
                            <div className='col-12 form-group'>
                                <label>Lời dặn </label>
                                <textarea type='text' className='form-control' value={advice}
                                    placeholder='Nhập lời dặn'
                                    onChange={(event) => this.handleOnChangeInput(event, 'advice')}
                                />
                            </div>
                            <div className='col-12 form-group'>
                                <label>Đơn thuốc</label>
                                <textarea type='text' className='form-control' value={prescription}
                                    placeholder='Nhập đơn thuốc'
                                    onChange={(event) => this.handleOnChangeInput(event, 'prescription')}
                                />
                            </div>
                            <div className='col-8 form-group'>
                                <label>Ngày tái khám</label>
                                <input type='date' className='form-control' value={reExaminationDate}
                                    placeholder='Nhập ngày tái khám'
                                    onChange={(event) => this.handleOnChangeInput(event, 'reExaminationDate')}
                                />
                            </div>
                            <div className='col-4 form-group'>
                                <label htmlFor="input">Chọn file đơn thuốc</label>
                                <div>
                                    <label className='label-upload' htmlFor='previewImg'><i className="fas fa-camera"></i>Tải ảnh</label>
                                    <input className='form-control-file input' type='file' id='previewImg' style={{ display: 'none' }}
                                        onChange={(event) => this.handleOnchangeImage(event)}
                                    />
                                    {
                                        this.state.previewImgURL !== '' &&
                                        <div className='preview-img'
                                            style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        >
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='secondary' onClick={closeModalRemedy}><FormattedMessage id="doctor.manage-booking.close" /></Button>
                        <Button color='primary' onClick={() => this.handleSendRemedy()}><FormattedMessage id="doctor.manage-booking.confirm" /></Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
