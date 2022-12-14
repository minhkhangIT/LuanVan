import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/logo.jpg';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
// import { renderToString } from 'react-dom/server';
import { changeLanguageApp } from '../../store/actions/appActions';
import { withRouter } from 'react-router'


class HomeHeader extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    returnHome = () => {
        this.props.history.push(`/home`)
    }

    handleViewMore = (name) => {
        this.props.history.push(`/${name}`)
    }

    render() {
        let language = this.props.language;
        return (
            <>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            {/* <i className="fas fa-bars"></i> */}
                            <img alt='' className='header-logo' src={logo ? logo : ''} onClick={() => this.returnHome()} />
                        </div>
                        <div className='center-content'>
                            <div className='child-content' onClick={() => this.handleViewMore('specialty')}>
                                <div><b><FormattedMessage id="home-header.speciality" /></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.search-doctor" /></div>
                            </div>
                            <div className='child-content' onClick={() => this.handleViewMore('clinic')}>
                                <div><b><FormattedMessage id="home-header.health-facility" /></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.select-room" /></div>
                            </div>
                            <div className='child-content' onClick={() => this.handleViewMore('outstanding-doctor')}>
                                <div><b><FormattedMessage id="home-header.doctor" /></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.select-doctor" /></div>
                            </div>
                            <div className='child-content' onClick={() => this.handleViewMore('handbook')}>
                                <div><b><FormattedMessage id="home-header.handbook" /></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.detail-handbook" /></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'><i className="fas fa-question-circle"></i><span><FormattedMessage id="home-header.support" /></span></div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => { this.changeLanguage(LANGUAGES.VI) }}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => { this.changeLanguage(LANGUAGES.EN) }}>EN</span></div>
                        </div>
                    </div>
                </div>

                {this.props.isShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='content-up'>
                            <div className='title1'>
                                <FormattedMessage id="banner.title1" />
                            </div>
                            <div className='title2'>
                                <FormattedMessage id="banner.title2" />
                            </div>

                        </div>
                        <div className='content-down'>
                            <div className='options'>
                                <div className='option-child' onClick={() => this.handleViewMore('specialty')}>
                                    <div className='icon-child'><i className="fas fa-hand-holding-heart"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.child1" /></div>
                                </div>
                                <div className='option-child' onClick={() => this.handleViewMore('clinic')}>
                                    <div className='icon-child'><i className="fas fa-hospital"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.child2" /></div>
                                </div>

                                <div className='option-child' onClick={() => this.handleViewMore('outstanding-doctor')}>
                                    <div className='icon-child'><i className="fas fa-user-md"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.child3" /></div>
                                </div>

                                <div className='option-child' onClick={() => this.handleViewMore('handbook')}>
                                    <div className='icon-child'><i className="fas fa-briefcase-medical"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.child4" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
