/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import Button from '@/components/CustomButtons/Button';
import Card from '@/components/Card/Card';
import SweetAlert from 'react-bootstrap-sweetalert';

import wizardStyle from '@/assets/jss/material-dashboard-pro-react/components/wizardStyle';

class Wizard extends React.Component {
  constructor(props) {
    super(props);
    let width;
    if (this.props.steps.length === 1) {
      width = '100%';
    } else if (window.innerWidth < 600) {
      if (this.props.steps.length !== 3) {
        width = '50%';
      } else {
        width = `${100 / 3}%`;
      }
    } else if (this.props.steps.length === 2) {
      width = '50%';
    } else {
      width = `${100 / 3}%`;
    }
    this.state = {
      valid: false,
      alert: null,
      currentStep: 0,
      color: this.props.color,
      nextButton: this.props.steps.length > 1,
      previousButton: false,
      finishButton: this.props.steps.length === 1,
      width,
      movingTabStyle: {
        transition: 'transform 0s',
      },
      allStates: {},
    };
    this.navigationStepChange = this.navigationStepChange.bind(this);
    this.refreshAnimation = this.refreshAnimation.bind(this);
    this.previousButtonClick = this.previousButtonClick.bind(this);
    this.previousButtonClick = this.previousButtonClick.bind(this);
    this.finishButtonClick = this.finishButtonClick.bind(this);
    this.updateWidth = this.updateWidth.bind(this);
  }

  wizard = React.createRef();

  componentDidMount() {
    this.refreshAnimation(0);
    window.addEventListener('resize', this.updateWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWidth);
  }

  updateWidth() {
    this.refreshAnimation(this.state.currentStep);
  }

  validarCampos(step) {
    debugger;

    const validateStep = JSON.parse(
      localStorage.getItem(`step${step + 1}`),
    ) || {
      0: '',
    };

    const valid = Object.values(validateStep).filter(
      (value) => !value || value === '',
    );

    if (valid.length === 0) {
      localStorage.getItem(`validation${step + 1}`, 'true');

      return true;
    }
    localStorage.getItem(`validation${step + 1}`, 'false');

    this.setState({
      ...this.state,
      valid: true,
      alert: (
        <SweetAlert
          error
          style={{ display: 'block', marginTop: '-100px' }}
          title="Preencha todos os campos obrigatórios"
          onConfirm={() => {
            this.hideAlert();
          }}
        />
      ),
    });

    return false;
  }

  navigationStepChange(key) {
    debugger;
    if (this.props.steps && this.validarCampos(this.state.currentStep)) {
      let validationState = true;
      if (key > this.state.currentStep) {
        for (let i = this.state.currentStep; i < key; i++) {
          if (this.props.steps[i].validate === false) {
            validationState = false;
            break;
          }
        }
      }
      if (validationState) {
        this.setState({
          currentStep: key,
          nextButton: this.props.steps.length > key + 1,
          previousButton: key > 0,
          finishButton: this.props.steps.length === key + 1,
        });
        this.refreshAnimation(key);
      }
    }
  }

  hideAlert() {
    this.setState({ ...this.state, alert: null });
  }

  nextButtonClick() {
    const validationState = true;
    this.setState({
      allStates: {
        ...this.state.allStates,
        [this.props.steps[this.state.currentStep].stepId]: this[
          this.props.steps[this.state.currentStep].stepId
        ],
      },
    });

    if (this.validarCampos(this.state.currentStep)) {
      localStorage.getItem('validation1', 'true');

      const key = this.state.currentStep + 1;
      this.setState({
        ...this.state,
        valid: false,
        currentStep: key,
        nextButton: this.props.steps.length > key + 1,
        previousButton: key > 0,
        finishButton: this.props.steps.length === key + 1,
      });
      this.refreshAnimation(key);
      this.props.nextButtonClick(this.state);
    }
  }

