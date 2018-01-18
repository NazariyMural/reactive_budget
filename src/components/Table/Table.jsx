import React from 'react';
import map from 'lodash/map';
import styles from './Table.css';

/* 
    {
        map(this.props.restaurants, (restaurant, key) => {
            return <Restaurant 
                        key={key}
                        {...restaurant}
                        currentUser={this.props.user}
                        handleSelect={() => this.handleSelect(key)}
                        handleDeselect={() => this.handleDeselect(key)}
                    />;
        })
    }
*/


const table = ({ transactions }) => {
    // console.log(transactions);
    return (
        <table className={styles.Table}>
            <tbody>
                {
                   map(transactions, (transaction, key) => {
                       console.log(transaction);
                       return (
                       <tr key={key}>
                            <td className={styles.Date}>{transaction.date}</td>
                            <td className={styles.Money}>{transaction.cuurency} {transaction.sum} </td>
                            <td className={styles.Category}>{transaction.category}</td>
                       </tr>
                       )
                   })
                }
            </tbody>
        </table>

    )
}
export default table;