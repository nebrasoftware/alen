import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

class UserProfilePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            extra: {
                userId: '',
                vatNumber: '',
                insuranceNumber: '',
                name: '',
                lastName: '',
                birthday: '',
                phone: '',
                address: '',
                postalCode: '',
                countryId: '',
            },
            submitted: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { extra } = this.state;
        this.setState({
            extra: {
                ...extra,
                [name]: value
            }
        });
    }
 
    handleSubmit(event) {
        event.preventDefault();
 
        this.setState({ submitted: true });
        const { extra } = this.state;
        const { dispatch } = this.props;
        if (user.email && user.password) {
            dispatch(userActions.addExtraInfo(extra));
        }
    }

    render() {
        return (
            <div>
                <h1>User Profile Page</h1>
            </div>
        )
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
export { connectedUserProfilePage as UserProfilePage };