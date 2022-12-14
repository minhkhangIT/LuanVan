import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss';
import { getDetailInforDoctorService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfor from './DoctorExtraInfor';
import avatar_default from '../../../assets/images/avatar_default.png'
// import LikeAndShare from '../Social/LikeAndShare';
// import Comment from '../Social/Comment';
class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
            currentDoctorid: ''
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({
                currentDoctorid: id
            })
            let res = await getDetailInforDoctorService(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data,
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        let { detailDoctor } = this.state;
        let { language } = this.props;
        let nameEn = '';
        let nameVi = '';
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
        }
      
        if(detailDoctor.DoctorInfor && detailDoctor.DoctorInfor.dataSpecialty){
            nameVi = nameVi + " || " +detailDoctor.DoctorInfor.dataSpecialty.nameVi
            nameEn = nameEn + " || " +detailDoctor.DoctorInfor.dataSpecialty.nameEn
        }
        // let currentURL = process.env.REACT_APP_LOCALHOST === 1 ?
        //     "" : window.location.href;
        return (
            <>
                <HomeHeader
                    isShowBanner={false}
                />
                <div className='doctor-detail-container'>
                    <div className='intro-doctor'>
                        <div className='content-left'
                            style={{ backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : avatar_default})` }}
                        >
                        </div>
                        <div className='content-right'>
                            <div className='content-right-up'>
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className='content-right-down'>
                                {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.description
                                    && <span>
                                        {detailDoctor.Markdown.description}
                                    </span>
                                }
                                {/* <div className='like-share-plugin'>
                                    <LikeAndShare dataHref={currentURL} />
                                </div> */}
                            </div>
                        </div>
                    </div>

                    <div className='schedule-doctor'>
                        <div className='content-left'>
                            <DoctorSchedule
                                detailDoctorId={this.state.currentDoctorid}
                            />
                        </div>
                        <div className='content-right'>
                            <DoctorExtraInfor
                                detailDoctorId={this.state.currentDoctorid}
                            />
                        </div>
                    </div>

                    <div className='detail-infor-doctor'>
                        {
                            detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML &&
                            <div
                                dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}
                            >
                            </div>
                        }
                    </div>

                    {/* <div className='comment-doctor'>
                        <Comment dataHref={currentURL} />
                    </div> */}
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
