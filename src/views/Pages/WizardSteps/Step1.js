import React, { useState, useEffect } from 'react';

// @material-ui/icons
import Face from '@material-ui/icons/Face';
import BrandingWatermark from '@material-ui/icons/BrandingWatermark';
import Email from '@material-ui/icons/Email';
import Fingerprint from '@material-ui/icons/Fingerprint';
import Lock from '@material-ui/icons/Lock';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import { KeyboardDatePicker } from '@material-ui/pickers';

// core components
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import CustomInput from '@/components/CustomInput/CustomInput';
import MaskedInput from 'react-text-mask';
import api from '@/services/api';
import SweetAlert from 'react-bootstrap-sweetalert';
import { useHistory } from 'react-router-dom';
import * as moment from 'moment';

const style = {
  infoText: {
    fontWeight: '300',
    margin: '10px 0 30px',
    textAlign: 'center',
  },
  inputAdornmentIcon: {
    color: '#555',
  },
  inputAdornment: {
    position: 'relative',
  },
};
const useStyles = makeStyles(style);

const TextMaskCPF = (props) => {
  const { inputRef, ...other } = props;
  const cpfRex = [
    /\d/,
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
  ];

  return (
    <MaskedInput
      {...other}
      ref={inputRef || null}
      mask={cpfRex}
      placeholderChar={'\u2000'}
    />
  );
};

const TextMaskRG = (props) => {
  const { inputRef, ...other } = props;
  const rgfRex = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/];

  return (
    <MaskedInput
      {...other}
      ref={inputRef || null}
      mask={rgfRex}
      placeholderChar={'\u2000'}
    />
  );
};

