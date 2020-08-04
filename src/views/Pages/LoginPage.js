import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import api from '../../services/api';
import { login } from '../../services/auth';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';

// @material-ui/icons
import Face from '@material-ui/icons/Face';
import Email from '@material-ui/icons/Email';
import AddAlert from '@material-ui/icons/AddAlert';
import Close from '@material-ui/icons/Close';
// import LockOutline from "@material-ui/icons/LockOutline";

// core components
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import CustomInput from '../../components/CustomInput/CustomInput';
import Button from '../../components/CustomButtons/Button';
import Card from '../../components/Card/Card';
import CardBody from '../../components/Card/CardBody';
import CardHeader from '../../components/Card/CardHeader';
import CardFooter from '../../components/Card/CardFooter';
import Snackbar from '../../components/Snackbar/Snackbar';

import styles from '../../assets/jss/material-dashboard-pro-react/views/loginPageStyle';

const useStyles = makeStyles(styles);

export default function LoginPage() {
  const history = useHistory();
  const [tr, setTR] = React.useState(false);
  const [cardAnimaton, setCardAnimation] = useState('cardHidden');
  const [notification, setNotification] = useState({
    type: '',
    message: '',
  });
  const [forms, setForms] = useState({
    email: '',
    password: '',
  });

  const showNotification = (place) => {
    switch (place) {
      case 'tr':
        if (!tr) {
          setTR(true);
          setTimeout(function () {
            setTR(false);
          }, 6000);
        }
        break;
      default:
        break;
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const { email, password } = forms;
    if (!email || !password) {
      setNotification({
        type: 'rose',
        message: 'Preencha e-mail e senha para continuar!',
      });
      showNotification('tr');
    } else {
      try {
        const response = await api.post('/sessions', forms);

        setNotification({
          type: 'success',
          message: 'Bem vindo!',
        });
        showNotification('tr');

        login(response.data.token);
        history.push('/admin/dashboard');
      } catch (err) {
        setNotification({
          type: 'rose',
          message: 'Ops... Não foi possível entrar',
        });
        showNotification('tr');
      }
    }
  };

  React.useEffect(() => {
    const id = setTimeout(() => {
      setCardAnimation('');
    }, 700);
    // Specify how to clean up after this effect:
    return function cleanup() {
      window.clearTimeout(id);
    };
  });
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={4}>
          <form onSubmit={(e) => handleSignIn(e)}>
            <Card login className={classes[cardAnimaton]}>
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
                color="login"
              >
                <h4 className={classes.cardTitle}> Log in </h4>
              </CardHeader>
              <CardBody>
                <CustomInput
                  labelText="Email..."
                  id="email"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  onChange={(e) =>
                    setForms({ ...forms, email: e.target.value })
                  }
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Email className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    ),
                  }}
                />
                <CustomInput
                  labelText="Senha"
                  id="password"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  onChange={(e) =>
                    setForms({ ...forms, password: e.target.value })
                  }
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.inputAdornmentIcon}>
                          lock_outline
                        </Icon>
                      </InputAdornment>
                    ),
                    type: 'password',
                    autoComplete: 'off',
                  }}
                />
                <span className={classes.right}>
                  <a
                    href="#"
                    onClick={() => history.push('/auth/recover-password-page')}
                  >
                    Esqueceu a senha?
                  </a>
                  .
                </span>
              </CardBody>
              <CardFooter className={classes.justifyContentCenter}>
                <Button
                  onClick={() => history.push('/auth/register-page')}
                  color="login"
                  simple
                  size="lg"
                  block
                >
                  Cadastrar
                </Button>
                <Button type="submit" color="login" simple size="lg" block>
                  Entrar
                </Button>
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </GridContainer>
      <Snackbar
        place="tr"
        color={notification.type}
        icon={AddAlert}
        message={notification.message}
        open={tr}
        closeNotification={() => setTR(false)}
        close
      />
    </div>
  );
}
