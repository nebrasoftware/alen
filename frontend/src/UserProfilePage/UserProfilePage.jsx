import React from 'react';
import { connect } from 'react-redux';
import { extraActions } from '../_actions';

class UserProfilePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            extra: {
                // userId: '',
                vatNumber: '',
                insuranceNumber: '',
                name: '',
                lastName: '',
                birthday: '',
                phone: '',
                address: '',
                postalCode: ''
                // countryId: '',
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
        if (extra.vatNumber && extra.insuranceNumber && extra.name && extra.lastName) {
            dispatch(extraActions.addExtra(extra));
        }
    }

    render() {
        const { addingExtra } = this.props
        const { extra } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>User Profile Page</h2>
                <form action="" onSubmit={this.handleSubmit}>
                    {/* <div className="form-group">
                        <label htmlFor="userId">User ID</label>
                        <input name="userId" className="form-control" type="text" value={extra.userId} onChange={this.handleChange}/>
                    </div> */}
                    <div className="form-group">
                        <label htmlFor="vatNumber">Vat Number</label>
                        <input name="vatNumber" className="form-control" type="text" value={extra.vatNumber} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="insuranceNumber">Insurance Number</label>
                        <input name="insuranceNumber" className="form-control" type="text" value={extra.insuranceNumber} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input name="name" className="form-control" type="text" value={extra.name} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input name="lastName" className="form-control" type="text" value={extra.lastName} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="birthday">Birthday</label>
                        <input name="birthday" className="form-control" type="text" value={extra.birthday} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input name="phone" className="form-control" type="text" value={extra.phone} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input name="address" className="form-control" type="text" value={extra.address} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="postalCode">Postal Code</label>
                        <input name="postalCode" className="form-control" type="text" value={extra.postalCode} onChange={this.handleChange}/>
                    </div>
                    {/* <div className="form-group">
                        <label htmlFor="countryId">Country ID</label>
                        <input name="countryId" className="form-control" type="text" value={extra.countryId} onChange={this.handleChange}/>
                    </div> */}
                    <div className="form-group">
                        <button className="btn btn-primary">Guardar</button>
                        {addingExtra &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { addingExtra } = state.addingExtra;
    return {
        addingExtra
    };
}

const connectedUserProfilePage = connect(mapStateToProps)(UserProfilePage);
export { connectedUserProfilePage as UserProfilePage };