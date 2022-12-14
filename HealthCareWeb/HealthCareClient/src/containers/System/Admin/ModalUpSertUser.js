import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import './UserRedux.scss'
import 'react-image-lightbox/style.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { toast } from 'react-toastify';
import validator from 'validator';
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
            previewImgURL: '',
            dataUserEdit: {},
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGender = this.props.genderRedux;
            this.setState({
                genderArr: arrGender,
                gender: arrGender && arrGender.length > 0 ? arrGender[0].id : ''
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositon = this.props.positionRedux;
            this.setState({
                positionArr: arrPositon,
                position: arrPositon && arrPositon.length > 0 ? arrPositon[0].id : ''
            })
        }

        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRole = this.props.roleRedux
            this.setState({
                roleArr: arrRole,
                role: arrRole && arrRole.length > 0 ? arrRole[0].id : ''
            })
        }

        if (prevProps.dataUserEdit !== this.props.dataUserEdit) {
            if (this.props.action === "EDIT") {
                let { dataUserEdit } = this.props
                this.handleEditUserFromParent(dataUserEdit)
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
                avatar: base64
            })
        }

    }

    checkValidateInput = () => {
        let isValid = true;
        let arrcheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address'];
        for (let i = 0; i < arrcheck.length; i++) {
            if (!this.state[arrcheck[i]]) {
                isValid = false;
                toast.error("This input is required: " + arrcheck[i]);
                break;
            }
            if (!validator.isEmail(this.state.email)) {
                toast.error("Email is not valid");
                isValid = false;
                break;
            }

            if (!validator.isMobilePhone(this.state.phoneNumber)) {
                toast.error("Phone is not valid");
                isValid = false;
                break;
            }
            if (this.props.action === "CREATE") {
                const digitsRegExp = /(?=.*?[0-9])/;
                const minLengthRegExp = /.{8,}/;
                const digitsPassword = digitsRegExp.test(this.state.password);
                const minLengthPassword = minLengthRegExp.test(this.state.password);
                if (!digitsPassword) {
                    toast.error("Password must have at least one digit !")
                    isValid = false;
                    break;
                } else if (!minLengthPassword) {
                    toast.error("Password must be at least 8 characters !")
                    isValid = false;
                    break;
                }
            }
        }
        return isValid;
    }

    onChangeInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSaveUser = () => {
        let isValue = this.checkValidateInput()
        if (isValue === false) return;
        let { id } = this.state;
        if (!id) {
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                avatar: this.state.avatar,
                roleId: this.state.role,
                positionId: this.state.position
            })
        } else {
            this.props.editAUserRedux({
                id: this.state.id,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                avatar: this.state.avatar,
                roleId: this.state.role,
                positionId: this.state.position
            })
        }
        this.toggle()
    }

    handleEditUserFromParent = (user) => {
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = Buffer.from(user.image, 'base64').toString('binary');
        }
        this.setState({
            email: user.email,
            password: '********',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: imageBase64,
            previewImgURL: imageBase64,
            id: user.id
        })
    }

    toggle = () => {
        this.props.toggleUserModal()
        if (this.props.action === "CREATE") {
            this.setStateDefault()
        }
    }

    setStateDefault = () => {
        this.setState({
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
            previewImgURL: '',
        })
    }
    render() {
        let genders = this.state.genderArr;
        let language = this.props.language;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let { email, password, firstName, lastName, phoneNumber, address, gender, position, role } = this.state;
        return (
            <>
                <Modal
                    isOpen={this.props.openModal}
                    toggle={() => { this.toggle() }}
                    className={"modal-user-container"}
                    size="lg"
                    centered
                >
                    <ModalHeader toggle={() => { this.toggle() }} ><FormattedMessage id="manage-user.add" /></ModalHeader>
                    <ModalBody >
                        <div className='user-redux-body'>
                            <div className='user-container'>
                                <div className='row'>
                                    <div className='col-3 my-2'>
                                        <label><FormattedMessage id="manage-user.email" /></label>
                                        <input className='form-control' type='email' name="email"
                                            value={email}
                                            onChange={(event) => this.onChangeInput(event)}
                                            disabled={this.props.action === CRUD_ACTIONS.EDIT ? true : false}
                                        />
                                    </div>

                                    <div className='col-3 my-2'>
                                        <label><FormattedMessage id="manage-user.password" /> </label>
                                        <input className='form-control' type='password' name="password"
                                            value={password}
                                            onChange={(event) => this.onChangeInput(event)}
                                            disabled={this.props.action === CRUD_ACTIONS.EDIT ? true : false}
                                        />
                                    </div>
                                    <div className='col-3 my-2'>
                                        <label><FormattedMessage id="manage-user.lastName" /> </label>
                                        <input className='form-control' type='text' name="lastName"
                                            value={lastName}
                                            onChange={(event) => this.onChangeInput(event)}
                                        />
                                    </div>

                                    <div className='col-3 my-2'>
                                        <label><FormattedMessage id="manage-user.firstName" /></label>
                                        <input className='form-control' type='text' name="firstName"
                                            value={firstName}
                                            onChange={(event) => this.onChangeInput(event)}
                                        />
                                    </div>


                                    <div className='col-3 my-2'>
                                        <label><FormattedMessage id="manage-user.phone" /> </label>
                                        <input className='form-control' type='text' name="phoneNumber"
                                            value={phoneNumber}
                                            onChange={(event) => this.onChangeInput(event)}
                                        />
                                    </div>

                                    <div className='col-9 my-2'>
                                        <label><FormattedMessage id="manage-user.address" /> </label>
                                        <input className='form-control' type='text' name="address"
                                            value={address}
                                            onChange={(event) => this.onChangeInput(event)}
                                        />
                                    </div>

                                    <div className='col-3 my-2'>
                                        <label><FormattedMessage id="manage-user.gender" /> </label>
                                        <select className="form-control"
                                            name='gender'
                                            onChange={(event) => this.onChangeInput(event)}
                                            value={gender}
                                        >
                                            {
                                                genders && genders.length > 0 &&
                                                genders.map((item, index) => {
                                                    return (
                                                        <option key={item.id} value={item.id}>
                                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>

                                    <div className='col-3 my-2'>
                                        <label><FormattedMessage id="manage-user.position" /> </label>
                                        <select className="form-control"
                                            name='position'
                                            onChange={(event) => this.onChangeInput(event)}
                                            value={position}
                                        >
                                            {
                                                positions && positions.length > 0 &&
                                                positions.map((item, index) => {
                                                    return (
                                                        <option key={item.id} value={item.id} >
                                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>

                                    <div className='col-3 my-2'>
                                        <label><FormattedMessage id="manage-user.role" /> </label>
                                        <select className="form-control"
                                            name='role'
                                            onChange={(event) => this.onChangeInput(event)}
                                            value={role}
                                        >
                                            {
                                                roles && roles.length > 0 &&
                                                roles.map((item, index) => {
                                                    return (
                                                        <option key={item.id} value={item.id}>
                                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>

                                    <div className='col-3 my-2'>
                                        <label><FormattedMessage id="manage-user.image" /> </label>
                                        <div className='preview-img-box'>
                                            <label className='label-upload' htmlFor='previewImg'><i className="fas fa-camera"></i>Tải ảnh</label>
                                            <input className='preview-img-input' id='previewImg' type='file'
                                                onChange={(event) => this.handleOnchangImage(event)}
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
                            </div>
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}><FormattedMessage id="btn.cancel" /></Button>
                        <Button color="primary" className='px-3 ' onClick={() => this.handleSaveUser()}> <FormattedMessage id="btn.save" /></Button>{' '}
                    </ModalFooter>
                </Modal>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {

        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositonStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        editAUserRedux: (user) => dispatch(actions.updateAUser(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
