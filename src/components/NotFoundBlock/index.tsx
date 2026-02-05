import React from 'react'
import styles from './NotFoundBlock.module.scss'

 export const NotFoundBlock: React.FC = () => {
  return (
    <div className ={styles.root}>
      <h1  >Пошел нахуй ты и так жирный урод!</h1>
       <br/>
      <button>Поплачь нищита!</button>
    </div>
  )
}
