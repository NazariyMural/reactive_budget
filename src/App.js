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
import Table from './components/Table/Table';
import Perspactive from './components/Perspactive/Perspactive';
import axios from 'axios';



class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: moment(),

            expanse: {
                expanse: '',
                category: '',
            },
            transactions: [],
            loading: false
        };
    }
    componentWillMount() {
        this.setState({ loading: true })
    }
    componentDidMount() {
        axios.get('https://reactivebudget.firebaseio.com//.json')
            .then(res => {
                const transData = [...res.data];
                this.setState({ transactions: transData, loading: false })
            })
            .catch(error => {
                console.error(error);
            })
    }

    handleSubtractDay = () => {
        this.setState({ date: this.state.date.add(1, 'day') })
    }
    handleAddDay = () => {
        this.setState({ date: this.state.date.subtract(1, 'day') })
    }

    handleInputChange = (ev) => {
        let expanse = { ...this.state.expanse }
        expanse[ev.target.name] = ev.target.value
        this.setState({ expanse })
    }

    //just grabbed methods
    handleSubmit = (sum, category, cuurency) => {
        const { date: todayDate, transactions } = this.state

        const _newTransaction = { date: todayDate.format('DD.MM.YY'), category: category, sum: sum, cuurency: cuurency }

        /* We create transaction array witch contain past transaction from state (it helps for forting and inutability) */
        const newTransactions = [...transactions, _newTransaction];

        newTransactions.sort((a, b) => {
            const aDate = moment(a.date, 'DD.MM.YY');
            const bDate = moment(b.date, 'DD.MM.YY');
            return aDate.isAfter(bDate)
        })
        this.setState({ transactions: newTransactions });
    }


    onToday = () => {
        const { transactions, date } = this.state;

        ///it just an objects transactions 
        const currentMonthTransaction = transactions.filter(({ date: transactionDate }) => {
            // console.log(moment(transactionDate.date).daysInMonth())
            return (
                moment(transactionDate, 'DD.MM.YY').isSame(date, 'month')
            )
        })
        console.log(currentMonthTransaction);
        //get all incomes sum 
        const dailyMoney = currentMonthTransaction.reduce((acc, transaction) => {
            console.log(transaction.sum * 1);
            return transaction.sum * 1 > 0 ? transaction.sum * 1 + acc : acc;
        }, 0) / moment(date).daysInMonth();
        console.log(dailyMoney);

        //тільки  транакції які були зроблені до поточного дня не включно
        const transactionBeforeThisDay = currentMonthTransaction.filter(({ date: transactionDate }) => {
            return moment(transactionDate, 'DD.MM.YY').isBefore(date, 'date')
        })
        console.log(transactionBeforeThisDay);

        const expanseBeforeToday = transactionBeforeThisDay.reduce((acc, { sum }) => {
            let numS = sum*1;
            return numS < 0 ? numS + acc: acc
        }, 0)
        console.log(expanseBeforeToday);
    }

    render() {
        const { date, transactions, loading } = this.state;
        return (
            <MuiThemeProvider>
                <div className={styles.App}>
                    <header className={styles.HeaderTitle}>
                        <h1>Реактивний бюджет</h1>
                        <div className={styles.DataContainer}>
                            <span>{date.format('DD.MM.YY')}</span>
                            <IconButton
                                onClick={this.handleAddDay}>
                                <Remove />
                            </IconButton>
                            <IconButton
                                onClick={this.handleSubtractDay}>
                                <Add />
                            </IconButton>
                        </div>
                    </header>
                    <main className={styles.Main}>
                        <Perspactive canSpend={this.onToday} loading={loading} />
                        <Header />
                        <Switch>
                            <Route exact path="/" render={() => (
                                <Expanse
                                    //onSubmit function will be executed inside Expanse component with two parament (sum, transaction)
                                    onSubmit={(sum, transaction, cuurency) => this.handleSubmit(sum, transaction, cuurency)} />
                            )} />

                            <Route path="/incomes" render={() => (
                                <Incomes
                                    onSubmit={(sum, transaction, cuurency) => this.handleSubmit(sum, transaction, cuurency)} />
                            )} />
                        </Switch>
                        <Table transactions={transactions} loading={loading}/>
                    </main>
                </div>

            </MuiThemeProvider>
        );
    }
}

export default App;




/*  
            Here the code witch recieve input value from bellow 

            that's input element witch send data above
            <TextField
                    hintText="ваші витрати"
                    hintStyle={style.inputTextArea}
                    multiLine={false}
                    inputStyle={style.inputStyle}
                    onChange={this.props.change}
                    value={expanse}
                    name="expanse"
                /><br />
*/
// class App extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             date: moment(),

//             expanse: {
//                 expanse: '',
//                 category: '',
//             },

//         };
//     }
//     handleSubtractDay = () => {
//         this.setState({ date: this.state.date.add(1, 'day') })
//     }
//     handleAddDay = () => {
//         this.setState({ date: this.state.date.subtract(1, 'day') })
//     }

//     handleInputChange = (ev) => {
//         let expanse = { ...this.state.expanse }
//         expanse[ev.target.name] = ev.target.value
//         this.setState({ expanse })
//     }


//     onSubmit = ( sum, transaction) => {
//         console.log(sum, transaction);
//     }
//     handleSubmit = () => {
//         let expanse = { ...this.state.expanse }

//         //execute the onSubmit function with two parement one olways should be negative
//         this.onSubmit( -1 * Math.abs(parseFloat(expanse.expanse)), expanse.category );

//         //and clear input field 
//         expanse.category = '';
//         expanse.expanse = '';
//         this.setState({ expanse })
//     }


//     render() {
//         const { date } = this.state;
//         return (
//             <MuiThemeProvider>
//                 <div className={styles.App}>
//                     <header className={styles.HeaderTitle}>
//                         <h1>Реактивний бюджет</h1>
//                         <div className={styles.DataContainer}>
//                             <span>{date.format('DD.MM.YY')}</span>
//                             <IconButton
//                                 onClick={this.handleSubtractDay}>
//                                 <Add />
//                             </IconButton>
//                             <IconButton
//                                 onClick={this.handleAddDay}>
//                                 <Remove />
//                             </IconButton>
//                         </div>
//                     </header>
//                     <main className={styles.Main}>
//                         <Header />
//                         <Switch>
//                             <Route exact path="/" render={() => (
//                                 <Expanse
//                                     change={(ev) => this.handleInputChange(ev)}
//                                     inputValue={this.state.expanse} 
//                                     onSubmit={this.handleSubmit}/>
//                             )} />

//                             <Route path="/incomes" component={Incomes} />
//                         </Switch>
//                     </main>
//                 </div>

//             </MuiThemeProvider>
//         );
//     }
// }

// export default App;


