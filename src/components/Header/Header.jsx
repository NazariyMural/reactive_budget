import React from 'react'
import styles from './Header.css';
import { NavLink } from 'react-router-dom';


const header = (props) => {
    let active = document.querySelector('.active');
    console.log(active);
    return (
        <header className={styles.Header}>
            <ul className={styles.HeaderListItem}>
                <li className={styles.HeaderItem}>
                    <NavLink exact to="/" activeStyle={{ borderBottom: '2px solid #fff' }} >Home</NavLink>
                </li>
                <li className={styles.HeaderItem}><NavLink to="/incomes" activeStyle={{ borderBottom: '2px solid #fff' }} >Incomes</NavLink></li>
            </ul>
        </header>
    )
}

export default header;