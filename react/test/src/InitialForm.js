import React, { useState } from "react";
import './App.css';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import AjaxRequest from './ajax';

function InitialForm() {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [state, setState] = React.useState({
    startAddress: '',
    endAddress: '',
    taxi: false,
    dis: false,
    ev: false,
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

  var url = "";
  for (var key in state) {
    if (url !== "") {
      url += "&";
    }
    url += key + "=" + encodeURIComponent(state[key]);
  }

  return (
    <div className="InitialForm">
      <header className="InitialForm-header">
        <Grid container justify="center" direction="column" alignItems="center">
          <TextField
            label="From"
            value={state.startAddress}
            onChange={handleChangeTextField("startAddress")}
          />
          <TextField
            label="To"
            value={state.endAddress}
            onChange={handleChangeTextField("endAddress")}
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
          <Button variant="contained" href="root/">Submit</Button>
        </Grid>
      </header>
    </div>
  );
}
export default InitialForm;
