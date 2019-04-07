import React from 'react';
import { connect } from 'react-redux';

import { extraActions, wearActions } from '../_actions';

class AddNewExtraContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      extra: {
        name: '',
        lastName: '',
        age: '',
        insuranceNumber: '',
        vatNumber: '',
        birthday: '',
        genre: '',
        phone: '',
        address: '',
        localityId: '',
        provinceId: '',
        nationality: '',
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

  componentDidMount() {
    this.props.dispatch(wearActions.getTshirtSizes());
    this.props.dispatch(wearActions.getTrouserSizes());
    this.props.dispatch(wearActions.getFootSizes());
  }

  render() {
    const { adding, wear } = this.props;
    const { extra, submitted } = this.state;
    return (
      <div>
        <h1>New extra</h1>
        <div className="container">
          <div className="row">
            {wear.loading && <em>Loading tshirt...</em>}
            {wear.tshirts &&
              <ul>
                {wear.tshirts.data.map((t, index) =>
                  <li key={t.id}>
                      {t.size}
                  </li>
                )}
              </ul>
            }
            <div className="col-8 offset-2">
              <form name="addExtraForm" onSubmit={this.handleSubmit}>
                <div className={'form-group' + (submitted && !extra.name ? ' has-error' : '')}>
                  <label htmlFor="">Nombre</label>
                  <input type="text"className="form-control" name="name" value={extra.name} onChange={this.handleChange} />
                    {submitted && !extra.name &&
                      <div className="help-block">Email is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !extra.lastName ? ' has-error' : '')}>
                  <label htmlFor="">Apellidos</label>
                  <input type="text"className="form-control" name="lastName" value={extra.lastName} onChange={this.handleChange} />
                    {submitted && !extra.lastName &&
                      <div className="help-block">Email is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !extra.vatNumber ? ' has-error' : '')}>
                  <label htmlFor="">NIF</label>
                  <input type="text"className="form-control" name="vatNumber" value={extra.vatNumber} onChange={this.handleChange} />
                    {submitted && !extra.vatNumber &&
                      <div className="help-block">Email is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !extra.insuranceNumber ? ' has-error' : '')}>
                  <label htmlFor="">Número Seguridad Social</label>
                  <input type="text"className="form-control" name="insuranceNumber" value={extra.insuranceNumber} onChange={this.handleChange} />
                    {submitted && !extra.insuranceNumber &&
                      <div className="help-block">Email is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !extra.email ? ' has-error' : '')}>
                  <label htmlFor="">Fecha de nacimiento</label>
                  <input type="text"className="form-control" name="birthday" value={extra.birthday} onChange={this.handleChange} />
                    {submitted && !extra.birthday &&
                      <div className="help-block">Email is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !extra.genre ? ' has-error' : '')}>
                  <label htmlFor="">Sexo</label>
                  <input type="text"className="form-control" name="genre" value={extra.genre} onChange={this.handleChange} />
                    {submitted && !extra.genre &&
                      <div className="help-block">Email is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !extra.phone ? ' has-error' : '')}>
                  <label htmlFor="">Teléfono</label>
                  <input type="text"className="form-control" name="phone" value={extra.phone} onChange={this.handleChange} />
                    {submitted && !extra.phone &&
                      <div className="help-block">Email is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !extra.address ? ' has-error' : '')}>
                  <label htmlFor="">Dirección</label>
                  <input type="text"className="form-control" name="address" value={extra.address} onChange={this.handleChange} />
                    {submitted && !extra.address &&
                      <div className="help-block">Email is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !extra.localityId ? ' has-error' : '')}>
                  <label htmlFor="">Localidad</label>
                  <input type="text"className="form-control" name="localityId" value={extra.localityId} onChange={this.handleChange} />
                    {submitted && !extra.localityId &&
                      <div className="help-block">Email is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !extra.provinceId ? ' has-error' : '')}>
                  <label htmlFor="">Provincia</label>
                  <input type="text"className="form-control" name="provinceId" value={extra.provinceId} onChange={this.handleChange} />
                    {submitted && !extra.provinceId &&
                      <div className="help-block">Email is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !extra.nationality ? ' has-error' : '')}>
                  <label htmlFor="">Nacionalidad</label>
                  <input type="text"className="form-control" name="nationality" value={extra.nationality} onChange={this.handleChange} />
                    {submitted && !extra.nationality &&
                      <div className="help-block">Email is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !extra.height ? ' has-error' : '')}>
                  <label htmlFor="">Altura</label>
                  <input type="text"className="form-control" name="height" value={extra.height} onChange={this.handleChange} />
                    {submitted && !extra.height &&
                      <div className="help-block">Email is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !extra.weight ? ' has-error' : '')}>
                  <label htmlFor="">Peso</label>
                  <input type="text"className="form-control" name="weight" value={extra.weight} onChange={this.handleChange} />
                    {submitted && !extra.weight &&
                      <div className="help-block">Email is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !extra.tshirtSizeId ? ' has-error' : '')}>
                  <label htmlFor="">Talla de camiseta</label>
                  <input type="text"className="form-control" name="tshirtSizeId" value={extra.tshirtSizeId} onChange={this.handleChange} />
                    {submitted && !extra.tshirtSizeId &&
                      <div className="help-block">Email is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !extra.trouserSizeId ? ' has-error' : '')}>
                  <label htmlFor="">Talla de pantalón</label>
                  <input type="text"className="form-control" name="trouserSizeId" value={extra.trouserSizeId} onChange={this.handleChange} />
                    {submitted && !extra.trouserSizeId &&
                      <div className="help-block">Email is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !extra.footSizeId ? ' has-error' : '')}>
                  <label htmlFor="">Talla de pie</label>
                  <input type="text"className="form-control" name="footSizeId" value={extra.footSizeId} onChange={this.handleChange} />
                    {submitted && !extra.footSizeId &&
                      <div className="help-block">Email is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !extra.eyeColorId ? ' has-error' : '')}>
                  <label htmlFor="">Color de ojos</label>
                  <input type="text"className="form-control" name="eyeColorId" value={extra.eyeColorId} onChange={this.handleChange} />
                    {submitted && !extra.eyeColorId &&
                      <div className="help-block">Email is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !extra.hairColorId ? ' has-error' : '')}>
                  <label htmlFor="">Color de pelo</label>
                  <input type="text"className="form-control" name="hairColorId" value={extra.hairColorId} onChange={this.handleChange} />
                    {submitted && !extra.hairColorId &&
                      <div className="help-block">Email is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !extra.profession ? ' has-error' : '')}>
                  <label htmlFor="">Profesión</label>
                  <input type="text"className="form-control" name="profession" value={extra.profession} onChange={this.handleChange} />
                    {submitted && !extra.profession &&
                      <div className="help-block">Email is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !extra.availability ? ' has-error' : '')}>
                  <label htmlFor="">Disponibilidad</label>
                  <input type="text"className="form-control" name="availability" value={extra.availability} onChange={this.handleChange} />
                    {submitted && !extra.availability &&
                      <div className="help-block">Email is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !extra.drivingLicenseTypeId ? ' has-error' : '')}>
                  <label htmlFor="">Carnet de conducir</label>
                  <input type="text"className="form-control" name="drivingLicenseTypeId" value={extra.drivingLicenseTypeId} onChange={this.handleChange} />
                    {submitted && !extra.drivingLicenseTypeId &&
                      <div className="help-block">Email is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !extra.hobbies ? ' has-error' : '')}>
                  <label htmlFor="">Aficiones</label>
                  <input type="text"className="form-control" name="hobbies" value={extra.hobbies} onChange={this.handleChange} />
                    {submitted && !extra.hobbies &&
                      <div className="help-block">Email is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !extra.extraExperience ? ' has-error' : '')}>
                  <label htmlFor="">Experiencia como extra</label>
                  <input type="text"className="form-control" name="extraExperience" value={extra.extraExperience} onChange={this.handleChange} />
                    {submitted && !extra.extraExperience &&
                      <div className="help-block">Email is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !extra.danceExperience ? ' has-error' : '')}>
                  <label htmlFor="">Experiencia baile</label>
                  <input type="text"className="form-control" name="danceExperience" value={extra.danceExperience} onChange={this.handleChange} />
                    {submitted && !extra.danceExperience &&
                      <div className="help-block">Email is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !extra.singingExperience ? ' has-error' : '')}>
                  <label htmlFor="">Experiencia canto</label>
                  <input type="text"className="form-control" name="singingExperience" value={extra.singingExperience} onChange={this.handleChange} />
                    {submitted && !extra.singingExperience &&
                      <div className="help-block">Email is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !extra.seaExperience ? ' has-error' : '')}>
                  <label htmlFor="">Experiencia mar</label>
                  <input type="text"className="form-control" name="seaExperience" value={extra.seaExperience} onChange={this.handleChange} />
                    {submitted && !extra.seaExperience &&
                      <div className="help-block">Email is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !extra.waiterExperience ? ' has-error' : '')}>
                  <label htmlFor="">Experiencia camarero</label>
                  <input type="text"className="form-control" name="waiterExperience" value={extra.waiterExperience} onChange={this.handleChange} />
                    {submitted && !extra.waiterExperience &&
                      <div className="help-block">Email is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !extra.otherExperience ? ' has-error' : '')}>
                  <label htmlFor="">Otra Experiencia</label>
                  <input type="text"className="form-control" name="otherExperience" value={extra.otherExperience} onChange={this.handleChange} />
                    {submitted && !extra.otherExperience &&
                      <div className="help-block">Email is required</div>
                    }
                </div>
                <div className="form-group">
                  <button className="btn btn-primary">Añadir extra</button>
                  {adding &&
                      <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                  }
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { adding, wear } = state;
  return {
    adding,
    wear
  };
}

const connectedAddNewExtraContent = connect(mapStateToProps)(AddNewExtraContent);
export { connectedAddNewExtraContent as AddNewExtraContent };