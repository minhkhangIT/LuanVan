import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import { connect } from 'react-redux';
import { CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import './ModalUpSertClinic.scss'
import 'react-image-lightbox/style.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
const mdParser = new MarkdownIt();
class ModalUpSertClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            nameVi: '',
            nameEn: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            previewImgURL: '',
            dataClinicEdit: {}
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataClinicEdit !== this.props.dataClinicEdit) {
            if (this.props.action === "EDIT") {
                let { dataClinicEdit } = this.props
                this.handleEditClinicFromParent(dataClinicEdit)
            }
        }

        if (prevProps.action !== this.props.action) {
            if (this.props.action === "CREATE") {
                this.setStateDefault()
            }
        }

    }

    handleOnchangImage = async (event) => {
        let files = event.target.files;
        let file = files[0];
        if (file) {
            let base64 = await CommonUtils.convertBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                imageBase64: base64
            })
        }

    }

    handleOnChangeInput = (event, name) => {
        let stateCopy = { ...this.state };
        stateCopy[name] = event.target.value;
        this.setState({
            ...stateCopy
        })

    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        })
    }

    handleEditClinicFromParent = (clinic) => {
        let imageBase64 = '';
        if (clinic.image) {
            imageBase64 = Buffer.from(clinic.image, 'base64').toString('binary');
        }
        this.setState({
            nameVi: clinic.nameVi,
            nameEn: clinic.nameEn,
            address: clinic.address,
            descriptionHTML: clinic.descriptionHTML,
            descriptionMarkdown: clinic.descriptionMarkdown,
            previewImgURL: imageBase64,
            imageBase64: imageBase64,
            id: clinic.id
        })
    }

    setStateDefault = () => {
        this.setState({
            id: '',
            nameVi: '',
            nameEn: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            previewImgURL: '',
        })
    }

    toggle = () => {
        this.props.toggleClinicModal()
        if (this.props.action === "CREATE") {
            this.setStateDefault()
        }
    }

    handleOnchangeImage = async (event) => {
        let files = event.target.files;
        let file = files[0];
        if (file) {
            let base64 = await CommonUtils.convertBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                imageBase64: base64
            })
        }

    }


    handleSaveClinic = async () => {
        if (this.state.id === '') {
            this.props.createNewClinic(this.state)
            this.setStateDefault()
        } else {
            this.props.updateClinic(this.state)
            this.props.toggleClinicModal()
        }

    }

    handleCancelClinic = () => {
        this.props.toggleClinicModal()
        if (this.props.action === "CREATE") {
            this.setStateDefault()
        }
    }
    render() {
        return (
            <>
                <Modal
                    isOpen={this.props.openModal}
                    toggle={() => { this.toggle() }}
                    className={"modal-user-container"}
                    size="lg"
                    centered
                    style={{ maxWidth: '1600px', width: '80%' }}
                >
                    <ModalHeader toggle={() => { this.toggle() }} ><FormattedMessage id="clinic.add" /></ModalHeader>
                    <ModalBody >
                        <div className='user-redux-body'>
                            <div className='user-container'>
                                <div className='all-clinic row'>
                                    <div className='col-6 form-group'>
                                        <label><FormattedMessage id="clinic.name-clinic-vi" /></label>
                                        <input type='text' className='form-control'
                                            value={this.state.nameVi}
                                            onChange={(event) => this.handleOnChangeInput(event, 'nameVi')}
                                        >
                                        </input>
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label><FormattedMessage id="clinic.name-clinic-en" /></label>
                                        <input type='text' className='form-control'
                                            value={this.state.nameEn}
                                            onChange={(event) => this.handleOnChangeInput(event, 'nameEn')}
                                        >
                                        </input>
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label><FormattedMessage id="clinic.address-clinic" /></label>
                                        <input type='text' className='form-control'
                                            value={this.state.address}
                                            onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                        >
                                        </input>
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label><FormattedMessage id="clinic.image-clinic" /></label>
                                        <br />
                                        <label className='label-upload' htmlFor='img'><i className="fas fa-camera"></i></label>
                                        <input type='file' className='form-control-file' id="img" style={{ display: "none" }}
                                            onChange={(event) => this.handleOnchangeImage(event)}
                                        ></input>
                                        {
                                            this.state.previewImgURL !== '' &&
                                            <div className='preview-img'
                                                style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                            >
                                            </div>
                                        }
                                    </div>
                                    <div className='col-12'>
                                        <MdEditor
                                            style={{ height: '300px' }}
                                            renderHTML={text => mdParser.render(text)}
                                            onChange={this.handleEditorChange}
                                            value={this.state.descriptionMarkdown}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" className='px-3' onClick={() => this.handleCancelClinic()}><FormattedMessage id="btn.cancel" /></Button>
                        <Button color="primary" className='px-3 ' onClick={() => this.handleSaveClinic()}> <FormattedMessage id="btn.save" /></Button>{' '}
                    </ModalFooter>
                </Modal>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        update: state.clinic.update,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateClinic: (data) => dispatch(actions.updateClinic(data)),
        createNewClinic: (data) => dispatch(actions.createNewClinic(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUpSertClinic);
