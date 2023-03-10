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
                                <label>T??n b???nh nh??n</label>
                                <input type='email' className='form-control' value={this.props.dataModalRemedy.patientName} readOnly
                                    onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Email b???nh nh??n</label>
                                <input type='email' className='form-control' value={email} readOnly
                                    onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                />
                            </div>
                            <div className='col-12 form-group'>
                                <label>Chu???n ??o??n b???nh (<label style={{ color: 'red' }}>*</label>)</label>
                                <textarea type='text' className='form-control' value={diagnostic}
                                    placeholder='Nh???p chu???n ??o??n b???nh'
                                    onChange={(event) => this.handleOnChangeInput(event, 'diagnostic')}
                                />
                            </div>
                            <div className='col-12 form-group'>
                                <label>L???i d???n </label>
                                <textarea type='text' className='form-control' value={advice}
                                    placeholder='Nh???p l???i d???n'
                                    onChange={(event) => this.handleOnChangeInput(event, 'advice')}
                                />
                            </div>
                            <div className='col-12 form-group'>
                                <label>????n thu???c</label>
                                <textarea type='text' className='form-control' value={prescription}
                                    placeholder='Nh???p ????n thu???c'
                                    onChange={(event) => this.handleOnChangeInput(event, 'prescription')}
                                />
                            </div>
                            <div className='col-8 form-group'>
                                <label>Ng??y t??i kh??m</label>
                                <input type='date' className='form-control' value={reExaminationDate}
                                    placeholder='Nh???p ng??y t??i kh??m'
                                    onChange={(event) => this.handleOnChangeInput(event, 'reExaminationDate')}
                                />
                            </div>
                            <div className='col-4 form-group'>
                                <label htmlFor="input">Ch???n file ????n thu???c</label>
                                <div>
                                    <label className='label-upload' htmlFor='previewImg'><i className="fas fa-camera"></i>T???i ???nh</label>
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
