import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import * as actions from "../../../store/actions";
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
class Specialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listSpecialty: []
        }
    }

    componentDidMount() {
        this.props.fetchListSpecialty('');
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listSpecialty !== this.props.listSpecialty) {
            this.setState({
                listSpecialty: this.props.listSpecialty
            })
        }
    }
    handleViewDetailSpecialty = (item) => {
        this.props.history.push(`/detail-specialty/${item.id}`)
    }

    handleViewMore = () => {
        this.props.history.push(`/specialty`)
    }

    render() {
        let { language } = this.props;
        let { listSpecialty } = this.state;
        return (
            <div className='section-share section-specialty' >
                <div className='section-container'>
                    <div className='section-header' onClick={() => this.handleViewMore()}>
                        <span><FormattedMessage id='specialty.title' /></span>
                        <button><FormattedMessage id="homepage.more-info" /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {listSpecialty && listSpecialty.length > 0 &&
                                listSpecialty.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                                    }
                                    let nameVi = item.nameVi
                                    let nameEn = item.nameEn
                                    return (
                                        <div key={index} className="section-customize"
                                            onClick={() => this.handleViewDetailSpecialty(item)}
                                        >
                                            <div className='customize-border'>
                                                <div className='outer-bg'>
                                                    <div className='bg-image section-specialty'
                                                        style={{ backgroundImage: `url(${imageBase64})` }}
                                                    ></div>
                                                </div>
                                                <div className='text-center'>
                                                    <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
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
        listSpecialty: state.specialty.listSpecialty
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchListSpecialty: (by) => dispatch(actions.fetchListSpecialty(by)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
