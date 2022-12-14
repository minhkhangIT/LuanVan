import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableSpecialty.scss';
import * as actions from "../../../store/actions";
import { emitter } from '../../../utils/emitter';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
class TableSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listSpecialty: [],
            search: ''
        }
    }


    listenToEmitter() {
        emitter.on('EVENT_SPECIAL', () => {
            this.props.fetchListSpecialty('');
            this.setState({
                listSpecialty: this.props.listSpecialty
            })
        })
    }

    componentDidMount() {
        this.props.fetchListSpecialty('');
        this.listenToEmitter();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listSpecialty !== this.props.listSpecialty) {
            this.setState({
                listSpecialty: this.props.listSpecialty
            })
        }
        if (prevState.search !== this.state.search && this.state.search === '') {
            this.props.fetchListSpecialty(this.state.search)
        }
    }

    handleSearch = () => {
        this.props.fetchListSpecialty(this.state.search)
    }

    handleDeleteSpecialty = (id) => {
        this.props.deleteSpecialty(id);
    }

    handleEditSpecialty = (data) => {
        this.props.handleEditSpecialtyFromParent(data);
    }

    handleOnChangeInput = (event) => {
        this.setState({
            search: event.target.value
        })
    }

    handleOnClickDelSearch = () => {
        this.setState({
            search: ''
        })
    }
    render() {
        let { language } = this.props
        let { listSpecialty, search } = this.state;
        let placeHolder = language === LANGUAGES.VI ? 'Tìm chuyên khoa' : 'Search specialties'
        return (
            <>
                <div className='search' style={{ marginBottom: "40px" }}>
                    <i className="fas fa-search" onClick={() => this.handleSearch()}></i>
                    <input type='text' placeholder={placeHolder} value={search} onChange={(event) => this.handleOnChangeInput(event)} />
                    {search !== '' &&
                        <i className="fas fa-times" onClick={() => this.handleOnClickDelSearch()}></i>
                    }
                </div>
                <table id="table-manage-specialty">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th><FormattedMessage id="specialty.name-specialty-vi" /></th>
                            <th><FormattedMessage id="specialty.name-specialty-en" /></th>
                            <th><FormattedMessage id="specialty.avatar" /></th>
                            <th><FormattedMessage id="table.actions" /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {listSpecialty && listSpecialty.length > 0 &&
                            listSpecialty.map((item, index) => {
                                let imageBase64 = '';
                                if (item.image) {
                                    imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                                }
                                return (

                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.nameVi}</td>
                                        <td>{item.nameEn}</td>
                                        <td>
                                            <div className='bg-image    '
                                                style={{ backgroundImage: `url(${imageBase64})` }}
                                            ></div>
                                        </td>
                                        <td>
                                            <button className='btn-edit' onClick={() => this.handleEditSpecialty(item)}><i className="fas fa-edit"></i></button>
                                            <button className='btn-delete' onClick={() => this.handleDeleteSpecialty(item.id)}><i className="fas fa-trash"></i></button>
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
        language: state.app.language,
        listSpecialty: state.specialty.listSpecialty
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchListSpecialty: (by) => dispatch(actions.fetchListSpecialty(by)),
        deleteSpecialty: (specialtyId) => dispatch(actions.deleteSpecialty(specialtyId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableSpecialty);
