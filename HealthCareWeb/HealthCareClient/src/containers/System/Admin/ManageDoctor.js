import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select'
// import { map, toFinite } from 'lodash';
import { getDetailInforDoctorService } from '../../../services/userService';

const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //save to markdown
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            listDoctors: [],
            hasOldData: false,

            //save to doctor infor
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],

            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedClinic: '',
            selectedSpecialty: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
            clinicId: '',
            specialtyId: ''
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctorRedux();
        this.props.fetchRequiredDoctorInforRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buidDataInputSelect(this.props.allDoctors, 'USERS')
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buidDataInputSelect(this.props.allDoctors, 'USERS');
            let { resPayment, resPrice, resProvince, resSpecialty, resClinic } = this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.buidDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buidDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buidDataInputSelect(resProvince, 'PROVINCE');
            let dataSelectSpecialty = this.buidDataInputSelect(resSpecialty, 'SPECIALTY');
            let dataSelectClinic = this.buidDataInputSelect(resClinic, 'CLINIC');
            this.setState({
                listDoctors: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic
            })
        }

        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPayment, resPrice, resProvince, resSpecialty, resClinic } = this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.buidDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buidDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buidDataInputSelect(resProvince, 'PROVINCE');
            let dataSelectSpecialty = this.buidDataInputSelect(resSpecialty, 'SPECIALTY');
            let dataSelectClinic = this.buidDataInputSelect(resClinic, 'CLINIC');
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic
            })
        }

    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;
        this.props.saveDetailDoctorRedux({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            actions: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
            specialtyId: this.state.selectedSpecialty.value
        })
    }

    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let { listPrice, listPayment, listProvince, listSpecialty, listClinic } = this.state;
        let res = await getDetailInforDoctorService(selectedDoctor.value);
        if (res && res.errCode === 0) {
            let markdown = res.data.Markdown ? res.data.Markdown : "";
            let addressClinic = '', nameClinic = '', clinicId = '', note = '', paymentId = '', priceId = '',
                provinceId = '', specialtyId = '', selectedPayment = '', selectedPrice = '',
                selectedProvince = '', selectedSpecialty = '', selectedClinic = '';

            if (res.data.DoctorInfor) {
                addressClinic = res.data.DoctorInfor.addressClinic;
                nameClinic = res.data.DoctorInfor.nameClinic;
                note = res.data.DoctorInfor.note;

                paymentId = res.data.DoctorInfor.paymentId;
                priceId = res.data.DoctorInfor.priceId;
                provinceId = res.data.DoctorInfor.provinceId;
                specialtyId = res.data.DoctorInfor.specialtyId;
                clinicId = res.data.DoctorInfor.clinicId;

                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                })
                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })
                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })

                selectedSpecialty = listSpecialty.find(item => {
                    return item && item.value === specialtyId
                })

                selectedClinic = listClinic.find(item => {
                    return item && item.value === clinicId
                })

                this.setState({
                    contentHTML: markdown.contentHTML ? markdown.contentHTML : "",
                    contentMarkdown: markdown.contentMarkdown ? markdown.contentMarkdown : "",
                    description: markdown.description ? markdown.description : "",
                    hasOldData: true,
                    addressClinic: addressClinic,
                    nameClinic: nameClinic,
                    note: note,
                    selectedPayment: selectedPayment,
                    selectedPrice: selectedPrice,
                    selectedProvince: selectedProvince,
                    selectedSpecialty: selectedSpecialty,
                    selectedClinic: selectedClinic
                })
            }
            else {
                this.setState({
                    contentHTML: '',
                    contentMarkdown: '',
                    description: '',
                    hasOldData: false,
                    addressClinic: '',
                    nameClinic: '',
                    note: '',
                    selectedPrice: '',
                    selectedPayment: '',
                    selectedProvince: '',
                    selectedClinic: '',
                    selectedSpecialty: '',
                })
            }
        }
    }

    handleChangeSelectDoctorInfor = async (selectedOption, name) => { // selectedOption and name return by library
        let stateCopy = { ...this.state };
        let stateName = name.name;
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy
        })
    }



    buidDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object);
                    return result;
                })
            }

            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi} VND`;
                    let labelEn = `${item.valueEn} USD`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object);
                    return result;
                })
            }

            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelEn = item.valueEn;
                    let labelVi = item.valueVi;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object);
                    return result;
                })
            }

            if (type === 'SPECIALTY') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelEn = item.nameEn;
                    let labelVi = item.nameVi;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object);
                    return result;
                })
            }

            if (type === 'CLINIC') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelEn = item.nameEn;
                    let labelVi = item.nameVi;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object);
                    return result;
                })
            }
        }
        return result;
    }

    render() {
        let { hasOldData } = this.state;
        return (
            <>
                <div className='manage-doctor-container'>
                    <div className='manage-doctor-title'>
                        <FormattedMessage id='admin.manage-doctor.title' />
                    </div>
                    <div className='more-info'>
                        <div className='content-left form-group'>
                            <label> <FormattedMessage id='admin.manage-doctor.select-doctor' /></label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                                placeholder={<FormattedMessage id='admin.manage-doctor.select-doctor' />}
                            />
                        </div>
                        <div className='content-right form-group'>
                            <label><FormattedMessage id='admin.manage-doctor.intro' /></label>
                            <textarea className='form-control' rows="2"
                                onChange={(event) => this.handleOnChangeText(event, 'description')}
                                value={this.state.description}
                            ></textarea>
                        </div>
                    </div>

                    <div className='more-infor-extra row'>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id='admin.manage-doctor.select-price' /></label>
                            <Select
                                value={this.state.selectedPrice}
                                onChange={this.handleChangeSelectDoctorInfor}
                                options={this.state.listPrice}
                                placeholder={<FormattedMessage id='admin.manage-doctor.select-price' />}
                                name='selectedPrice'
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id='admin.manage-doctor.select-payment-method' /></label>
                            <Select
                                value={this.state.selectedPayment}
                                onChange={this.handleChangeSelectDoctorInfor}
                                name='selectedPayment'
                                options={this.state.listPayment}
                                placeholder={<FormattedMessage id='admin.manage-doctor.select-payment-method' />}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id='admin.manage-doctor.select-province' /></label>
                            <Select
                                value={this.state.selectedProvince}
                                onChange={this.handleChangeSelectDoctorInfor}
                                name='selectedProvince'
                                options={this.state.listProvince}
                                placeholder={<FormattedMessage id='admin.manage-doctor.select-province' />}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id='admin.manage-doctor.select-specialty' /></label>
                            <Select
                                value={this.state.selectedSpecialty}
                                onChange={this.handleChangeSelectDoctorInfor}
                                name='selectedSpecialty'
                                options={this.state.listSpecialty}
                                placeholder={<FormattedMessage id='admin.manage-doctor.select-specialty' />}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id='admin.manage-doctor.select-clinic' /></label>
                            <Select
                                value={this.state.selectedClinic}
                                onChange={this.handleChangeSelectDoctorInfor}
                                name='selectedClinic'
                                options={this.state.listClinic}
                                placeholder={<FormattedMessage id='admin.manage-doctor.select-clinic' />}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id='admin.manage-doctor.clinic-name' /></label>
                            <input className='form-control'
                                onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
                                value={this.state.nameClinic}
                            >
                            </input>
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id='admin.manage-doctor.clinic-address' /></label>
                            <input className='form-control'
                                onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
                                value={this.state.addressClinic}
                            >
                            </input>
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id='admin.manage-doctor.note' /></label>
                            <input className='form-control'
                                onChange={(event) => this.handleOnChangeText(event, 'note')}
                                value={this.state.note}
                            >
                            </input>
                        </div>
                    </div>

                    <div className='manage-doctor-editor'>
                        <MdEditor
                            style={{ height: '500px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.contentMarkdown}
                        />
                    </div>
                    <button className={hasOldData === true ? 'save-content-doctor' : 'create-content-doctor'}
                        onClick={() => this.handleSaveContentMarkdown()}>
                        {hasOldData === true ?
                            <span><FormattedMessage id='admin.manage-doctor.save' /> </span> : <span><FormattedMessage id='admin.manage-doctor.create' /> </span>
                        }
                    </button>
                </div>
            </>

        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
        fetchRequiredDoctorInforRedux: () => dispatch(actions.fetchRequiredDoctorInfor()),
        saveDetailDoctorRedux: (data) => dispatch(actions.saveDetailDoctor(data))
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);