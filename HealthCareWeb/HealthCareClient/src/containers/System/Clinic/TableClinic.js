import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableClinic.scss';
import * as actions from "../../../store/actions";
import { emitter } from '../../../utils/emitter';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
class TableClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listClinic: [],
            search: ''
        }
    }


    listenToEmitter() {
        emitter.on('EVENT_CLINIC', () => {
            this.props.fetchListClinic('');
            this.setState({
                listClinic: this.props.listClinic
            })
        })
    }

    componentDidMount() {
        this.props.fetchListClinic('');
        this.listenToEmitter();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listClinic !== this.props.listClinic) {
            this.setState({
                listClinic: this.props.listClinic
            })
        }
        if (prevState.search !== this.state.search && this.state.search === '') {
            this.props.fetchListClinic(this.state.search)
        }
    }

    handleSearch = () => {
        this.props.fetchListClinic(this.state.search)
    }

    handleDeleteClinic = (id) => {
        this.props.deleteClinic(id);
    }

    handleEditClinic = (data) => {
        this.props.handleEditClinicFromParent(data);
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
        let { listClinic, search } = this.state;
        let placeHolder = language === LANGUAGES.VI ? 'Tìm phòng khám' : 'Search clinics'
        return (
            <>
                <div className='search' style={{ marginBottom: "40px" }}>
                    <i className="fas fa-search" onClick={() => this.handleSearch()}></i>
                    <input type='text' placeholder={placeHolder} value={search} onChange={(event) => this.handleOnChangeInput(event)} />
                    {search !== '' &&
                        <i className="fas fa-times" onClick={() => this.handleOnClickDelSearch()}></i>
                    }
                </div>
                <table id="table-manage-clinic">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th><FormattedMessage id="clinic.name-clinic-vi" /></th>
                            <th><FormattedMessage id="clinic.name-clinic-en" /></th>
                            <th><FormattedMessage id="clinic.address-clinic" /></th>
                            <th><FormattedMessage id="clinic.avatar" /></th>
                            <th><FormattedMessage id="table.actions" /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {listClinic && listClinic.length > 0 &&
                            listClinic.map((item, index) => {
                                let imageBase64 = '';
                                if (item.image) {
                                    imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                                }
                                return (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.nameVi}</td>
                                        <td>{item.nameEn}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <div className='bg-image'
                                                style={{ backgroundImage: `url(${imageBase64})` }}
                                            ></div>
                                        </td>
                                        <td>
                                            <button className='btn-edit' onClick={() => this.handleEditClinic(item)}><i className="fas fa-edit"></i></button>
                                            <button className='btn-delete' onClick={() => this.handleDeleteClinic(item.id)}><i className="fas fa-trash"></i></button>
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
        listClinic: state.clinic.listClinic,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchListClinic: (by) => dispatch(actions.fetchListClinic(by)),
        deleteClinic: (id) => dispatch(actions.deleteClinic(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableClinic);
