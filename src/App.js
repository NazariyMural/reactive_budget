import React, { Component } from 'react';
import styles from './App.css';
import moment from 'moment';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import Add from 'material-ui/svg-icons/content/add-circle';
import Remove from 'material-ui/svg-icons/content/remove-circle';

import Header from './components/Header/Header';
import Expanse from './components/Expanse/Expanse';
import Incomes from './components/Incomes/Incomes';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: moment(),

        };
    }
    handleSubtractDay = () => {
        this.setState({ date: this.state.date.add(1, 'day') })
    }
    handleAddDay = () => {
        this.setState({ date: this.state.date.subtract(1, 'day') })
    }


    render() {
        const { date } = this.state;
        return (
            <MuiThemeProvider>
                <div className={styles.App}>
                    <header className={styles.HeaderTitle}>
                        <h1>Реактивний бюджет</h1>
                        <div className={styles.DataContainer}>
                            <span>{date.format('DD.MM.YY')}</span>
                            <IconButton
                                onClick={this.handleSubtractDay}>
                                <Add />
                            </IconButton>
                            <IconButton
                                onClick={this.handleAddDay}>
                                <Remove />
                            </IconButton>
                        </div>
                    </header>
                    <main className={styles.Main}>
                        <Header />
                            <Switch>
                                <Route exact path="/" component={Expanse} />
                                {/* We can also use the render against component, when we wanna pass some props */}
                                {/* <Route path="/about" render={() => <About title="About" />} /> */}
                                <Route path="/incomes" component={Incomes} />
                            </Switch>
                    </main>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
