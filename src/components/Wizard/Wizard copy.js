/* eslint-disable react/require-default-props */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect, useRef } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

// @material-ui/core components
// core components
import Button from '@/components/CustomButtons/Button';
import Card from '@/components/Card/Card';

import wizardStyle from '@/assets/jss/material-dashboard-pro-react/components/wizardStyle';
import { withStyles } from '@material-ui/core/styles';

function Wizard({
  classes,
  steps,
  title,
  color,
  subtitle,
  previousButtonClasses,
  previousButtonText,
  nextButtonClasses,
  nextButtonText,
  finishButtonClasses,
  finishButtonText,
  validate,
}) {
  const [stepInfo, setStepInfo] = useState({
    currentStep: 0,
    nextButton: false,
    previousButton: false,
    finishButton: false,
    width: 0,
    movingTabStyle: {
      transition: 'transform 0s',
    },
    allStates: {},
  });

  const wizard = useRef();

  const refreshAnimation = (index) => {
    const total = steps.length;
    let liWidth = 100 / total;
    const totalSteps = steps.length;
    let moveDistance = wizard.current.children[0].offsetWidth / totalSteps;
    let indexTemp = index;
    let verticalLevel = 0;

    const mobileDevice = window.innerWidth < 600 && total > 3;

    if (mobileDevice) {
      moveDistance = wizard.current.children[0].offsetWidth / 2;
      indexTemp = index % 2;
      liWidth = 50;
    }

    setStepInfo({ width: `${liWidth}%` });

    const stepWidth = moveDistance;
    moveDistance *= indexTemp;

    const current = index + 1;

    if (current === 1 || (mobileDevice === true && index % 2 === 0)) {
      moveDistance -= 8;
    } else if (
      current === totalSteps ||
      (mobileDevice === true && index % 2 === 1)
    ) {
      moveDistance += 8;
    }

    if (mobileDevice) {
      verticalLevel = parseInt(index / 2, 10);
      verticalLevel *= 38;
    }
    const movingTabStyle = {
      width: stepWidth,
      transform: `translate3d(${moveDistance}px, ${verticalLevel}px, 0)`,
      transition: 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)',
    };
    setStepInfo({ movingTabStyle });
  };

  const updateWidth = () => {
    refreshAnimation(stepInfo.currentStep);
  };

  const navigationStepChange = (key) => {
    if (steps) {
      let validationState = true;
      if (key > stepInfo.currentStep) {
        for (let i = stepInfo.currentStep; i < key; i++) {
          if (
            stepInfo[steps[stepInfo.currentStep].stepId].sendState !== undefined
          ) {
            setStepInfo({
              allStates: {
                ...stepInfo,
                [steps[i].stepId]: stepInfo[steps[i].stepId].sendState(),
              },
            });
          }
          if (
            stepInfo[steps[i].stepId].isValidated !== undefined &&
            stepInfo[steps[i].stepId].isValidated() === false
          ) {
            validationState = false;
            break;
          }
        }
      }
      if (validationState) {
        setStepInfo({
          currentStep: key,
          nextButton: steps.length > key + 1,
          previousButton: key > 0,
          finishButton: steps.length === key + 1,
        });
        refreshAnimation(key);
      }
    }
  };

  const nextButtonClick = () => {
    if (
      (validate &&
        ((stepInfo[steps[stepInfo.currentStep].stepId].isValidated !==
          undefined &&
          stepInfo[steps[stepInfo.currentStep].stepId].isValidated()) ||
          stepInfo[steps[stepInfo.currentStep].stepId].isValidated ===
            undefined)) ||
      validate === undefined
    ) {
      if (
        stepInfo[steps[stepInfo.currentStep].stepId].sendState !== undefined
      ) {
        setStepInfo({
          allStates: {
            ...stepInfo,
            [steps[stepInfo.currentStep].stepId]: stepInfo[
              steps[stepInfo.currentStep].stepId
            ].sendState(),
          },
        });
      }
      const key = stepInfo.currentStep + 1;
      setStepInfo({
        currentStep: key,
        nextButton: steps.length > key + 1,
        previousButton: key > 0,
        finishButton: steps.length === key + 1,
      });
      refreshAnimation(key);
    }
  };

  const previousButtonClick = () => {
    if (stepInfo[steps[stepInfo.currentStep].stepId].sendState !== undefined) {
      setStepInfo({
        allStates: {
          ...stepInfo,
          [steps[stepInfo.currentStep].stepId]: stepInfo[
            steps[stepInfo.currentStep].stepId
          ].sendState(),
        },
      });
    }
    const key = stepInfo.currentStep - 1;
    if (key >= 0) {
      setStepInfo({
        currentStep: key,
        nextButton: steps.length > key + 1,
        previousButton: key > 0,
        finishButton: steps.length === key + 1,
      });
      refreshAnimation(key);
    }
  };

  const finishButtonClick = () => {
    if (
      (validate === false && finishButtonClick !== undefined) ||
      (validate &&
        ((stepInfo[steps[stepInfo.currentStep].stepId].isValidated !==
          undefined &&
          stepInfo[steps[stepInfo.currentStep].stepId].isValidated()) ||
          stepInfo[steps[stepInfo.currentStep].stepId].isValidated ===
            undefined) &&
        finishButtonClick !== undefined)
    ) {
      setStepInfo(
        {
          allStates: {
            ...stepInfo,
            [steps[stepInfo.currentStep].stepId]: stepInfo[
              steps[stepInfo.currentStep].stepId
            ].sendState(),
          },
        },
        () => {
          finishButtonClick(stepInfo);
        },
      );
    }
  };

  useEffect(() => {
    refreshAnimation(0);
    window.addEventListener('resize', updateWidth);

    return function cleanup() {
      window.removeEventListener('resize', updateWidth);
    };
  });

  useEffect(() => {
    let width;
    if (steps.length === 1) {
      width = '100%';
    } else if (window.innerWidth < 600) {
      if (steps.length !== 3) {
        width = '50%';
      } else {
        width = `${100 / 3}%`;
      }
    } else if (steps.length === 2) {
      width = '50%';
    } else {
      width = `${100 / 3}%`;
    }
    setStepInfo({
      currentStep: 0,
      color,
      nextButton: steps.length > 1,
      previousButton: false,
      finishButton: steps.length === 1,
      width,
      movingTabStyle: {
        transition: 'transform 0s',
      },
      allStates: {},
    });
  }, [stepInfo]);

  return (
    <div className={classes.container} ref={wizard}>
      <Card className={classes.card}>
        <div className={classes.wizardHeader}>
          <h3 className={classes.title}>{title}</h3>
          <h5 className={classes.subtitle}>{subtitle}</h5>
        </div>
        <div className={classes.wizardNavigation}>
          <ul className={classes.nav}>
            {steps.map((prop, key) => {
              return (
                <li
                  className={classes.steps}
                  key={key}
                  style={{ width: stepInfo.width }}
                >
                  <a
                    href="#/"
                    className={classes.stepsAnchor}
                    onClick={(e) => {
                      e.preventDefault();
                      navigationStepChange(key);
                    }}
                  >
                    {prop.stepName}
                  </a>
                </li>
              );
            })}
          </ul>
          <div
            className={`${classes.movingTab} ${classes[color]}`}
            style={stepInfo.movingTabStyle}
          >
            {steps[stepInfo.currentStep].stepName}
          </div>
        </div>
        <div className={classes.content}>
          {steps.map((prop, key) => {
            const stepContentClasses = cx({
              [classes.stepContentActive]: stepInfo.currentStep === key,
              [classes.stepContent]: stepInfo.currentStep !== key,
            });
            return (
              <div className={stepContentClasses} key={key}>
                <prop.stepComponent
                  innerRef={(node) => {
                    steps[stepInfo.currentStep].stepId = node;
                    return node;
                  }}
                  allStates={stepInfo}
                />
              </div>
            );
          })}
        </div>
        <div className={classes.footer}>
          <div className={classes.left}>
            {stepInfo.previousButton ? (
              <Button
                className={previousButtonClasses}
                onClick={() => previousButtonClick()}
              >
                {previousButtonText}
              </Button>
            ) : null}
          </div>
          <div className={classes.right}>
            {stepInfo.nextButton ? (
              <Button
                color="info"
                className={nextButtonClasses}
                onClick={() => nextButtonClick()}
              >
                {nextButtonText}
              </Button>
            ) : null}
            {stepInfo.finishButton ? (
              <Button
                color="info"
                className={finishButtonClasses}
                onClick={() => finishButtonClick()}
              >
                {finishButtonText}
              </Button>
            ) : null}
          </div>
          <div className={classes.clearfix} />
        </div>
      </Card>
    </div>
  );
}

Wizard.defaultProps = {
  color: 'info',
  title: 'Here should go your title',
  subtitle: 'And this would be your subtitle',
  previousButtonText: 'Previous',
  previousButtonClasses: '',
  nextButtonClasses: '',
  nextButtonText: 'Next',
  finishButtonClasses: '',
  finishButtonText: 'Finish',
};

Wizard.propTypes = {
  classes: PropTypes.objectOf.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      stepName: PropTypes.string.isRequired,
      stepComponent: PropTypes.objectOf.isRequired,
      stepId: PropTypes.string.isRequired,
    }),
  ).isRequired,
  color: PropTypes.oneOf([
    'primary',
    'warning',
    'danger',
    'success',
    'info',
    'rose',
  ]),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  previousButtonClasses: PropTypes.string,
  previousButtonText: PropTypes.string,
  nextButtonClasses: PropTypes.string,
  nextButtonText: PropTypes.string,
  finishButtonClasses: PropTypes.string,
  finishButtonText: PropTypes.string,
  validate: PropTypes.bool,
};

export default withStyles(wizardStyle)(Wizard);
