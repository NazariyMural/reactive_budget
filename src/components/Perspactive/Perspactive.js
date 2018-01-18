import React, { Component } from 'react'
import styles from './Perspactive.css'

const perspactive = ( { canSpend } ) => {
    return (
        <div className={styles.Perspactive}>
            <span>Cьогодні Ти можеш витратити: {canSpend()}</span>
        </div>
    )
}

export default perspactive;