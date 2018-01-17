import React from 'react'
import styles from './Header.css';
import { NavLink } from 'react-router-dom';

const header = (props) => {
    return (
        <nav className={styles.Header}>
            <ul className={styles.HeaderListItem}>
                <li className={styles.HeaderItem}>
                    <NavLink 
                        exact to="/" 
                        activeClassName={styles.Active} 
                        >Витрати сьогодні</NavLink>
                </li>
                <li className={styles.HeaderItem}>
                    <NavLink 
                        to="/incomes" 
                        activeClassName={styles.Active} 
                        >Дохід</NavLink></li>
            </ul>
        </nav>
    )
}

export default header;