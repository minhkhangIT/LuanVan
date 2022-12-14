import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { emitter } from '../../utils/emitter';

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }

        this.listenToEmitter();
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: ''
            })
        })
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleUserModal()
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

    render() {
        return (

            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={"modal-user-container"}
                size="lg"
                centered
            >
                <ModalHeader toggle={() => { this.toggle() }} >Create a new user</ModalHeader>
                <ModalBody >
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type='text' onChange={(event) => this.handleOnChangeInput(event)} value={this.state.email} name="email"></input>
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input type='password' onChange={(event) => this.handleOnChangeInput(event)} value={this.state.password} name="password"></input>
                        </div>
                        <div className='input-container'>
                            <label>First name</label>
                            <input type='text' onChange={(event) => this.handleOnChangeInput(event)} value={this.state.firstName} name="firstName"></input>
                        </div>
                        <div className='input-container'>
                            <label>Last name</label>
                            <input type='input' onChange={(event) => this.handleOnChangeInput(event)} value={this.state.lasrName} name="lastName"></input>
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Address</label>
                            <input type='input' onChange={(event) => this.handleOnChangeInput(event)} value={this.state.address} name="address"></input>
                        </div>

                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>Cancel</Button>
                    <Button color="primary" className='px-3' onClick={() => { this.handleAddNewUser() }}>Add new</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
