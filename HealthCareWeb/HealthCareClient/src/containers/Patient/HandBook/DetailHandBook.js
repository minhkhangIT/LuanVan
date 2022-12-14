import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailHandBook.scss';
import { LANGUAGES } from '../../../utils';
import { getDetailHandBookById } from '../../../services/userService';
import HomeHeader from '../../HomePage/HomeHeader';
class DetailHandBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailHandBook: {},
            currentHandBookId: ''
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({
                currentHandBookId: id
            })
            let res = await getDetailHandBookById(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailHandBook: res.data,
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        let { detailHandBook } = this.state
        let { language } = this.props
        return (
            <>
                <HomeHeader />
                <div className='handbook-detail-container'>
                    <div className='title'>{language === LANGUAGES.VI ? detailHandBook.nameVi : detailHandBook.nameEn}</div>
                    <div className='content' dangerouslySetInnerHTML={{ __html: detailHandBook.descriptionHTML }}></div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandBook);
