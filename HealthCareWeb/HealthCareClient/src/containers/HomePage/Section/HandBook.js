import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import Slider from 'react-slick';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import { LANGUAGES } from '../../../utils';
class HandBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listHandBook: []
        }
    }

    componentDidMount() {
        this.props.fetchListHandBook()
        this.setState({
            listHandBook: this.props.listHandBook
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listHandBook !== this.props.listHandBook) {
            this.setState({
                listHandBook: this.props.listHandBook
            })
        }
    }

    handleViewMore = () => {
        this.props.history.push(`/handbook`)
    }

    handleViewDetailHandBook = (id) => {
        this.props.history.push(`/detail-handbook/${id}`)
    }

    render() {
        let { listHandBook } = this.state
        let { language } = this.props
        return (
            <div className='section-share section-handbook' >
                <div className='section-container'>
                    <div className='section-header' onClick={() => this.handleViewMore()}>
                        <span><FormattedMessage id="handbook.title" /></span>
                        <button><FormattedMessage id="homepage.more-info" /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {
                                listHandBook && listHandBook.length > 0 &&
                                listHandBook.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                                    }
                                    return (
                                        <div className="section-customize" key={item.id} onClick={() => this.handleViewDetailHandBook(item.id)}>
                                            <div className='customize-border'>
                                                <div className='outer-bg'>
                                                    <div className='bg-image section-handbook' style={{ backgroundImage: `url(${imageBase64 !== '' ? imageBase64 : ''})` }}></div>
                                                </div>
                                                <div className='text-center'>
                                                    <div>{language === LANGUAGES.VI ? item.nameVi : item.nameEn}</div>
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
        language: state.app.language,
        listHandBook: state.handbook.listHandBook
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchListHandBook: () => dispatch(actions.fetchListHandBook())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HandBook));
