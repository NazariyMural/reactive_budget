import React, { Component } from 'react'
import styles from './Incomes.css';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
// import styles from './Incomes.css'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';



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
    inputWidth: {
        width: 218,
    },
    inputWidthExpanses: {
        width: 100,
    },
    buttonPrintInput: {
        margin: '12',
        background: 'transparent',

    },
    selectField: {
        height: 76,
        width: 90,
    },
    iconStyle:{
        top: 30
    },
    labelStyle:{
        lineHeight: 1.5,
        height: 56,
        paddingRight: 10,
        color: '#b9b9b9',
        left: 44,
        top: 40
    }
}
class Incomes extends Component {
    state = {
        incomes: {
            incomes: '',
            category: '',
        },
        selectValue: 'UAH',
    }

    handleInputChange = (ev) => {
        let incomes = { ...this.state.incomes }
        incomes[ev.target.name] = ev.target.value
        this.setState({ incomes })
    }

    handleSubmitTransaction = () => {
        const { onSubmit } = this.props;
        let incomes = { ...this.state.incomes }
        const  { selectValue } = this.state;

        //execute the onSubmit function with two parement one olways should be negative
        onSubmit(Math.abs(parseFloat(incomes.incomes)), incomes.category, selectValue );

        //and clear input field 
        incomes.category = '';
        incomes.incomes = '';
        this.setState({ incomes })
    }

    handleSelectChange = (event, index, selectValue) => this.setState({ selectValue });
    
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
                    style={style.inputWidthExpanses}
                    onChange={(ev) => this.handleInputChange(ev)}
                    value={incomes}
                    name="incomes"
                />
                <SelectField
                    value={this.state.selectValue}
                    onChange={this.handleSelectChange}
                    style={style.selectField}
                    floatingLabelStyle={style.inputTextArea}
                    iconStyle={style.iconStyle}
                    labelStyle={style.labelStyle}
                    
                >
                    <MenuItem value={'USD'} primaryText="$" />
                    <MenuItem value={'UAH'} primaryText="₴" />
                    <MenuItem value={'PLN'} primaryText="zł" />
                    <MenuItem value={'EUR'} primaryText="€" />
                </SelectField>
                <br />
                <span className={styles.SpanTitle}>Категорія:</span>
                <TextField
                    hintText="категорія доходів"
                    hintStyle={style.inputTextArea}
                    multiLine={false}
                    inputStyle={style.inputStyle}
                    value={category}
                    onChange={(ev) => this.handleInputChange(ev)}
                    name="category"
                    style={style.inputWidth}
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
