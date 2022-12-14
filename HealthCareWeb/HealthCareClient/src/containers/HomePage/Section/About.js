import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import health_and_life_media from '../../../assets/media/suckhoedoisong.png';
import vtv1_media from '../../../assets/media/vtv1.png';
import vnexpress_media from '../../../assets/media/vnexpress.png';
import ictnews_media from '../../../assets/media/ictnews.png';
import ministry_of_health_media from '../../../assets/media/cuc-cong-nghe-thong-tin-bo-y-te-2.png';
import youtube_media from '../../../assets/media/youtube-media.gif';


class Abount extends Component {

    render() {

        return (
            <div className='section-share section-about' >
                <div className='setion-about-header'>
                    Truyền thông nói về BookingCare
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/FyDQljKtWnI" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                    <div className='contetn-right'>
                        <ul className='media-list'>
                            <li>
                                <a target="_blank" rel="noreferrer" title="Báo sức khỏe đời sống nói về BookingCare" href="https://suckhoedoisong.vn/dat-lich-kham-benh-tiet-kiem-thong-minh-va-hieu-qua-n153232.html"><div className='media' style={{ backgroundImage: `url(${health_and_life_media})` }}></div></a>
                            </li>
                            <li>
                                <a target="_blank" rel="noreferrer" title="VTV1 - Cà phê khởi nghiệp 14-11-2018" href="https://vtv.vn/video/ca-phe-khoi-nghiep-14-11-2018-334894.htm"><div className='media' style={{ backgroundImage: `url(${vtv1_media})` }}></div></a>
                            </li>
                            <li>
                                <a target="_blank" rel="noreferrer" title="VnExpress nói về BookingCare" href="https://video.vnexpress.net/tin-tuc/cuoc-song-4-0/kham-benh-khong-phai-xep-hang-o-ha-noi-3797126.html"><div className='media' style={{ backgroundImage: `url(${vnexpress_media})` }}></div></a>
                            </li>
                            <li>
                                <a target="_blank" rel="noreferrer" title="Báo điện tử ictnews giới thiệu BookingCare" href="https://ictnews.vn/kinh-doanh/doanh-nghiep/startup-bookingcare-chinh-thuc-ra-mat-phien-ban-di-dong-cua-nen-tang-ho-tro-dat-lich-kham-online-173512.ict"><div className='media' style={{ backgroundImage: `url(${ictnews_media})` }}></div></a>
                            </li>
                            <li>
                                <a target="_blank" rel="noreferrer" title="Cục công nghệ thông tin - Bộ Y tế nói về BookingCare" href="http://ehealth.gov.vn/?action=News&amp;newsId=46094"><div className='media' style={{ backgroundImage: `url(${ministry_of_health_media})` }}></div></a>
                            </li>
                            <li>
                                <a target="_blank" rel="noreferrer" href="https://www.youtube.com/channel/UC9l2RhMEPCIgDyGCH8ijtPQ"><div className='media youtube-media' style={{ backgroundImage: `url(${youtube_media})` }}></div></a>
                            </li>
                        </ul>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Abount);
