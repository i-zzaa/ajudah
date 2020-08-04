import React, { useState } from 'react';

import { useHistory, useParams } from 'react-router-dom';
import api from '../../services/api';
import { login } from '../../services/auth';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Icon from '@material-ui/core/Icon';
import SweetAlert from 'react-bootstrap-sweetalert';

// @material-ui/icons
import Timeline from '@material-ui/icons/Timeline';
import Code from '@material-ui/icons/Code';
import Group from '@material-ui/icons/Group';
import Face from '@material-ui/icons/Face';
import Email from '@material-ui/icons/Email'; //
import PictureInPicture from '@material-ui/icons/PictureInPicture';
import PictureInPictureAlt from '@material-ui/icons/PictureInPictureAlt';

// import LockOutline from "@material-ui/icons/LockOutline";
import Check from '@material-ui/icons/Check';

// core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import InfoArea from 'components/InfoArea/InfoArea.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';

import styles from 'assets/jss/material-dashboard-pro-react/views/registerPageStyle';

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
            confirmBtnCssClass={classes.button + ' ' + classes.success}
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
            confirmBtnCssClass={classes.button + ' ' + classes.error}
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
            <h2 className={classes.cardTitle}>Associe-se</h2>
            <CardBody>
              <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={5}>
                    <CustomInput
                      formControlProps={{
                        fullWidth: true,
                        className: classes.customFormControlClasses,
                      }}
                      onChange={(e) =>
                        setForms({ ...forms, username: e.target.value })
                      }
                      inputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            className={classes.inputAdornment}
                          >
                            <Face className={classes.inputAdornmentIcon} />
                          </InputAdornment>
                        ),
                        placeholder: 'Nome ...',
                      }}
                    />
                    <CustomInput
                      formControlProps={{
                        fullWidth: true,
                        className: classes.customFormControlClasses,
                      }}
                      onChange={(e) =>
                        setForms({ ...forms, cpf: e.target.value })
                      }
                      inputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            className={classes.inputAdornment}
                          >
                            <PictureInPicture
                              className={classes.inputAdornmentIcon}
                            />
                          </InputAdornment>
                        ),
                        placeholder: 'Número de telefone...',
                      }}
                    />
                    <CustomInput
                      formControlProps={{
                        fullWidth: true,
                        className: classes.customFormControlClasses,
                      }}
                      onChange={(e) =>
                        setForms({ ...forms, password: e.target.value })
                      }
                      inputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            className={classes.inputAdornment}
                          >
                            <Icon className={classes.inputAdornmentIcon}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        placeholder: 'Senha...',
                      }}
                    />
                    <FormControlLabel
                      classes={{
                        root: classes.checkboxLabelControl,
                        label: classes.checkboxLabel,
                      }}
                      control={
                        <Checkbox
                          tabIndex={-1}
                          onClick={() => handleToggle(1)}
                          checkedIcon={
                            <Check className={classes.checkedIcon} />
                          }
                          icon={<Check className={classes.uncheckedIcon} />}
                          classes={{
                            checked: classes.checked,
                            root: classes.checkRoot,
                          }}
                        />
                      }
                      label={
                        <span>
                          <a href="#">Aceito receber notícias por e-mail</a>.
                        </span>
                      }
                    />
                    <FormControlLabel
                      classes={{
                        root: classes.checkboxLabelControl,
                        label: classes.checkboxLabel,
                      }}
                      control={
                        <Checkbox
                          tabIndex={-1}
                          onClick={() => handleToggle(1)}
                          checkedIcon={
                            <Check className={classes.checkedIcon} />
                          }
                          icon={<Check className={classes.uncheckedIcon} />}
                          classes={{
                            checked: classes.checked,
                            root: classes.checkRoot,
                          }}
                        />
                      }
                      label={
                        <span>
                          <a href="#">*Termos e Condições</a>.
                        </span>
                      }
                    />
                  </GridItem>
                  <GridItem xs={12} sm={8} md={5}>
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
                    <CustomInput
                      formControlProps={{
                        fullWidth: true,
                        className: classes.customFormControlClasses,
                      }}
                      onChange={(e) =>
                        setForms({ ...forms, cpf: e.target.value })
                      }
                      inputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            className={classes.inputAdornment}
                          >
                            <PictureInPicture
                              className={classes.inputAdornmentIcon}
                            />
                          </InputAdornment>
                        ),
                        placeholder: 'CPF...',
                      }}
                    />
                    <CustomInput
                      formControlProps={{
                        fullWidth: true,
                        className: classes.customFormControlClasses,
                      }}
                      onChange={(e) =>
                        setForms({ ...forms, password: e.target.value })
                      }
                      inputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            className={classes.inputAdornment}
                          >
                            <Icon className={classes.inputAdornmentIcon}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        placeholder: 'Confirme a senha...',
                      }}
                    />
                    <div className={classes.center}>
                      <Button type="submit" round color="primary">
                        Cadastre-se
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
