import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
 
import { userActions } from '../_actions';
 
class UserProfilePage extends React.Component {

    componentDidMount () {
        const { id } = this.user.user.id
    }

    render() {
        console.log(this.props)
        const { user } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>User Profile</h2>
                <div></div>
            </div>
        );
    }
}
 
function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}
 
const connectedUserProfilePage = connect(mapStateToProps)(UserProfilePage);
export { connectedUserProfilePage as UserProfilePage }