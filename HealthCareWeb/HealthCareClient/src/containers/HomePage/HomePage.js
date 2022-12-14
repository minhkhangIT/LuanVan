import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import OutStandingDoctor from './Section/OutStandingDoctor';
import HandBook from './Section/HandBook';
import About from './Section/About';
import HomeFooter from './HomeFooter';
import "./HomePage.scss"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactSpinner from 'react-bootstrap-spinner'
class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
        }
    }

    componentDidMount() {
        this.setState({
            loading: false
        })
    }

    render() {
        let { loading } = this.state
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };
        return (
            <>
                {loading === true ?
                    <>
                        <div className='loading'> <ReactSpinner type="border" color="primary" size="3" /></div>
                        <HomeHeader isShowBanner={true} />:
                    </>
                    :
                    <>
                        <HomeHeader isShowBanner={true} />
                        <Specialty settings={settings} />
                        <MedicalFacility settings={settings} />
                        <OutStandingDoctor settings={settings} />
                        <HandBook settings={settings} />
                        {/* <About /> */}
                        <HomeFooter />
                    </>
                }
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
