import React from 'react';
import map from 'lodash/map';
import styles from './Table.css';
import { RingLoader } from 'react-spinners';


const table = ({ transactions, loading }) => {
    // console.log(transactions);
    return (
        loading ? 
        <RingLoader
            color={'#36D7B7'}
        />
        :
        <table className={styles.Table}>
            <tbody>
                {
                   map(transactions, (transaction, key) => {
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