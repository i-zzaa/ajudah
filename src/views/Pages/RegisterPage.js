import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import SweetAlert from 'react-bootstrap-sweetalert';

// core components
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import styles from '@/assets/jss/material-dashboard-pro-react/views/registerPageStyle';
import Wizard from '@/components/Wizard/Wizard';
import api from '@/services/api';

// core components

import Step1 from './WizardSteps/Step1';
import Step2 from './WizardSteps/Step2';

const useStyles = makeStyles(styles);

export default function RegisterPage() {
  const classes = useStyles();
  const history = useHistory();
  const [alert, setAlert] = useState(null);

  const hideAlert = () => {
    setAlert(null);
  };
  const onSubmit = async (form) => {
    try {
      const response = await api.post('/register', form);

      if (response.data.success) {
        localStorage.setItem('user_id', JSON.stringify(response.data.user.id));
      }
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
  };

  const onSubmitPay = async (form) => {
    try {
      const response = await api.post('/register/pay', form);

      if (!response.data.success) return false;

      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title="Cadastro criado!"
          onConfirm={() => {
            hideAlert();
            localStorage.removeItem('step2');

            history.push('/auth/login-page');
          }}
          onCancel={() => hideAlert()}
          confirmBtnCssClass={`${classes.button} ${classes.success}`}
        >
          Você será direcinado o login
        </SweetAlert>,
      );
      return true;
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
    return true;
  };

  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={10}>
          <Wizard
            validate
            steps={[
              {
                stepName: 'Cadastro',
                stepComponent: Step1,
                stepId: 'cadastro',
              },
              {
                stepName: 'Pagamento',
                stepComponent: Step2,
                stepId: 'pagamento',
              },
            ]}
            title="Associe-se"
            subtitle={
              <span className={classes.right}>
                <a href="/auth/login-page">Já possui login?</a>
              </span>
            }
            nextButtonText="Próximo"
            previousButtonText="Anterior"
            finishButtonText="Enviar"
            nextButtonClick={() => {
              const validateStep1 = JSON.parse(localStorage.getItem('step1'));
              onSubmit(validateStep1);
            }}
            finishButtonClick={() => {
              const validateStep2 = JSON.parse(localStorage.getItem('step2'));
              onSubmitPay(validateStep2);
            }}
          />
        </GridItem>
      </GridContainer>
      {alert}
    </div>
  );
}
