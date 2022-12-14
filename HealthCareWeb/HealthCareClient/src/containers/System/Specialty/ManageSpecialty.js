import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSpecialty.scss';
import 'react-markdown-editor-lite/lib/index.css';
import { FormattedMessage } from 'react-intl';
import TableSpecialty from './TableSpecialty';
import ModalUpSertSpecialty from './ModalUpSertSpecialty';
import * as actions from "../../../store/actions";

class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialtyEdit: {},
            isOpenModalUpSertSpecialty: false,
            action: "CREATE"
        }
    }

    async componentDidMount() {
        this.props.fetchListSpecialty('');
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
    }

    handleEditSpecialtyFromParent = (data) => {
        this.setState({
            dataSpecialtyEdit: data
        })
        this.handleOpenModalUpSertSpecialty("EDIT")
    }

    handleOpenModalUpSertSpecialty = (action) => {
        if (action === "CREATE") {
            this.setState({
                isOpenModalUpSertSpecialty: true,
                action: action,
                dataSpecialtyEdit: {}
            })
        } else {
            this.setState({
                isOpenModalUpSertSpecialty: true,
                action: action
            })
        }
    }

    handleCloseModalUpSertSpecialty = () => {
        this.setState({
            isOpenModalUpSertSpecialty: false,
        })
    }



    render() {
        return (
            <>
                <div className='manage-specialty-container'>
                    <div className='manage-title'><FormattedMessage id="specialty.title" /></div>
                    <button type="button" className="btn btn-primary mx-3" onClick={() => this.handleOpenModalUpSertSpecialty("CREATE")}> <FormattedMessage id="specialty.add" /></button>

                    <div className='list-specialty'>
                        <TableSpecialty
                            handleEditSpecialtyFromParent={this.handleEditSpecialtyFromParent}
                        />
                    </div>
                    <ModalUpSertSpecialty
                        openModal={this.state.isOpenModalUpSertSpecialty}
                        action={this.state.action}
                        toggleSpecialtyModal={this.handleCloseModalUpSertSpecialty}
                        dataSpecialtyEdit={this.state.dataSpecialtyEdit}
                    />
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        listSpecialty: state.specialty.listSpecialty
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchListSpecialty: (by) => dispatch(actions.fetchListSpecialty(by)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