  previousButtonClick() {
    // if (
    //   this[this.props.steps[this.state.currentStep].stepId].sendState !==
    //   undefined
    // ) {
    //   this.setState({
    //     allStates: {
    //       ...this.state.allStates,
    //       [this.props.steps[this.state.currentStep].stepId]: this[
    //         this.props.steps[this.state.currentStep].stepId
    //       ].sendState(),
    //     },
    //   });
    // }
    const key = this.state.currentStep - 1;
    if (key >= 0) {
      this.setState({
        currentStep: key,
        nextButton: this.props.steps.length > key + 1,
        previousButton: key > 0,
        finishButton: this.props.steps.length === key + 1,
      });
      this.refreshAnimation(key);
    }
  }

  finishButtonClick() {
    if (this.validarCampos(this.state.currentStep)) {
      this.props.finishButtonClick(this.state.allStates);
    }
  }

  refreshAnimation(index) {
    const total = this.props.steps.length;
    let li_width = 100 / total;
    const total_steps = this.props.steps.length;
    let move_distance =
      this.wizard.current.children[0].offsetWidth / total_steps;
    let index_temp = index;
    let vertical_level = 0;

    const mobile_device = window.innerWidth < 600 && total > 3;

    if (mobile_device) {
      move_distance = this.wizard.current.children[0].offsetWidth / 2;
      index_temp = index % 2;
      li_width = 50;
    }

    this.setState({ width: `${li_width}%` });

    const step_width = move_distance;
    move_distance *= index_temp;

    const current = index + 1;

    if (current === 1 || (mobile_device === true && index % 2 === 0)) {
      move_distance -= 8;
    } else if (
      current === total_steps ||
      (mobile_device === true && index % 2 === 1)
    ) {
      move_distance += 8;
    }

    if (mobile_device) {
      vertical_level = parseInt(index / 2, 10);
      vertical_level *= 38;
    }
    const movingTabStyle = {
      width: step_width,
      transform: `translate3d(${move_distance}px, ${vertical_level}px, 0)`,
      transition: 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)',
    };
    this.setState({ movingTabStyle });
  }

  render() {
    const { classes, title, subtitle, color, steps } = this.props;
    return (
      <div className={classes.container} ref={this.wizard}>
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
                    style={{ width: this.state.width }}
                  >
                    <a
                      href={`#${prop.stepId}`}
                      className={classes.stepsAnchor}
                      onClick={(e) => {
                        e.preventDefault();
                        this.navigationStepChange(key);
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
              style={this.state.movingTabStyle}
            >
              {steps[this.state.currentStep].stepName}
            </div>
          </div>
          <div className={classes.content}>
            {steps.map((prop, key) => {
              const stepContentClasses = cx({
                [classes.stepContentActive]: this.state.currentStep === key,
                [classes.stepContent]: this.state.currentStep !== key,
              });
              return (
                <div className={stepContentClasses} key={key}>
                  <prop.stepComponent
                    innerRef={(node) => (this[prop.stepId] = node)}
                    allStates={this.state.allStates}
                    valid={this.state.valid}
                  />
                </div>
              );
            })}
          </div>
          <div className={classes.footer}>
            <div className={classes.left}>
              {this.state.previousButton ? (
                <Button
                  className={this.props.previousButtonClasses}
                  onClick={() => this.previousButtonClick()}
                >
                  {this.props.previousButtonText}
                </Button>
              ) : null}
            </div>
            <div className={classes.right}>
              {this.state.nextButton ? (
                <Button
                  color="info"
                  className={this.props.nextButtonClasses}
                  onClick={() => this.nextButtonClick()}
                >
                  {this.props.nextButtonText}
                </Button>
              ) : null}
              {this.state.finishButton ? (
                <Button
                  color="info"
                  className={this.finishButtonClasses}
                  onClick={() => this.finishButtonClick()}
                >
                  {this.props.finishButtonText}
                </Button>
              ) : null}
            </div>
            <div className={classes.clearfix} />
          </div>
          {this.state.alert}
        </Card>
      </div>
    );
  }
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
  classes: PropTypes.object,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      stepName: PropTypes.string.isRequired,
      stepComponent: PropTypes.func.isRequired,
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
  finishButtonClick: PropTypes.func,
  validate: PropTypes.bool,
};

export default withStyles(wizardStyle)(Wizard);
