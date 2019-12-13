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
import history from './history';


function InitialForm() {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [state, setState] = useState({
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

  function getUrlFromState(object) {
    var url = "";
    for (var key in object) {
      if (url !== "") {
        url += "&";
      }
      url += key + "=" + encodeURIComponent(object[key]);
    }
    return url;
  }

  function getFormattedDate(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear().toString();
    var time = [date.getHours(),date.getMinutes(),date.getSeconds()].join(':');
    return `dayOfSearch=${year}-${month}-${day}+${time}`;
  }

  const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })(props => <Checkbox color="default" {...props} />);

  var paramsUrl = `${getUrlFromState(state)}&${getFormattedDate(selectedDate)}`

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
                checked={state.taxi}
                onChange={handleChangeCheckBox('taxi')}
                value="taxi"
              />
            }
            label="Taxi"
          />
          <FormControlLabel
            control={
              <GreenCheckbox
                checked={state.dis}
                onChange={handleChangeCheckBox('dis')}
                value="dis"
              />
            }
            label="Disability"
          />
          <FormControlLabel
            control={
              <GreenCheckbox
                checked={state.ev}
                onChange={handleChangeCheckBox('ev')}
                value="ev"
              />
            }
            label="Electric car"
          />
          <Button variant="contained" onClick={() => history.push(`/search/${paramsUrl}`)}>Submit</Button>
        </Grid>
      </header>
    </div>
  );
}
export default InitialForm;
