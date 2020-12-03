import React from 'react'
import AdminFeedbackSave from '../AdminFeedbackSave/AdminFeedbackSave'

import styles from './AdminFeedbacks.module.scss'

const AdminFeedbacks = () => {
  return (
    <div className={styles.container}>
      <h2 className="visually-hidden">Отзывы</h2>
      <div className={styles.feedbacks}>
        <AdminFeedbackSave id={0} />
        <AdminFeedbackSave id={1} />
        <AdminFeedbackSave id={2} />
        <AdminFeedbackSave id={3} />
        <AdminFeedbackSave id={4} />
        <AdminFeedbackSave id={5} />
      </div>
    </div>
  )
}

export default AdminFeedbacks
