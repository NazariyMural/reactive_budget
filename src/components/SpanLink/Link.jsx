import React, { Component } from 'react'
import styles from './Link.css';



class Link extends Component {
    state = {
        navSelected: 'incomes',
    }

    render() {
        return (
            <div>
                <span
                    name='expanse'
                    onClick={(ev) => this.handleNavClick(ev)}
                    className={styles.Link}
                    >Витрати сьогодні
                </span>
                <span
                    name="incomes"
                    onClick={(ev) => this.handleNavClick(ev)}
                    className={styles.Link}
                    >Дохід
                </span>
            </div>
        )
    }
}

export default Link;