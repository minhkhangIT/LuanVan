import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from "../../../store/actions";
import 'react-markdown-editor-lite/lib/index.css';
import { LANGUAGES } from '../../../utils';
import { getAllUsersByNameService } from '../../../services/userService';
class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userRedux: [],
            search: ''
        }
    }
    
    getAllUsersByName = async (search) =>{
        let res = await getAllUsersByNameService(search)
        if(res){
            this.setState({
                userRedux: res
            })
        }
    }

    componentDidMount() {
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                userRedux: this.props.listUsers
            })
        }
        
        if (prevState.search !== this.state.search) {
            this.getAllUsersByName(this.state.search)
        }
    }

    handleDeleteUser = (userId) => {
        this.props.deleteUserRedux(userId);
    }

    handleEditUser = (user) => {
        this.props.handleEditUserFromParent(user);
    }
    handleOnChangeInput = (event) => {
        this.setState({
            search: event.target.value
        })
    }
    handleOnClickDelSearch = () => {
        this.setState({
            search: ''
        })
    }

    render() {
        let {search} = this.state
        let arrUser = this.state.userRedux;
        let { language } = this.props
        let placeHolder = language === LANGUAGES.VI ? 'Tìm theo tên' : 'Search by name'
        return (
            <>
                <div className='search' style={{marginBottom:"40px"}}>
                    <i className="fas fa-search"></i>
                    <input type='text' placeholder={placeHolder} value={search} onChange={(event) => this.handleOnChangeInput(event)} />
                    {search !== '' &&
                        <i className="fas fa-times" onClick={() => this.handleOnClickDelSearch()}></i>
                    }
                </div>
                <table id="table-manage-user">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Email</th>
                            <th><FormattedMessage id="manage-user.fullName" /></th>
                            <th><FormattedMessage id="manage-user.gender" /></th>
                            <th><FormattedMessage id="manage-user.position" /></th>
                            <th><FormattedMessage id="manage-user.address" /></th>
                            <th><FormattedMessage id="manage-user.phone" /></th>
                            <th><FormattedMessage id="manage-user.actions" /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {arrUser && arrUser.length > 0 &&
                            arrUser.map((item, index) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.email}</td>
                                        <td>{item.lastName ? item.lastName :''} {item.firstName ? item.firstName :''} </td>
                                        { item.genderData ?
                                            <td>{language === LANGUAGES.VI ? item.genderData.valueVi : item.genderData.valueEn}</td>
                                            :
                                            <td></td>
                                        }
                                        {item.positionData ?
                                            <td>{language === LANGUAGES.VI ? item.positionData.valueVi : item.positionData.valueEn}</td>
                                            :
                                            <td>ADMIN</td>
                                        }
                                        <td>{item.address}</td>
                                        <td>{item.phonenumber}</td>
                                        <td>
                                            <button className='btn-edit' onClick={() => this.handleEditUser(item)}><i className="fas fa-edit"></i></button>
                                            <button className='btn-delete' onClick={() => this.handleDeleteUser(item.id)}><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                {/* <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} /> */}
            </>

        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteUserRedux: (userId) => dispatch(actions.deleteAUser(userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
