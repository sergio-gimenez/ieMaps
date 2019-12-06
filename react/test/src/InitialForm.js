import React, { useState } from "react";
import logo from './icon.png';
import './InitialForm.css';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


function InitialForm() {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [state, setState] = React.useState({
    checkedTaxi: false,
    checkedDisability: false,
    checkedElectric: false,
    originAddress: '',
    destinationAddress: '',
  });

  const handleChangeCheckBox = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const handleChangeTextField = name => event => {
    setState({ ...state, [name]: event.target.value });
  };

  const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })(props => <Checkbox color="default" {...props} />);
  console.log(state)
  console.log(selectedDate.toString())
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Grid container justify="center" direction="column" alignItems="center">
          <TextField
            label="From"
            value={state.originAddress}
            onChange={handleChangeTextField("originAddress")}
          />
          <TextField
            label="To"
            value={state.destinationAddress}
            onChange={handleChangeTextField("destinationAddress")}
            style={{ marginBottom: "20px" }}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              value={selectedDate}
              disablePast
              onChange={handleDateChange}
              label="Select a date"
              showTodayButton
              autoOk
              ampm={false}
              style={{ marginBottom: "20px" }}
            />
          </MuiPickersUtilsProvider>
          <FormControlLabel
            control={
              <GreenCheckbox
                checked={state.checkedTaxi}
                onChange={handleChangeCheckBox('checkedTaxi')}
                value="checkedTaxi"
              />
            }
            label="Taxi"
          />
          <FormControlLabel
            control={
              <GreenCheckbox
                checked={state.checkedDisability}
                onChange={handleChangeCheckBox('checkedDisability')}
                value="checkedDisability"
              />
            }
            label="Disability"
          />
          <FormControlLabel
            control={
              <GreenCheckbox
                checked={state.checkedElectric}
                onChange={handleChangeCheckBox('checkedElectric')}
                value="checkedElectric"
              />
            }
            label="Electric car"
          />
        </Grid>
      </header>
    </div>
  );
}
export default InitialForm;
