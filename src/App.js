import React, { Component } from 'react';
import './App.css';
import moment from 'moment';
import styled from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import Add from 'material-ui/svg-icons/content/add-circle';
import Remove from 'material-ui/svg-icons/content/remove-circle';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: moment()
        };
    }

    render() {
        const { date } = this.state;
        return (
            <MuiThemeProvider>
                <div className="App">
                    <header>
                        <h1>Реактивний бюджет</h1>
                        <div className='DataContainer'>
                            <span>{date.format('DD.MM.YY')}</span>
                            <IconButton>
                                <Add />
                            </IconButton>
                            <IconButton>
                                <Remove />
                            </IconButton>
                        </div>
                    </header>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
