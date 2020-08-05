import React from 'react';

// core components
import Wizard from '@/components/Wizard/Wizard';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';

import Step1 from './WizardSteps/Step1';
import Step2 from './WizardSteps/Step2';

export default function WizardView() {
  const finishButtonClick = (form) => {};

  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={8}>
        <Wizard
          validate
          steps={[
            { stepName: 'Cadastro', stepComponent: Step1, stepId: 'cadastro' },
            {
              stepName: 'Pagamento',
              stepComponent: Step2,
              stepId: 'pagamento',
            },
          ]}
          title="Associe-se"
          subtitle=""
          finishButtonClick={(e) => alert(e)}
        />
      </GridItem>
    </GridContainer>
  );
}
