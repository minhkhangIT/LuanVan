import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import * as actions from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router';
class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listClinic: []
        }
    }

    componentDidMount() {
        this.props.fetchListClinic('');
        this.setState({
            listClinic: this.props.listClinic
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listClinic !== this.props.listClinic) {
            this.setState({
                listClinic: this.props.listClinic
            })
        }
    }

    handleViewDetailClinic = (item) => {
        this.props.history.push(`/detail-clinic/${item.id}`)
    }

    handleViewMore = () => {
        this.props.history.push(`/clinic`)
    }


    render() {
        let { listClinic } = this.state
        let { language } = this.props
        return (
            <div className='section-share section-medical-facility' >
                <div className='section-container'>
                    <div className='section-header' onClick={() => this.handleViewMore()}>
                        <span><FormattedMessage id="clinic.outstanding-clinic" /></span>
                        <button><FormattedMessage id="homepage.more-info" /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {listClinic && listClinic.length > 0 &&
                                listClinic.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                                    }
                                    let nameVi = item.nameVi
                                    let nameEn = item.nameEn
                                    return (
                                        <div className="section-customize" key={item.id} onClick={() => this.handleViewDetailClinic(item)}>
                                            <div className='customize-border'>
                                                <div className='outer-bg'>
                                                    <div className='bg-image section-medical-Facility'
                                                        style={{ backgroundImage: `url(${imageBase64})` }}></div>
                                                </div>
                                                <div className='text-center'>
                                                    <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                    <div style={{fontSize:12}}>{item.address}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        listClinic: state.clinic.listClinic
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchListClinic: (by) => dispatch(actions.fetchListClinic(by)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
