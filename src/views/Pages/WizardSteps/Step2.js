import React, { useState } from 'react';
// @material-ui/core components
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';

// core components
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';

import customSelectStyle from '@/assets/jss/material-dashboard-pro-react/customSelectStyle';
import customCheckboxRadioSwitch from '@/assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch';

const style = {
  infoText: {
    fontWeight: '300',
    margin: '10px 0 30px',
    textAlign: 'center',
  },
  inputAdornmentIcon: {
    color: '#555',
  },
  choiche: {
    textAlign: 'center',
    cursor: 'pointer',
    marginTop: '20px',
  },
  ...customSelectStyle,
  ...customCheckboxRadioSwitch,
};

const useStyles = makeStyles(style);

export default function Step2() {
  const classes = useStyles();

  const [form, setForm] = useState({
    simpleSelect: '',
    desgin: false,
    code: false,
    develop: false,
  });

  // const sendState = () => {};
  const handleSimple = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const handleChange = (name) => (event) => {
    setForm({ ...form, [name]: event.target.checked });
  };
  // const isValidated = () => {
  //   return true;
  // };

  return (
    <div>
      <h4 className={classes.infoText}>What are you doing? (checkboxes)</h4>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12} lg={10}>
          <GridContainer>
            <GridItem xs={12} sm={4}>
              <div className={classes.choiche}>
                <Checkbox
                  tabIndex={-1}
                  onClick={handleChange('desgin')}
                  checkedIcon={
                    <i
                      className={`fas fa-pencil-alt ${classes.iconCheckboxIcon}`}
                    />
                  }
                  icon={
                    <i
                      className={`fas fa-pencil-alt ${classes.iconCheckboxIcon}`}
                    />
                  }
                  classes={{
                    checked: classes.iconCheckboxChecked,
                    root: classes.iconCheckbox,
                  }}
                />
                <h6>Design</h6>
              </div>
            </GridItem>
            <GridItem xs={12} sm={4}>
              <div className={classes.choiche}>
                <Checkbox
                  tabIndex={-1}
                  onClick={handleChange('code')}
                  checkedIcon={
                    <i
                      className={`fas fa-terminal ${classes.iconCheckboxIcon}`}
                    />
                  }
                  icon={
                    <i
                      className={`fas fa-terminal ${classes.iconCheckboxIcon}`}
                    />
                  }
                  classes={{
                    checked: classes.iconCheckboxChecked,
                    root: classes.iconCheckbox,
                  }}
                />
                <h6>Code</h6>
              </div>
            </GridItem>
            <GridItem xs={12} sm={4}>
              <div className={classes.choiche}>
                <Checkbox
                  tabIndex={-1}
                  onClick={handleChange('develop')}
                  checkedIcon={
                    <i
                      className={`fas fa-laptop ${classes.iconCheckboxIcon}`}
                    />
                  }
                  icon={
                    <i
                      className={`fas fa-laptop ${classes.iconCheckboxIcon}`}
                    />
                  }
                  classes={{
                    checked: classes.iconCheckboxChecked,
                    root: classes.iconCheckbox,
                  }}
                />
                <h6>Develop</h6>
              </div>
              <FormControl fullWidth className={classes.selectFormControl}>
                <InputLabel
                  htmlFor="simple-select"
                  className={classes.selectLabel}
                >
                  Choose City
                </InputLabel>
                <Select
                  MenuProps={{
                    className: classes.selectMenu,
                  }}
                  classes={{
                    select: classes.select,
                  }}
                  value={form.simpleSelect}
                  onChange={(e) => handleSimple(e)}
                  inputProps={{
                    name: 'simpleSelect',
                    id: 'simple-select',
                  }}
                >
                  <MenuItem
                    disabled
                    classes={{
                      root: classes.selectMenuItem,
                    }}
                  >
                    Choose City
                  </MenuItem>
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected,
                    }}
                    value="2"
                  >
                    Paris
                  </MenuItem>
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected,
                    }}
                    value="3"
                  >
                    Bucharest
                  </MenuItem>
                </Select>
              </FormControl>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </div>
  );
}
