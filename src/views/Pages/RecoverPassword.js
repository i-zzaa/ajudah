import React, { useState } from 'react';

import { useHistory, useParams } from 'react-router-dom';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import SweetAlert from 'react-bootstrap-sweetalert';

// @material-ui/icons
import Email from '@material-ui/icons/Email';

// import LockOutline from "@material-ui/icons/LockOutline";
import Check from '@material-ui/icons/Check';

// core components
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import Button from '@/components/CustomButtons/Button';
import CustomInput from '@/components/CustomInput/CustomInput';
import Card from '@/components/Card/Card';
import CardBody from '@/components/Card/CardBody';

import styles from '@/assets/jss/material-dashboard-pro-react/views/registerPageStyle';
// import { login } from '../../services/auth';
import api from '../../services/api';

const useStyles = makeStyles(styles);

export default function RegisterPage() {
  const history = useHistory();
  const [alert, setAlert] = React.useState(null);

  const [checked, setChecked] = useState([]);
  const [forms, setForms] = useState({
    username: '',
    email: '',
    cpf: '',
    rg: '',
    password: '',
  });
  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const hideAlert = () => {
    setAlert(null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formVazio = Object.values(forms).filter((value) => !value);

    console.log(formVazio);

    if (!formVazio.length) {
      try {
        const response = await api.post('/users', forms);

        setAlert(
          <SweetAlert
            success
            style={{ display: 'block', marginTop: '-100px' }}
            title="Cadastro criado!"
            onConfirm={() => {
              hideAlert();
              history.push('/auth/login-page');
            }}
            onCancel={() => hideAlert()}
            confirmBtnCssClass={`${classes.button} ${classes.success}`}
          >
            Você será direcinado o login
          </SweetAlert>,
        );
      } catch (error) {
        setAlert(
          <SweetAlert
            error
            style={{ display: 'block', marginTop: '-100px' }}
            title="Algo deu errado =("
            onConfirm={() => {
              hideAlert();
            }}
            confirmBtnCssClass={`${classes.button} ${classes.error}`}
          >
            Tente novamente
          </SweetAlert>,
        );
      }
    }
  };

  const classes = useStyles();
  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={10}>
          <Card className={classes.cardSignup}>
            <h2 className={classes.cardTitle}>Recuperar Senha</h2>
            <CardBody>
              <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      formControlProps={{
                        fullWidth: true,
                        className: classes.customFormControlClasses,
                      }}
                      onChange={(e) =>
                        setForms({ ...forms, email: e.target.value })
                      }
                      inputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            className={classes.inputAdornment}
                          >
                            <Email className={classes.inputAdornmentIcon} />
                          </InputAdornment>
                        ),
                        placeholder: 'Email...',
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={8} md={12}>
                    <div className={classes.right}>
                      <Button type="submit" round color="primary">
                        Enviar
                      </Button>
                    </div>
                  </GridItem>
                </GridContainer>
              </form>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      {alert}
    </div>
  );
}
