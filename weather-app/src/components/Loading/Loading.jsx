import React from 'react'
import styles from './Loading.module.css'

const Loading = ({message}) => {
  return (
    <div>
    <div className={styles.loading}></div>
      {message}
    </div>
  )
}

export default Loading
