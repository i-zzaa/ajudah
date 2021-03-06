import React, { useState, useEffect } from 'react';
// @material-ui/icons
import Face from '@material-ui/icons/Face';
import CreditCard from '@material-ui/icons/CreditCard';
import PictureInPictureAlt from '@material-ui/icons/PictureInPictureAlt';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';

// core components
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import CustomInput from '@/components/CustomInput/CustomInput';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { KeyboardDatePicker } from '@material-ui/pickers';
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

export default function Step2({ valid }) {
  const [form, setForm] = useState({
    user_id: JSON.parse(localStorage.getItem('user_id')),
    cvv: '',
    focus: '',
    name: '',
    number: '',
    validity: '',
  });

  const [state, setStates] = useState({
    user_id: JSON.parse(localStorage.getItem('user_id')) ? 'success' : 'error',
    cvv: '',
    focus: '',
    name: '',
    number: '',
    validity: '',
  });
  const classes = useStyles();

  // function that verifies if a string has a given length or not
  const verifyLength = (value, length) => {
    if (value.length >= length[0] && value.length <= length[1]) {
      return true;
    }
    return false;
  };

  const change = (event, stateName, type, stateNameEqualTo) => {
    if (!Object.keys(event).length) return;

    switch (type) {
      case 'length':
        if (verifyLength(event.target.value, stateNameEqualTo)) {
          setStates({ ...state, [`${stateName}State`]: 'success' });
        } else {
          setStates({ ...state, [`${stateName}State`]: 'error' });
        }
        break;
      default:
        break;
    }
    setForm({ ...form, [stateName]: event.target.value });
    localStorage.setItem('step2', JSON.stringify(form));
  };

  const isValidated = () => {
    if (
      state.user_id === 'success' &&
      state.cvv === 'success' &&
      state.focus === 'success' &&
      state.name === 'success' &&
      state.number === 'success' &&
      state.validity === 'success'
    ) {
      // onSubmit(form);
      return true;
    }
    if (state.user_id !== 'success') {
      setStates({ ...state, user_id: 'error' });
    }
    if (state.cvv !== 'success') {
      setStates({ ...state, cvv: 'error' });
    }
    if (state.focus !== 'success') {
      setStates({ ...state, focus: 'error' });
    }
    if (state.name !== 'success') {
      setStates({ ...state, name: 'error' });
    }
    if (state.number !== 'success') {
      setStates({ ...state, number: 'error' });
    }
    if (state.validity !== 'success') {
      setStates({ ...state, validity: 'error' });
    }
    return false;
  };

  useEffect(() => {
    if (valid) {
      isValidated();
    }
  }, [valid]);

  return (
    <GridContainer justify="center">
      <div id="PaymentForm">
        <Cards
          cvc={form.cvv}
          expiry={form.validity}
          focused={form.focus}
          name={form.name}
          number={form.number}
        />
      </div>
      <GridItem xs={11} sm={4}>
        <CustomInput
          success={state.number === 'success'}
          error={state.number === 'error'}
          labelText={
            <span>
              Número do cartão <small>(obrigatório)</small>
            </span>
          }
          type="number"
          name="number"
          formControlProps={{
            fullWidth: true,
          }}
          onBlur={() => {
            localStorage.setItem('step2', JSON.stringify(form));
          }}
          onChange={(event) => change(event, 'number', 'length', [16, 16])}
          onFocus={() => setForm({ ...form, focus: 'number' })}
          inputProps={{
            maxLength: 16,
            name: 'number',
            endAdornment: (
              <InputAdornment position="end" className={classes.inputAdornment}>
                <CreditCard className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
          }}
        />
        <CustomInput
          success={state.name === 'success'}
          error={state.name === 'error'}
          labelText={
            <span>
              Titular do cartão <small>(obrigatório)</small>
            </span>
          }
          id="name"
          type="tel"
          formControlProps={{
            fullWidth: true,
          }}
          onBlur={() => {
            localStorage.setItem('step2', JSON.stringify(form));
          }}
          onChange={(event) => change(event, 'name', 'length', [5, 50])}
          onFocus={() => setForm({ ...form, focus: 'name' })}
          inputProps={{
            name: 'name',
            endAdornment: (
              <InputAdornment position="end" className={classes.inputAdornment}>
                <Face className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
          }}
        />
      </GridItem>
      <GridItem xs={11} sm={3}>
        <KeyboardDatePicker
          autoOk
          style={{ width: '100%' }}
          variant="inline"
          format="MM/yyyy"
          margin="normal"
          views={['year', 'month']}
          id="validity"
          label={
            <span>
              Vencimento <small>(obrigatório)</small>
            </span>
          }
          value={
            form.validity
              ? [form.validity.split('/')[1], form.validity.split('/')[0] - 1]
              : null
          }
          onBlur={() => {
            localStorage.setItem('step2', JSON.stringify(form));
          }}
          onChange={() => {
            setForm({ ...form, validity: moment().format('MM/yyyy') });
            console.log(form.validity.split('/'));
          }}
          onFocus={() => setForm({ ...form, focus: 'validity' })}
        />

        <CustomInput
          success={state.cvc === 'success'}
          error={state.cvc === 'error'}
          labelText={
            <span>
              Código do cartão <small>(obrigatório)</small>
            </span>
          }
          id="cvc"
          onBlur={() => {
            localStorage.setItem('step2', JSON.stringify(form));
          }}
          onChange={(event) => change(event, 'cvv', 'length', [3, 3])}
          onFocus={() => setForm({ ...form, focus: 'cvc' })}
          formControlProps={{
            fullWidth: true,
            name: 'cvc',
          }}
          inputProps={{
            style: { marginTop: 3 },
            maxLength: 3,
            name: 'cvc',
            endAdornment: (
              <InputAdornment position="end" className={classes.inputAdornment}>
                <PictureInPictureAlt className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
          }}
        />
      </GridItem>
    </GridContainer>
  );
}
