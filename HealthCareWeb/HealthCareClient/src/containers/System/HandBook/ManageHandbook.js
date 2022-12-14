import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageHandbook.scss';
import 'react-markdown-editor-lite/lib/index.css';
import { FormattedMessage } from 'react-intl';
import TableHandBook from './TableHandBook';
import ModalUpSertHandBook from './ModalUpSertHandBook';

class ManageHandbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataHandBookEdit: {},
            isOpenModalUpSertHandBook: false,
            action: "CREATE"
        }
    }

    async componentDidMount() {
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }


    handleEditHandBookFromParent = (data) => {
        this.setState({
            dataHandBookEdit: data
        })
        this.handleOpenModalUpSertHandBook("EDIT")
    }

    handleOpenModalUpSertHandBook = (action) => {
        if (action === "CREATE") {
            this.setState({
                isOpenModalUpSertHandBook: true,
                action: action,
                dataHandBookEdit: {}
            })
        } else {
            this.setState({
                isOpenModalUpSertHandBook: true,
                action: action
            })
        }
    }


    handleCloseModalUpSertHandBook = () => {
        this.setState({
            isOpenModalUpSertHandBook: false,
        })
    }

    render() {
        return (
            <>
                <div className='manage-handbook-container'>
                    <div className='manage-title'><FormattedMessage id="manage-handbook.title" /></div>
                    <button type="button" className="btn btn-primary mx-3" onClick={() => this.handleOpenModalUpSertHandBook("CREATE")}> <FormattedMessage id="handbook.add" /></button>

                    <div className='list-handbook'>
                        <TableHandBook
                            handleEditHandBookFromParent={this.handleEditHandBookFromParent}
                        />
                    </div>
                    <ModalUpSertHandBook
                        openModal={this.state.isOpenModalUpSertHandBook}
                        action={this.state.action}
                        toggleHandBookModal={this.handleCloseModalUpSertHandBook}
                        dataHandBookEdit={this.state.dataHandBookEdit}
                    />
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        update: state.handbook.update,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageHandbook);
