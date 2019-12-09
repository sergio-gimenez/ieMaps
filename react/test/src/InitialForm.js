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

  const buildURL = () => {
    // // const urlObj = new URL(`http://localhost:3000/${url}&date=2019-12-10+23:00:00`);
    // // create a new XMLHttpRequest
    // var xhr = new XMLHttpRequest();

    // // get a callback when the server responds
    // // xhr.addEventListener('load', () => {
    // //   // update the state of the component with the result here
    // //   console.log(xhr.responseText)
    // // })
    // // open the request with the verb and the url
    // xhr.open('POST', 'http://localhost:5000', true);
    // // xhr.withCredentials=true;
    // //xhr.setRequestHeader("Content-Length:" url.length)
    // xhr.setRequestHeader("Access-Control-Allow-Origin","*");
    // xhr.setRequestHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // xhr.setRequestHeader("Accept","*/*");
    // xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    // // send the request
    // console.log(`?${url}&dayOfSearch=2019-12-10+23:00:00`);
    // xhr.send(`"?${url}&dayOfSearch=2019-12-10+23:00:00"`);

    var request = require('request');

    var dataString = 'startAddress=Edificio+B3+-+Campus+Nord+U-3,+Carrer+de+Jordi+Girona,+08034+Barcelona&endAddress=Plaça+Catalunya,+Barcelona&dayOfSearch=2019-12-10+23:00:00&dis=True&taxi=False&ev=True';

    var options = {
      url: 'http://localhost:5000',
      method: 'POST',
      body: dataString
    };
    function callback(error, response, body) {
      console.log(error)
      if (!error && response.statusCode == 200) {
        console.log(body);
      }
    }

    request(options, callback);

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
          <Button variant="contained" onClick={buildURL}>Submit</Button>
        </Grid>
      </header>
    </div>
  );
}
export default InitialForm;
