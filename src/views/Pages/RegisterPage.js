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
  const [alert, setAlert] = React.useState(null);

  const [forms, setForms] = useState({
    username: '',
    email: '',
    cpf: '',
    rg: '',
    password: '',
  });

  const hideAlert = () => {
    setAlert(null);
  };

  const onSubmit = async (e, form) => {
    setForms(form);
    e.preventDefault();

    const formVazio = await Object.values(forms).filter((value) => !value);

    console.log(formVazio);

    if (!formVazio.length) {
      try {
        const response = await api.post('/users', forms);

        if (!response) return;

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

  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={8}>
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
            subtitle=""
            finishButtonClick={(e, form) => onSubmit(e, form)}
            classes
          />
        </GridItem>
      </GridContainer>
      {alert}
    </div>
  );
}
