import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions';
import './MoreClinic.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import ReactSpinner from 'react-bootstrap-spinner'

import { LANGUAGES } from '../../../utils';


class MoreClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dataClinic: [],
            search: ''
        }
    }

    componentDidMount() {
        this.props.fetchListClinic('');
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listClinic !== this.props.listClinic) {
            this.setState({
                listClinic: this.props.listClinic,
                loading: false
            })
        }
        if (prevState.search !== this.state.search) {
            this.setState({
                loading: true
            })
            this.props.fetchListClinic(this.state.search)
        }
    }

    handleViewDetailClinic = (item) => {
        this.props.history.push(`/detail-clinic/${item.id}`)
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
        let { listClinic, loading, search } = this.state
        let placeHolder = language === LANGUAGES.VI ? 'Tìm cơ sở y tế' : 'Search clinics'
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
                    <div className='more-clinic-container'>
                        <div className='content'>
                            {listClinic && listClinic.length > 0 ?
                                listClinic.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                                    }
                                    let nameVi = item.nameVi
                                    let nameEn = item.nameEn
                                    return (
                                        <div className='clinic-detail' key={item.id}>
                                            <div className='img'
                                                style={{ backgroundImage: `url(${imageBase64})` }}
                                                onClick={() => this.handleViewDetailClinic(item)}
                                            ></div>
                                            <div>
                                                <div className='name' style={{color:"red",fontSize:'1.3rem'}}>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                <div className='name'>{item.address}</div>
                                            </div>
                                        </div>
                                    )
                                })
                                :
                                <div className='clinic-detail-null'>Không tìm thấy cơ sở y tế !</div>
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
        listClinic: state.clinic.listClinic
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchListClinic: (by) => dispatch(actions.fetchListClinic(by)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoreClinic);
