import React from 'react'
import styles from './Perspactive.css'
import { PropagateLoader } from 'react-spinners';



const perspactive = ({ canSpend, loading }) => {
    return (
        loading ?
            <PropagateLoader
                color={'#36D7B7'}
            />
            :
            <div className={styles.Perspactive}>
                <span>Cьогодні Ти можеш витратити: {canSpend()}</span>
            </div>

    )
}

export default perspactive;