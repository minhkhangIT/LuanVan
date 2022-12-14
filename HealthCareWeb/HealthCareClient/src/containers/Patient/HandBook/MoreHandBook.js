import React, { Component } from 'react';
import { connect } from "react-redux";
import './MoreHandBook.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import * as actions from '../../../store/actions';
import avatar_default from '../../../assets/images/avatar_default.png'
import { LANGUAGES } from '../../../utils';
import ReactSpinner from 'react-bootstrap-spinner'

class MoreHandBook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            listHandBook: []
        }
    }

    componentDidMount() {
        this.props.fetchListHandBook();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listHandBook !== this.props.listHandBook) {
            this.setState({
                listHandBook: this.props.listHandBook
            }, () => {
                this.setState({
                    loading: false
                })
            })
        }
    }

    handleViewDetailHandBook = (id) => {
        this.props.history.push(`/detail-handbook/${id}`)
    }

    render() {
        let { language } = this.props
        let { listHandBook, loading } = this.state
        return (
            <>
                {loading === true &&
                    <div className='loading'> <ReactSpinner type="border" color="primary" size="3" /></div>
                }
                <HomeHeader />
                {loading === false &&
                    <div className='more-handbook-container'>
                        <div className='content'>
                            {listHandBook && listHandBook.length > 0 &&
                                listHandBook.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                                    }
                                    return (
                                        <div className='handbook-detail' key={item.id}>
                                            <div className='img'
                                                style={{ backgroundImage: `url(${imageBase64 !== '' ? imageBase64 : avatar_default})` }}
                                                onClick={() => this.handleViewDetailHandBook(item.id)}
                                            ></div>
                                            <div className='name'>
                                                <div className='name-handbook'  style={{color:"red",fontSize:'1.3rem'}}>
                                                    {language === LANGUAGES.VI ? item.nameVi : item.nameEn}
                                                </div>
                                            </div>

                                        </div>
                                    )
                                })

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
        listHandBook: state.handbook.listHandBook
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchListHandBook: () => dispatch(actions.fetchListHandBook())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoreHandBook);
