import React, { Component } from 'react'
import styles from './Expanse.css';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
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
        width: 239,
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
class Expanse extends Component {
    state = {
        expanse: {
            expanse: '',
            category: '',
        },
        selectValue: 'UAH',
    }

    handleInputChange = (ev) => {
        let expanse = { ...this.state.expanse }
        expanse[ev.target.name] = ev.target.value
        this.setState({ expanse })
    }

    handleSelectChange = (event, index, selectValue) => this.setState({ selectValue });

    handleSubmitTransaction = () => {
        const { onSubmit } = this.props;
        let expanse = { ...this.state.expanse }
        const  { selectValue } = this.state;

        //execute the onSubmit function with two parement one olways should be negative
        onSubmit(-1 * Math.abs(parseFloat(expanse.expanse)), expanse.category, selectValue);

        //and clear input field 
        expanse.category = '';
        expanse.expanse = '';
        this.setState({ expanse })
    }

    render() {
        const { expanse, category } = this.state.expanse;
        return (
            <div className={styles.Container}>
                <span className={styles.SpanTitle}>Внесіть витрати:</span>
                <TextField
                    hintText="ваші витрати"
                    hintStyle={style.inputTextArea}
                    multiLine={false}
                    style={style.inputWidthExpanses}
                    inputStyle={style.inputStyle}
                    onChange={(ev) => this.handleInputChange(ev)}
                    value={expanse}
                    name="expanse"
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
                    hintText="категорія витрат"
                    hintStyle={style.inputTextArea}
                    multiLine={false}
                    inputStyle={style.inputStyle}
                    style={style.inputWidth}
                    value={category}
                    onChange={(ev) => this.handleInputChange(ev)}
                    name="category"
                /><br />

                <div className={styles.ButtonContainer}>
                    <RaisedButton
                        label="Внести"
                        style={style.buttonPrintInput}
                        onClick={this.handleSubmitTransaction}
                    />
                    <br />
                </div>
            </div>
        )
    }
}

export default Expanse;