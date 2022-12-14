import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// import Slider from 'react-slick';

class HomeFooter extends Component {

    render() {

        return (
            <div className='home-footer' >
                <div>&copy;Luận văn 2022</div>
                <div>Sinh viên: Tống Nguyễn Thành Lộc</div>
                <div>MSSV: B1809480</div>
            </div>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
