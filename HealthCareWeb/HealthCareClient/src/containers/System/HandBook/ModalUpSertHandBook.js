import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import { connect } from 'react-redux';
import { CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import './ModalUpSertHandBook.scss'
import 'react-image-lightbox/style.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
const mdParser = new MarkdownIt();
class ModalUpSertHandBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            nameVi: '',
            nameEn: '',
            previewImgURL: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            dataHandBookEdit: {}
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataHandBookEdit !== this.props.dataHandBookEdit) {
            if (this.props.action === "EDIT") {
                let { dataHandBookEdit } = this.props
                this.handleEditHandBookFromParent(dataHandBookEdit)
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

    handleEditHandBookFromParent = (handbook) => {
        let imageBase64 = '';
        if (handbook.image) {
            imageBase64 = Buffer.from(handbook.image, 'base64').toString('binary');
        }
        this.setState({
            nameVi: handbook.nameVi,
            nameEn: handbook.nameEn,
            descriptionHTML: handbook.descriptionHTML,
            descriptionMarkdown: handbook.descriptionMarkdown,
            previewImgURL: imageBase64,
            imageBase64: imageBase64,
            id: handbook.id
        })
    }

    setStateDefault = () => {
        this.setState({
            id: '',
            nameVi: '',
            nameEn: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            previewImgURL: '',
        })
    }

    toggle = () => {
        this.props.toggleHandBookModal()
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


    handleSaveHandBook = async () => {
        if (this.state.id === '') {
            this.props.createNewHandBook(this.state)
            this.setStateDefault()
        } else {
            this.props.updateHandBook(this.state)
            this.props.toggleHandBookModal()
        }

    }

    handleCancelHandBook = () => {
        this.props.toggleHandBookModal()
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
                    <ModalHeader toggle={() => { this.toggle() }} ><FormattedMessage id="handbook.add" /></ModalHeader>
                    <ModalBody >
                        <div className='user-redux-body'>
                            <div className='user-container'>
                                <div className='all-handbook row'>
                                    <div className='col-6 form-group'>
                                        <label><FormattedMessage id="manage-handbook.name-vi" /></label>
                                        <input type='text' className='form-control'
                                            value={this.state.nameVi}
                                            onChange={(event) => this.handleOnChangeInput(event, 'nameVi')}
                                        >
                                        </input>
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label><FormattedMessage id="manage-handbook.name-en" /></label>
                                        <input type='text' className='form-control'
                                            value={this.state.nameEn}
                                            onChange={(event) => this.handleOnChangeInput(event, 'nameEn')}
                                        >
                                        </input>
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label><FormattedMessage id="manage-handbook.image" /></label>
                                        <br />
                                        <label className='label-upload' htmlFor='img'><i className="fas fa-camera"></i></label>
                                        <input type='file' className='form-control-file' id="img" style={{ display: "none" }}
                                            onChange={(event) => this.handleOnchangImage(event)}
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
                                        <label><FormattedMessage id="manage-handbook.content" /></label>
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
                        <Button color="secondary" className='px-3' onClick={() => this.handleCancelHandBook()}><FormattedMessage id="btn.cancel" /></Button>
                        <Button color="primary" className='px-3 ' onClick={() => this.handleSaveHandBook()}> <FormattedMessage id="btn.save" /></Button>{' '}
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
        updateHandBook: (data) => dispatch(actions.updateHandBook(data)),
        createNewHandBook: (data) => dispatch(actions.createNewHandBook(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUpSertHandBook);
