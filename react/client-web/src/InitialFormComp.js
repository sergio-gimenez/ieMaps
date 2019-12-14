import React, { useState } from "react";
import './css/App.css';
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

class InitialFormComp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            startAddress: '',
            endAddress: '',
            taxi: false,
            dis: false,
            ev: false,
        };
    }

    handleChangeCheckBox = name => event => {
        this.setState({ ...this.state, [name]: event.target.checked });
    };

    handleChangeTextField = name => event => {
        this.setState({ ...this.state, [name]: event.target.value });
    };

    // [selectedDate, handleDateChange] = useState(new Date());

    render() {
        // const [state, setState] = React.useState({
        //     startAddress: '',
        //     endAddress: '',
        //     taxi: false,
        //     dis: false,
        //     ev: false,
        // });

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
        for (var key in this.state) {
            if (url !== "") {
                url += "&";
            }
            url += key + "=" + encodeURIComponent(this.state[key]);
        }
        console.log(this.state)

        return (
            <div className="InitialForm">
                <header className="InitialForm-header">
                    <Grid container justify="center" direction="column" alignItems="center">
                        <TextField
                            label="From"
                            value={this.state.startAddress}
                            onChange={this.handleChangeTextField("startAddress")}
                        />
                        <TextField
                            label="To"
                            value={this.state.endAddress}
                            onChange={this.handleChangeTextField("endAddress")}
                            style={{ marginBottom: "20px" }}
                        />
                        {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                        </MuiPickersUtilsProvider> */}
                        <FormControlLabel
                            control={
                                <GreenCheckbox
                                    checked={this.state.checkedTaxi}
                                    onChange={this.handleChangeCheckBox('checkedTaxi')}
                                    value="checkedTaxi"
                                />
                            }
                            label="Taxi"
                        />
                        <FormControlLabel
                            control={
                                <GreenCheckbox
                                    checked={this.state.checkedDisability}
                                    onChange={this.handleChangeCheckBox('checkedDisability')}
                                    value="checkedDisability"
                                />
                            }
                            label="Disability"
                        />
                        <FormControlLabel
                            control={
                                <GreenCheckbox
                                    checked={this.state.checkedElectric}
                                    onChange={this.handleChangeCheckBox('checkedElectric')}
                                    value="checkedElectric"
                                />
                            }
                            label="Electric car"
                        />
                        <Button variant="contained" onClick={() => history.push('/search')}>Submit</Button>
                    </Grid>
                </header>
            </div>
        );
    }
}

export default InitialFormComp;
