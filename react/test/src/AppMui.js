import React from 'react';
import logo from './icon.png';
import './App.css';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


function AppMui() {
  var currentdate = new Date();
  var datetime = `${currentdate.getFullYear()}-${(currentdate.getMonth() + 1)}-${currentdate.getDate()}T${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  console.log(datetime)
  console.log('2014-08-18T21:11:54')
  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const [state, setState] = React.useState({
    checkedTaxi: false,
    checkedDisability: false,
    checkedElectric: false,
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="center" direction="column" alignItems="center">
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Date picker dialog"
              format="MM/dd/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Time picker"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
            <FormControlLabel
              control={
                <GreenCheckbox
                  checked={state.checkedTaxi}
                  onChange={handleChange('checkedTaxi')}
                  value="checkedTaxi"
                />
              }
              label="Taxi"
            />
            <FormControlLabel
              control={
                <GreenCheckbox
                  checked={state.checkedDisability}
                  onChange={handleChange('checkedDisability')}
                  value="checkedDisability"
                />
              }
              label="Disability"
            />
            <FormControlLabel
              control={
                <GreenCheckbox
                  checked={state.checkedElectric}
                  onChange={handleChange('checkedElectric')}
                  value="checkedElectric"
                />
              }
              label="Electric car"
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </header>
    </div>
  );
}

export default AppMui;
