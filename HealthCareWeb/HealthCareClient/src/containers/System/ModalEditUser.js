import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import _ from 'lodash';

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
    }

    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: "********",
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            })
        }
    }

    toggle = () => {
        this.props.toggleEditUserModal();
        this.setState({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        })
    }

    handleOnChangeInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert("Missing parameter " + arrInput[i]);
                break;
            }
        }
        return isValid;

    }

    handleAddNewUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            this.props.createNewUser(this.state);
        }
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            this.props.editUser(this.state);
        }
    }

    render() {
        return (

            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={"modal-user-container"}
                size="lg"
                centered
            >
                <ModalHeader toggle={() => { this.toggle() }} >Update user</ModalHeader>
                <ModalBody >
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type='text' onChange={(event) => this.handleOnChangeInput(event)} value={this.state.email} name="email" readOnly></input>
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input type='password' onChange={(event) => this.handleOnChangeInput(event)} value={this.state.password} name="password" readOnly></input>
                        </div>
                        <div className='input-container'>
                            <label>First name</label>
                            <input type='text' onChange={(event) => this.handleOnChangeInput(event)} value={this.state.firstName} name="firstName"></input>
                        </div>
                        <div className='input-container'>
                            <label>Last name</label>
                            <input type='input' onChange={(event) => this.handleOnChangeInput(event)} value={this.state.lastName} name="lastName"></input>
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Address</label>
                            <input type='input' onChange={(event) => this.handleOnChangeInput(event)} value={this.state.address} name="address"></input>
                        </div>

                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>Cancel</Button>
                    <Button color="primary" className='px-3' onClick={() => { this.handleSaveUser() }}>Save</Button>{' '}
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
