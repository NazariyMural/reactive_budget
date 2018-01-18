import React, { Component } from 'react'
import styles from './Incomes.css';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
// import styles from './Incomes.css'



const style = {
    inputTextArea: {
        color: '#c9c9c9',
        opasity: .7,
        fontWeight: 100,
        fontSize: 14,
    },
    inputStyle: {
        color: '#eff5ff',
        opasity: .7,
        fontWeight: 100,
        fontSize: 14,
    },
    buttonPrintInput: {
        margin: '12',
        background: 'transparent',

    }
}
class Incomes extends Component {
    state = {
        incomes: {
            incomes: '',
            category: '',
        },
    }

    handleInputChange = (ev) => {
        let incomes = { ...this.state.incomes }
        incomes[ev.target.name] = ev.target.value
        this.setState({ incomes })
    }

    handleSubmitTransaction = () => {
        const { onSubmit } = this.props;
        let incomes = { ...this.state.incomes }

        //execute the onSubmit function with two parement one olways should be negative
        onSubmit(Math.abs(parseFloat(incomes.incomes)), incomes.category );

        //and clear input field 
        incomes.category = '';
        incomes.incomes = '';
        this.setState({ incomes })
    }

    render() {
        const { incomes, category } = this.state.incomes;
        return (
            <div className={styles.Container}>
                <span className={styles.SpanTitle}>Внесіть дохід:</span>
                <TextField
                    hintText="ваші витрати"
                    hintStyle={style.inputTextArea}
                    multiLine={false}
                    inputStyle={style.inputStyle}
                    onChange={(ev) => this.handleInputChange(ev)}
                    value={incomes}
                    name="incomes"
                /><br />
                <span className={styles.SpanTitle}>Категорія:</span>
                <TextField
                    hintText="ваші категорія"
                    hintStyle={style.inputTextArea}
                    multiLine={false}
                    inputStyle={style.inputStyle}
                    value={category}
                    onChange={(ev) => this.handleInputChange(ev)}
                    name="category"
                /><br />
                <div className={styles.ButtonContainer}>
                    <RaisedButton
                        label="Внести"
                        style={style.buttonPrintInput} 
                        onClick={this.handleSubmitTransaction}/>
                </div>
            </div>
        )
    }
}

export default Incomes;
