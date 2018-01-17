import React, { Component } from 'react'
import styles from './Expanse.css';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

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



class Expanse extends Component {
    state = {
        expanse: {
            expanse: '',
            category: '',
        },
    }

    handleInputChange = (ev) => {
        let expanse = { ...this.state.expanse }
        expanse[ev.target.name] = ev.target.value
        this.setState({ expanse })
    }


    handleSubmitTransaction = () => {
        const { onSubmit } = this.props;
        let expanse = { ...this.state.expanse }

        //execute the onSubmit function with two parement one olways should be negative
        onSubmit( -1 * Math.abs(parseFloat(expanse.expanse)), expanse.category );

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
                    inputStyle={style.inputStyle}
                    onChange={(ev) => this.handleInputChange(ev)}
                    value={expanse}
                    name="expanse"
                /><br />
                <span className={styles.SpanTitle}>Внесіть витрати:</span>
                <TextField
                    hintText="Категорія"
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

export default Expanse;