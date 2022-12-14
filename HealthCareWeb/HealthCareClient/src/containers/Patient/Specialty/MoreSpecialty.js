import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import './MoreSpecialty.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import ReactSpinner from 'react-bootstrap-spinner'

import { LANGUAGES } from '../../../utils';


class MoreSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            listSpecialty: [],
            search: ''
        }
    }

    async componentDidMount() {
        this.props.fetchListSpecialty('');
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listSpecialty !== this.props.listSpecialty) {
            this.setState({
                listSpecialty: this.props.listSpecialty,
                loading: false
            })
        }
        if (prevState.search !== this.state.search) {
            this.setState({
                loading: true
            })
            this.props.fetchListSpecialty(this.state.search)
        }
    }

    handleViewDetailSpecialty = (item) => {
        this.props.history.push(`/detail-specialty/${item.id}`)
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
        let { listSpecialty, loading, search } = this.state
        let placeHolder = language === LANGUAGES.VI ? 'Tìm chuyên khoa' : 'Search specialties'
        return (
            <>
                {loading === true &&
                    <div className='loading'> <ReactSpinner type="border" color="primary" size="3" /></div>
                }
                <HomeHeader />
                <div className='search'>
                    <i className="fas fa-search"></i>
                    <input type='text' placeholder={placeHolder} value={search} onChange={(event) => this.handleOnChangeInput(event)} />
                    {search !== '' &&
                        <i className="fas fa-times" onClick={() => this.handleOnClickDelSearch()}></i>
                    }
                </div>
                {loading === false &&
                    <div className='more-specialty-container'>
                        <div className='content'>
                            {listSpecialty && listSpecialty.length > 0 ?
                                listSpecialty.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                                    }
                                    let nameVi = item.nameVi
                                    let nameEn = item.nameEn
                                    return (
                                        <div className='specialty-detail' key={item.id}>
                                            <div className='img'
                                                style={{ backgroundImage: `url(${imageBase64})` }}
                                                onClick={() => this.handleViewDetailSpecialty(item)}
                                            ></div>
                                            <div className='name'  style={{color:"red",fontSize:'1.3rem'}}>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                        </div>
                                    )
                                })
                                :
                                <div className='specialty-detail-null'>Không tìm thấy chuyên khoa !</div>
                            }
                        </div>
                    </div>
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(MoreSpecialty);
