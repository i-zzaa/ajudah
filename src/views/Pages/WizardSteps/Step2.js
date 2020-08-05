import React, { useState } from 'react';
import PropTypes from 'prop-types';
// @material-ui/icons
import Face from '@material-ui/icons/Face';
import RecentActors from '@material-ui/icons/RecentActors';
import CreditCard from '@material-ui/icons/CreditCard';
import Today from '@material-ui/icons/Today';
import PictureInPictureAlt from '@material-ui/icons/PictureInPictureAlt';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';

// core components
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import PictureUpload from '@/components/CustomUpload/PictureUpload';
import CustomInput from '@/components/CustomInput/CustomInput';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

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

export default function Step2() {
  const [form, setForm] = useState({
    numero: '',
    titular: '',
    cpf: '',
    vencimento: '',
    codigo: '',
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  });
  const classes = useStyles();

  const sendForm = () => {
    return form;
  };

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
    if (value.length >= length) {
      return true;
    }
    return false;
  };

  const change = (event, stateName, type, stateNameEqualTo) => {
    if (!Object.keys(event).length) return;

    switch (type) {
      case 'email':
        if (verifyEmail(event.target.value)) {
          setForm({ [`${stateName}State`]: 'success' });
        } else {
          setForm({ [`${stateName}State`]: 'error' });
        }
        break;
      case 'length':
        if (verifyLength(event.target.value, stateNameEqualTo)) {
          setForm({ [`${stateName}State`]: 'success' });
        } else {
          setForm({ [`${stateName}State`]: 'error' });
        }
        break;
      default:
        break;
    }
    setForm({ ...form, [stateName]: event.target.value });
  };

  const isValidated = () => {
    if (
      form.firstnameState === 'success' &&
      form.lastnameState === 'success' &&
      form.emailState === 'success'
    ) {
      return true;
    }
    if (form.firstnameState !== 'success') {
      setForm({ firstnameState: 'error' });
    }
    if (form.lastnameState !== 'success') {
      setForm({ lastnameState: 'error' });
    }
    if (form.emailState !== 'success') {
      setForm({ emailState: 'error' });
    }

    return false;
  };

  return (
    <GridContainer justify="center">
      <div id="PaymentForm">
        <Cards
          cvc={form.cvc}
          expiry={form.expiry}
          focused={form.focus}
          name={form.name}
          number={form.number}
        />
      </div>
      <GridItem xs={12} sm={4}>
        <CustomInput
          success={form.numeroState === 'success'}
          error={form.numeroState === 'error'}
          labelText={
            <span>
              Número do cartão <small>(obrigatório)</small>
            </span>
          }
          type="tel"
          name="number"
          formControlProps={{
            fullWidth: true,
          }}
          onChange={(e) => setForm({ ...form, number: e.target.value })}
          onFocus={(e) => setForm({ ...form, focus: 'number' })}
          inputProps={{
            name: 'number',
            endAdornment: (
              <InputAdornment position="end" className={classes.inputAdornment}>
                <CreditCard className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
          }}
        />
        <CustomInput
          success={form.cpfState === 'success'}
          error={form.cpfState === 'error'}
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
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          onFocus={(e) => setForm({ ...form, focus: 'name' })}
          inputProps={{
            name: 'name',
            endAdornment: (
              <InputAdornment position="end" className={classes.inputAdornment}>
                <Face className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
          }}
        />

        <CustomInput
          success={form.codState === 'success'}
          error={form.codState === 'error'}
          labelText={
            <span>
              CPF <small>(obrigatório)</small>
            </span>
          }
          id="cpf"
          onChange={(e) => setForm({ ...form, cpf: e.target.value })}
          onFocus={(e) => setForm({ ...form, focus: 'cpf' })}
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            name: 'cpf',
            endAdornment: (
              <InputAdornment position="end" className={classes.inputAdornment}>
                <RecentActors className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
          }}
        />
      </GridItem>
      <GridItem xs={12} sm={3}>
        <CustomInput
          success={form.vencimentoState === 'success'}
          error={form.vencimentoState === 'error'}
          labelText={
            <span>
              Vencimento <small>(obrigatório)</small>
            </span>
          }
          id="expiry"
          formControlProps={{
            fullWidth: true,
          }}
          onChange={(e) => setForm({ ...form, expiry: e.target.value })}
          onFocus={(e) => setForm({ ...form, focus: 'expiry' })}
          inputProps={{
            name: 'expiry',
            endAdornment: (
              <InputAdornment position="end" className={classes.inputAdornment}>
                <Today className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
          }}
        />
        <CustomInput
          success={form.titularState === 'success'}
          error={form.titularState === 'error'}
          labelText={
            <span>
              Código do cartão <small>(obrigatório)</small>
            </span>
          }
          id="cvc"
          onChange={(e) => setForm({ ...form, cvc: e.target.value })}
          onFocus={(e) => setForm({ ...form, focus: 'cvc' })}
          formControlProps={{
            fullWidth: true,
            name: 'cvc',
          }}
          inputProps={{
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
