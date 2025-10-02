import React from 'react'
import styles from './Loading.module.css'

const Loading = ({message}) => {
  return (
    <div className={styles.loading}>
        {message}
    </div>
  )
}

export default Loading
