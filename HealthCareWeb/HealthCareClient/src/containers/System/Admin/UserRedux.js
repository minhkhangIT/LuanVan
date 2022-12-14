import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserRedux.scss'
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';
import ModalUpSertUser from './ModalUpSertUser';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataUserEdit: {},
            isOpenModalUpSertUser: false,
            action: "CREATE"
        }
    }

    async componentDidMount() {
    }

    handleEditUserFromParent = (user) => {
        this.setState({
            dataUserEdit: user
        })
        this.handleOpenModalUpSertUser("EDIT")
    }

    handleOpenModalUpSertUser = (action) => {
        if (action === "CREATE") {
            this.setState({
                isOpenModalUpSertUser: true,
                action: action,
                dataUserEdit: {}
            })
        } else {
            this.setState({
                isOpenModalUpSertUser: true,
                action: action
            })
        }
    }

    handleCloseModalUpSertUser = () => {
        this.setState({
            isOpenModalUpSertUser: false,
        })
    }


    render() {
        return (
            <div className="user-redux-container" >
                <div className='title'>
                    <FormattedMessage id="manage-user.title" />
                </div>
                <button type="button" className="btn btn-primary mx-3" onClick={() => this.handleOpenModalUpSertUser("CREATE")}> <FormattedMessage id="manage-user.add" /></button>
                <div className='col-12 my-5'>
                    <TableManageUser
                        handleEditUserFromParent={this.handleEditUserFromParent}
                    />
                </div>
                <ModalUpSertUser
                    openModal={this.state.isOpenModalUpSertUser}
                    action={this.state.action}
                    toggleUserModal={this.handleCloseModalUpSertUser}
                    dataUserEdit={this.state.dataUserEdit}
                />
            </div>

        )
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

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
