import React from 'react';
import { connect } from 'react-redux';

import { extraActions, wearActions, bodyActions, populationsActions, drivingLicensesActions } from '../_actions';
import { extraService } from '../_services';

class AddNewExtraContent extends React.Component {
  constructor(props) {
    super(props);

    this.images = [];

    this.state = {
      extra: {
        id: '',
        name: '',
        lastName: '',
        insuranceNumber: '',
        vatNumber: '',
        birthday: '',
        genre: '',
        phone: '',
        address: '',
        localityId: null,
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
        extraExperience: 0,
        danceExperience: 0,
        singingExperience: 0,
        seaExperience: 0,
        waiterExperience: 0,
        otherExperience: '',
        faceImage: '',
        bodyImage: ''
      },
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const { extra } = this.state;

    this.setState({
      extra: {
        ...extra,
        [name]: value
      }
    });

    console.log(extra);
  }

  handleUploadImage(event) {
    const target = event.target;
    const name = target.name;

    this.images = this.images.filter((el) => el.name !== name);
    this.images.push(target);
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { extra } = this.state;
    const { dispatch } = this.props;

    if (extra.insuranceNumber && extra.vatNumber) {
      this.images.forEach((el) => {
        const extension = (/[.]/.exec(el.files[0].type)) ? + /[^.]+$/.exec(el.files[0].type)[0] : undefined;
        const name = this.state.extra.id + el.name + extension;
        console.log(name);
        const data = new FormData();

        data.append('file', el.files[0], name);

        fetch('http://localhost:5000/api/v1/utils/upload_image', {
          method: 'POST',
          body: data,
        }).then((response) => {
          console.log('enviada');
        })
      });

      dispatch(extraActions.add(extra));
    }

    // const name = this.state.extra.id + this.uploadInput.name + '.jpg';
    // console.log(name);
    // const data = new FormData();
    // data.append('file', this.uploadInput.files[0], name);

    // fetch('http://localhost:5000/api/v1/utils/upload_image', {
    //   method: 'POST',
    //   body: data,
    // }).then((response) => {
    //   response.json().then((body) => {
    //     this.setState({ imageURL: `http://localhost:5000/api/v1/${body.file}` });
    //   });
    //   console.log('enviada');
    // });
  }

  componentDidMount() {
    this.props.dispatch(wearActions.getTshirtSizes());
    this.props.dispatch(wearActions.getTrouserSizes());
    this.props.dispatch(wearActions.getFootSizes());
    this.props.dispatch(wearActions.getFootSizes());
    this.props.dispatch(bodyActions.getHairColors());
    this.props.dispatch(bodyActions.getEyesColors());
    // this.props.dispatch(populationsActions.getAllLocalities());
    this.props.dispatch(populationsActions.getAllProvinces());
    this.props.dispatch(drivingLicensesActions.getAllLicenses());
    this.props.dispatch(extraActions.getNewId());
  }

  componentDidUpdate(prevProps) {
    if (this.props.addExtra !== prevProps.addExtra) {
      const { extra } = this.state;
      setTimeout(() => this.setState({
        extra: {
          ...extra,
          id: this.props.addExtra.id.data
        }
      }), 1000)
    }
  }

  render() {
    const { adding, wear, body, populations, drivingLicenses } = this.props;
    const { extra, submitted } = this.state;
    return (
      <div>
        <h1>New extra</h1>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-10 offset-md-1">
              <form name="addExtraForm" onSubmit={this.handleSubmit}>
                <div className="form-row">
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      {extra.loading && <em>Loading provinces...</em>}
                      {extra.id &&
                        <input type="text" className="form-control" name="id" value={extra.id} onChange={this.handleChange} disabled />
                      }
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-12 col-md-6">
                    <div className="custom-file">
                      <input ref={(ref) => { this.uploadInput = ref; }} type="file" name="faceImage" className="custom-file-input" onChange={this.handleUploadImage} />
                      <label className="custom-file-label">Fotografía de la cara</label>
                    </div>

                  </div>
                </div>
                <div className="form-row">
                  <div className="col-12 col-md-6">
                    <div className={'form-group' + (submitted && !extra.name ? ' has-error' : '')}>
                      <label htmlFor="">Nombre</label>
                      <input type="text" className="form-control" name="name" value={extra.name} onChange={this.handleChange} />
                      {submitted && !extra.name &&
                        <div className="help-block">Email is required</div>
                      }
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className={'form-group' + (submitted && !extra.lastName ? ' has-error' : '')}>
                      <label htmlFor="">Apellidos</label>
                      <input type="text" className="form-control" name="lastName" value={extra.lastName} onChange={this.handleChange} />
                      {submitted && !extra.lastName &&
                        <div className="help-block">Email is required</div>
                      }
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-12 col-md-6">
                    <div className={'form-group' + (submitted && !extra.vatNumber ? ' has-error' : '')}>
                      <label htmlFor="">NIF</label>
                      <input type="text" className="form-control" name="vatNumber" value={extra.vatNumber} onChange={this.handleChange} />
                      {submitted && !extra.vatNumber &&
                        <div className="help-block">Email is required</div>
                      }
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className={'form-group' + (submitted && !extra.insuranceNumber ? ' has-error' : '')}>
                      <label htmlFor="">Número Seguridad Social</label>
                      <input type="text" className="form-control" name="insuranceNumber" value={extra.insuranceNumber} onChange={this.handleChange} />
                      {submitted && !extra.insuranceNumber &&
                        <div className="help-block">Email is required</div>
                      }
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-12 col-md-4">
                    <div className={'form-group' + (submitted && !extra.email ? ' has-error' : '')}>
                      <label htmlFor="">Fecha de nacimiento</label>
                      <input type="date" className="form-control" name="birthday" value={extra.birthday} onChange={this.handleChange} />
                      {submitted && !extra.birthday &&
                        <div className="help-block">Email is required</div>
                      }
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className={'form-group' + (submitted && !extra.genre ? ' has-error' : '')}>
                      <label htmlFor="">Sexo</label>
                      <input type="text" className="form-control" name="genre" value={extra.genre} onChange={this.handleChange} />
                      {submitted && !extra.genre &&
                        <div className="help-block">Email is required</div>
                      }
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className={'form-group' + (submitted && !extra.phone ? ' has-error' : '')}>
                      <label htmlFor="">Teléfono</label>
                      <input type="text" className="form-control" name="phone" value={extra.phone} onChange={this.handleChange} />
                      {submitted && !extra.phone &&
                        <div className="help-block">Email is required</div>
                      }
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-12">
                    <div className={'form-group' + (submitted && !extra.address ? ' has-error' : '')}>
                      <label htmlFor="">Dirección</label>
                      <input type="text" className="form-control" name="address" value={extra.address} onChange={this.handleChange} />
                      {submitted && !extra.address &&
                        <div className="help-block">Email is required</div>
                      }
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  {/* <div className="col-12 col-md-4">
                    <div className={'form-group' + (submitted && !extra.localityId ? ' has-error' : '')}>
                      <label htmlFor="">Localidad</label>
                      {populations.loading && <em>Loading localities...</em>}
                      {populations.localities &&
                        <select name="tshirt" className="form-control" onChange={this.handleChange}>
                          {populations.localities.data.map((t) =>
                            <option key={t.id} value={t.id}>{t.name}</option>
                          )}
                        </select>
                      }
                    </div>
                  </div> */}
                  <div className="col-12 col-md-4">
                    <div className={'form-group' + (submitted && !extra.provinceId ? ' has-error' : '')}>
                      <label htmlFor="">Provincia</label>
                      {populations.loading && <em>Loading provinces...</em>}
                      {populations.provinces &&
                        <select name="provinceId" className="form-control" value={extra.provinceId} onChange={this.handleChange}>
                          {populations.provinces.data.map((t) =>
                            <option key={t.id} value={t.id}>{t.name}</option>
                          )}
                        </select>
                      }
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className={'form-group' + (submitted && !extra.nationality ? ' has-error' : '')}>
                      <label htmlFor="">Nacionalidad</label>
                      <input type="text" className="form-control" name="nationality" value={extra.nationality} onChange={this.handleChange} />
                      {submitted && !extra.nationality &&
                        <div className="help-block">Email is required</div>
                      }
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-12 col-md-3">
                    <div className={'form-group' + (submitted && !extra.height ? ' has-error' : '')}>
                      <label htmlFor="">Altura</label>
                      <input type="text" className="form-control" name="height" value={extra.height} onChange={this.handleChange} />
                      {submitted && !extra.height &&
                        <div className="help-block">Email is required</div>
                      }
                    </div>
                  </div>
                  <div className="col-12 col-md-3">
                    <div className={'form-group' + (submitted && !extra.weight ? ' has-error' : '')}>
                      <label htmlFor="">Peso</label>
                      <input type="text" className="form-control" name="weight" value={extra.weight} onChange={this.handleChange} />
                      {submitted && !extra.weight &&
                        <div className="help-block">Email is required</div>
                      }
                    </div>
                  </div>
                  <div className="col-12 col-md-3">
                    <div className={'form-group' + (submitted && !extra.eyeColorId ? ' has-error' : '')}>
                      <label htmlFor="">Color de ojos</label>
                      {body.loading && <em>Loading eyes...</em>}
                      {body.eyes &&
                        <select name="eyeColorId" className="form-control" value={extra.eyeColorId} onChange={this.handleChange}>
                          {body.eyes.data.map((t) =>
                            <option key={t.id} value={t.id}>{t.name}</option>
                          )}
                        </select>
                      }
                    </div>
                  </div>
                  <div className="col-12 col-md-3">
                    <div className={'form-group' + (submitted && !extra.hairColorId ? ' has-error' : '')}>
                      <label htmlFor="">Color de pelo</label>
                      {body.loading && <em>Loading hairs...</em>}
                      {body.hairs &&
                        <select name="hairColorId" className="form-control" value={extra.hairColorId} onChange={this.handleChange}>
                          {body.hairs.data.map((t) =>
                            <option key={t.id} value={t.id}>{t.name}</option>
                          )}
                        </select>
                      }
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-12 col-md-4">
                    <div className={'form-group' + (submitted && !extra.tshirtSizeId ? ' has-error' : '')}>
                      <label htmlFor="">Talla de camiseta</label>
                      {wear.loading && <em>Loading tshirt...</em>}
                      {wear.tshirts &&
                        <select name="tshirtSizeId" className="form-control" value={extra.tshirtSizeId} onChange={this.handleChange}>
                          {wear.tshirts.data.map((t) =>
                            <option key={t.id} value={t.id}>{t.size}</option>
                          )}
                        </select>
                      }
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className={'form-group' + (submitted && !extra.trouserSizeId ? ' has-error' : '')}>
                      <label htmlFor="">Talla de pantalón</label>
                      {wear.loading && <em>Loading tshirt...</em>}
                      {wear.trousers &&
                        <select name="trouserSizeId" className="form-control" value={extra.trouserSizeId} onChange={this.handleChange}>
                          {wear.trousers.data.map((t) =>
                            <option key={t.id} value={t.id}>{t.size}</option>
                          )}
                        </select>
                      }
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className={'form-group' + (submitted && !extra.footSizeId ? ' has-error' : '')}>
                      <label htmlFor="">Talla de pie</label>
                      {wear.loading && <em>Loading tshirt...</em>}
                      {wear.foots &&
                        <select name="footSizeId" className="form-control" value={extra.footSizeId} onChange={this.handleChange}>
                          {wear.foots.data.map((t) =>
                            <option key={t.id} value={t.id}>{t.size}</option>
                          )}
                        </select>
                      }
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-12 col-md-6">
                    <div className={'form-group' + (submitted && !extra.profession ? ' has-error' : '')}>
                      <label htmlFor="">Profesión</label>
                      <input type="text" className="form-control" name="profession" value={extra.profession} onChange={this.handleChange} />
                      {submitted && !extra.profession &&
                        <div className="help-block">Email is required</div>
                      }
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className={'form-group' + (submitted && !extra.availability ? ' has-error' : '')}>
                      <label htmlFor="">Disponibilidad</label>
                      <input type="text" className="form-control" name="availability" value={extra.availability} onChange={this.handleChange} />
                      {submitted && !extra.availability &&
                        <div className="help-block">Email is required</div>
                      }
                    </div>
                  </div>
                </div>
                <div className={'form-group' + (submitted && !extra.drivingLicenseTypeId ? ' has-error' : '')}>
                  <label htmlFor="">Carnet de conducir</label>
                  {drivingLicenses.loading && <em>Loading tshirt...</em>}
                  {drivingLicenses.types &&
                    <select name="drivingLicenseTypeId" className="form-control" value={extra.drivingLicenseTypeId} onChange={this.handleChange}>
                      {drivingLicenses.types.data.map((t) =>
                        <option key={t.id} value={t.id}>{t.type}</option>
                      )}
                    </select>
                  }
                </div>
                <div className={'form-group' + (submitted && !extra.hobbies ? ' has-error' : '')}>
                  <label htmlFor="">Aficiones</label>
                  <input type="text" className="form-control" name="hobbies" value={extra.hobbies} onChange={this.handleChange} />
                  {submitted && !extra.hobbies &&
                    <div className="help-block">Email is required</div>
                  }
                </div>
                <div className="form-row">
                  <div className="col">
                    <div className={'form-group' + (submitted && !extra.extraExperience ? ' has-error' : '')}>
                      <div className="form-check">
                        <input className="form-check-input" name="extraExperience" type="checkbox" checked={extra.extraExperience} onChange={this.handleChange} />
                        <label className="form-check-label" htmlFor="">Extra</label>
                      </div>
                      {submitted && !extra.extraExperience &&
                        <div className="help-block">Email is required</div>
                      }
                    </div>
                  </div>
                  <div className="col">
                    <div className={'form-group' + (submitted && !extra.danceExperience ? ' has-error' : '')}>
                      <div className="form-check">
                        <input className="form-check-input" name="danceExperience" type="checkbox" checked={extra.danceExperience} onChange={this.handleChange} />
                        <label className="form-check-label" htmlFor="">Baile</label>
                      </div>
                      {submitted && !extra.danceExperience &&
                        <div className="help-block">Email is required</div>
                      }
                    </div>
                  </div>
                  <div className="col">
                    <div className={'form-group' + (submitted && !extra.singingExperience ? ' has-error' : '')}>
                      <div className="form-check">
                        <input className="form-check-input" name="singingExperience" type="checkbox" checked={extra.singingExperience} onChange={this.handleChange} />
                        <label className="form-check-label" htmlFor="">Canto</label>
                      </div>
                      {submitted && !extra.singingExperience &&
                        <div className="help-block">Email is required</div>
                      }
                    </div>
                  </div>
                  <div className="col">
                    <div className={'form-group' + (submitted && !extra.seaExperience ? ' has-error' : '')}>
                      <div className="form-check">
                        <input className="form-check-input" name="seaExperience" type="checkbox" checked={extra.seaExperience} onChange={this.handleChange} />
                        <label className="form-check-label" htmlFor="">Mar</label>
                      </div>
                      {submitted && !extra.seaExperience &&
                        <div className="help-block">Email is required</div>
                      }
                    </div>
                  </div>
                  <div className="col">
                    <div className={'form-group' + (submitted && !extra.waiterExperience ? ' has-error' : '')}>
                      <div className="form-check">
                        <input className="form-check-input" name="waiterExperience" type="checkbox" checked={extra.waiterExperience} onChange={this.handleChange} />
                        <label className="form-check-label" htmlFor="">Camarero</label>
                      </div>
                      {submitted && !extra.waiterExperience &&
                        <div className="help-block">Email is required</div>
                      }
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-12">
                    <div className={'form-group' + (submitted && !extra.otherExperience ? ' has-error' : '')}>
                      <label htmlFor="">Otra Experiencia</label>
                      <input type="text" className="form-control" name="otherExperience" value={extra.otherExperience} onChange={this.handleChange} />
                      {submitted && !extra.otherExperience &&
                        <div className="help-block">Email is required</div>
                      }
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="col">
                    <div className="form-group">
                      <button className="btn btn-primary">Añadir extra</button>
                      {adding &&
                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                      }
                    </div>
                  </div>
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
  const { adding, wear, body, populations, drivingLicenses, addExtra } = state;
  return {
    adding,
    addExtra,
    wear,
    body,
    populations,
    drivingLicenses
  };
}

const connectedAddNewExtraContent = connect(mapStateToProps)(AddNewExtraContent);
export { connectedAddNewExtraContent as AddNewExtraContent };