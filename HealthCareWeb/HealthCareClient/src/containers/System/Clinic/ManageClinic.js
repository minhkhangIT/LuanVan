import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageClinic.scss';
import 'react-markdown-editor-lite/lib/index.css';
import { FormattedMessage } from 'react-intl';
import TableClinic from './TableClinic';
import ModalUpSertClinic from './ModalUpSertClinic';
import * as actions from "../../../store/actions";


class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinicEdit: {},
            isOpenModalUpSertClinic: false,
            action: "CREATE"
        }
    }

    async componentDidMount() {
        this.props.fetchListClinic('');
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleEditClinicFromParent = (data) => {
        this.setState({
            dataClinicEdit: data
        })
        this.handleOpenModalUpSertClinic("EDIT")
    }

    handleOpenModalUpSertClinic = (action) => {
        if (action === "CREATE") {
            this.setState({
                isOpenModalUpSertClinic: true,
                action: action,
                dataClinicEdit: {}
            })
        } else {
            this.setState({
                isOpenModalUpSertClinic: true,
                action: action
            })
        }
    }

    handleCloseModalUpSertClinic = () => {
        this.setState({
            isOpenModalUpSertClinic: false,
        })
    }


    render() {
        return (
            <>
                <div className='manage-clinic-container'>
                    <div className='manage-title'><FormattedMessage id="clinic.title" /></div>
                    <button type="button" className="btn btn-primary mx-3" onClick={() => this.handleOpenModalUpSertClinic("CREATE")}> <FormattedMessage id="clinic.add" /></button>
                    <div className='list-clinic'>
                        <TableClinic
                            handleEditClinicFromParent={this.handleEditClinicFromParent}
                        />
                    </div>
                    <ModalUpSertClinic
                        openModal={this.state.isOpenModalUpSertClinic}
                        action={this.state.action}
                        toggleClinicModal={this.handleCloseModalUpSertClinic}
                        dataClinicEdit={this.state.dataClinicEdit}
                    />
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        listClinic: state.clinic.listClinic
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchListClinic: (by) => dispatch(actions.fetchListClinic(by)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