export default function Step1() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    cpf: '',
    rg: '',
    date_birth: null,
    matricula: '',
    siap: '',
    password: '',
  });
  const [state, setState] = useState({
    name: '',
    email: '',
    cpf: '',
    rg: '',
    date_birth: null,
    matricula: '',
    siap: '',
    password: '',
  });
  const classes = useStyles();

  const history = useHistory();
  const [alert, setAlert] = React.useState(null);

  // function that returns true if value is email, false otherwise
  const verifyEmail = (value) => {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  };

  // function that verifies if a string has a given length or not
  const verifyLength = (value, length) => {
    if (value.length >= length[0] && value.length <= length[1]) {
      return true;
    }
    return false;
  };

  const isValidated = () => {
    if (
      state.name === 'success' &&
      state.email === 'success' &&
      state.cpf === 'success' &&
      state.rg === 'success' &&
      state.date_birth === 'success' &&
      state.matricula === 'success' &&
      state.siap === 'success' &&
      state.password === 'success'
    ) {
      // onSubmit(form);
    } else {
      if (state.name !== 'success') {
        setState({ ...state, name: 'error' });
      }
      if (state.email !== 'success') {
        setState({ ...state, email: 'error' });
      }
      if (state.cpf !== 'success') {
        setState({ ...state, cpf: 'error' });
      }
      if (state.rg !== 'success') {
        setState({ ...state, rg: 'error' });
      }
      if (state.date_birth !== 'success') {
        setState({ ...state, date_birth: 'error' });
      }
      if (state.matricula !== 'success') {
        setState({ ...state, matricula: 'error' });
      }
      if (state.siap !== 'success') {
        setState({ ...state, siap: 'error' });
      }
      if (state.password !== 'success') {
        setState({ ...state, password: 'error' });
      }
      return false;
    }
  };

  const isValidatedInd = (value) => {
    if (state[value] === 'success') {
      const formVazio = Object.values(form).filter((valueForm) => !valueForm);
      if (formVazio.length === 0) {
        isValidated();
      }
      return true;
    }
    return false;
  };

  const change = (event, stateName, type, stateNameEqualTo) => {
    switch (type) {
      case 'email':
        if (verifyEmail(event.target.value)) {
          setState({ ...state, [`${stateName}`]: 'success' });
        } else {
          setState({ ...state, [`${stateName}`]: 'error' });
        }
        break;
      case 'length':
        if (verifyLength(event.target.value, stateNameEqualTo)) {
          setState({ ...state, [`${stateName}`]: 'success' });
        } else {
          setState({ ...state, [`${stateName}`]: 'error' });
        }
        break;
      case 'date':
        setState({ ...state, [`${stateName}`]: 'success' });
        setForm({
          ...form,
          [`${stateName}`]: moment(event).format('YYYY-MM-DD'),
        });
        break;
      default:
        break;
    }

    if (type !== 'date') setForm({ ...form, [stateName]: event.target.value });
    isValidatedInd(stateName);
  };

  return (
    <GridContainer justify="center">
      <GridItem xs={11} sm={5}>
        <CustomInput
          success={state.name === 'success'}
          error={state.name === 'error'}
          labelText={
            <span>
              Nome <small>(obrigatório)</small>
            </span>
          }
          id="name"
          formControlProps={{
            fullWidth: true,
          }}
          onChange={(event) => change(event, 'name', 'length', [5, 256])}
          onBlur={(e) => {
            localStorage.setItem('step1', JSON.stringify(form));
          }}
          inputProps={{
            endAdornment: (
              <InputAdornment position="end" className={classes.inputAdornment}>
                <Face className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
          }}
        />
        <CustomInput
          success={state.cpf === 'success'}
          error={state.cpf === 'error'}
          labelText={
            <span>
              CPF <small>(obrigatório)</small>
            </span>
          }
          id="cpf"
          formControlProps={{
            fullWidth: true,
          }}
          onChange={(event) => change(event, 'cpf', 'length', [14, 14])}
          onBlur={(e) => {
            localStorage.setItem('step1', JSON.stringify(form));
          }}
          inputProps={{
            inputComponent: TextMaskCPF,
            endAdornment: (
              <InputAdornment position="end" className={classes.inputAdornment}>
                <BrandingWatermark className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
          }}
        />
        <KeyboardDatePicker
          autoOk
          style={{ width: '100%' }}
          variant="inline"
          format="DD/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label={
            <span>
              Data de nascimento <small>(obrigatório)</small>
            </span>
          }
          value={form.date_birth}
          onChange={(value) => {
            change(value, 'date_birth', 'date');
          }}
          onBlur={(e) => {
            localStorage.setItem('step1', JSON.stringify(form));
          }}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <CustomInput
          success={state.siap === 'success'}
          error={state.siap === 'error'}
          labelText={
            <span>
              Siap <small>(obrigatório)</small>
            </span>
          }
          id="siap"
          formControlProps={{
            fullWidth: true,
          }}
          onChange={(event) => change(event, 'siap', 'length', [6, 6])}
          onBlur={(e) => {
            localStorage.setItem('step1', JSON.stringify(form));
          }}
          inputProps={{
            endAdornment: (
              <InputAdornment position="end" className={classes.inputAdornment}>
                <BrandingWatermark className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
          }}
        />
      </GridItem>
      <GridItem xs={11} sm={5}>
        <CustomInput
          success={state.email === 'success'}
          error={state.email === 'error'}
          labelText={
            <span>
              Email <small>(obrigatório)</small>
            </span>
          }
          id="email"
          formControlProps={{
            fullWidth: true,
          }}
          onChange={(event) => change(event, 'email', 'email')}
          onBlur={(e) => {
            localStorage.setItem('step1', JSON.stringify(form));
          }}
          inputProps={{
            endAdornment: (
              <InputAdornment position="end" className={classes.inputAdornment}>
                <Email className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
          }}
        />
        <CustomInput
          success={state.rg === 'success'}
          error={state.rg === 'error'}
          labelText={
            <span>
              RG <small>(obrigatório)</small>
            </span>
          }
          id="rg"
          formControlProps={{
            fullWidth: true,
          }}
          onChange={(event) => change(event, 'rg', 'length', [10, 10])}
          onBlur={(e) => {
            localStorage.setItem('step1', JSON.stringify(form));
          }}
          inputProps={{
            inputComponent: TextMaskRG,
            endAdornment: (
              <InputAdornment position="end" className={classes.inputAdornment}>
                <Fingerprint className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
          }}
        />
        <CustomInput
          success={state.matricula === 'success'}
          error={state.matricula === 'error'}
          labelText={
            <span>
              Matrícula <small>(obrigatório)</small>
            </span>
          }
          id="matricula"
          formControlProps={{
            fullWidth: true,
          }}
          onChange={(event) => change(event, 'matricula', 'length', [6, 256])}
          onBlur={(e) => {
            localStorage.setItem('step1', JSON.stringify(form));
          }}
          inputProps={{
            endAdornment: (
              <InputAdornment position="end" className={classes.inputAdornment}>
                <BrandingWatermark className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
          }}
        />
        <CustomInput
          success={state.password === 'success'}
          error={state.password === 'error'}
          labelText={
            <span>
              Senha <small>(obrigatório)</small>
            </span>
          }
          id="password"
          formControlProps={{
            fullWidth: true,
          }}
          onChange={(event) => change(event, 'password', 'length', [6, 256])}
          onBlur={(e) => {
            localStorage.setItem('step1', JSON.stringify(form));
          }}
          inputProps={{
            type: 'password',
            endAdornment: (
              <InputAdornment position="end" className={classes.inputAdornment}>
                <Lock className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
          }}
        />
      </GridItem>
    </GridContainer>
  );
}
