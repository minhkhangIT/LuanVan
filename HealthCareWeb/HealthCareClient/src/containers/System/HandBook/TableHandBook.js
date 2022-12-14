import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableHandBook.scss';
import * as actions from "../../../store/actions";
import { emitter } from '../../../utils/emitter';
import { FormattedMessage } from 'react-intl';
class TableHandBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listHandBook: []
        }
    }


    listenToEmitter() {
        emitter.on('EVENT_HANDBOOK', () => {
            this.props.fetchListHandBook();
            this.setState({
                listHandBook: this.props.listHandBook
            })
        })
    }

    componentDidMount() {
        this.props.fetchListHandBook();
        this.listenToEmitter();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listHandBook !== this.props.listHandBook) {
            this.setState({
                listHandBook: this.props.listHandBook
            })
        }
    }

    handleDeleteHandBook = (id) => {
        this.props.deleteHandBook(id);
    }

    handleEditHandBook = (data) => {
        this.props.handleEditHandBookFromParent(data);
    }


    render() {
        let { listHandBook } = this.state;
        return (
            <>
                <table id="table-manage-clinic">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th><FormattedMessage id="manage-handbook.name-vi" /></th>
                            <th><FormattedMessage id="manage-handbook.name-en" /></th>
                            <th><FormattedMessage id="table.actions" /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {listHandBook && listHandBook.length > 0 &&
                            listHandBook.map((item, index) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.nameVi}</td>
                                        <td>{item.nameEn}</td>
                                        <td>
                                            <button className='btn-edit' onClick={() => this.handleEditHandBook(item)}><i className="fas fa-edit"></i></button>
                                            <button className='btn-delete' onClick={() => this.handleDeleteHandBook(item.id)}><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </>

        );
    }

}

const mapStateToProps = state => {
    return {
        listHandBook: state.handbook.listHandBook
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchListHandBook: () => dispatch(actions.fetchListHandBook()),
        deleteHandBook: (id) => dispatch(actions.deleteHandBook(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableHandBook);
