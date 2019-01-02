import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
 
import { userActions } from '../_actions';
 
class AddExtraPage extends React.Component {

    render() {
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hello world!</h1>
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}
 
function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}
 
const connectedAddExtraPage = connect(mapStateToProps)(AddExtraPage);
export { connectedAddExtraPage as AddExtraPage };