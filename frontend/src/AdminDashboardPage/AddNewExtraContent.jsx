import React from 'react';
import { connect } from 'react-redux';

import { extraActions } from '../_actions';

class AddNewExtraContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      extra: {
        name: '',
        lastName: '',
        age: '',
        birthday: '',
        phone: '',
        genre: '',
        address: '',
        localityId: '',
        provinceId: '',
        nationality: '',
        insuranceNumber: '',
        vatNumber: '',
        height: '',
        weight: '',
        tshirtSizeId: '',
        trouserSizeId: '',
        footSizeId: '',
        eyeColorId: '',
        hairColorId: '',
        profession: '',
        availability: '',
        drivingLicenseTypeId: '',
        hobbies: '',
        extraExperience: '',
        danceExperience: '',
        singingExperience: '',
        seaExperience: '',
        waiterExperience: '',
        otherExperience: ''
      },
      submitted: false
    };

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
    if (extra.insuranceNumber && extra.vatNumber) {
      dispatch(extraActions.add(extra));
    }
  }

  render() {
    const { adding } = this.props;
    const { extra, submitted } = this.state;
    return (
      <div>
        <h1>New extra</h1>
        <form name="addExtraForm" onSubmit={this.handleSubmit}>
          <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
            <label htmlFor="">NIF</label>
            <input type="text"className="form-control" name="email" value={user.email} onChange={this.handleChange} />
              {submitted && !user.email &&
                <div className="help-block">Email is required</div>
              }
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { adding } = state;
  return {
    adding
  };
}

const connectedAddNewExtraContent = connect(mapStateToProps)(AddNewExtraContent);
export { connectedAddNewExtraContent as AddNewExtraContent };