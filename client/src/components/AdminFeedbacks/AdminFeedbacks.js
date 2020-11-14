import React from 'react'
import AdminFeedbackSave from '../AdminFeedbackSave/AdminFeedbackSave'

import styles from './AdminFeedbacks.module.scss'

const AdminFeedbacks = () => {
  return (
    <div>
      <h2 className="visually-hidden">Отзывы</h2>
      <div className={styles.feedbacks}>
        <AdminFeedbackSave id={1} />
        <AdminFeedbackSave id={2} />
        <AdminFeedbackSave id={3} />
        <AdminFeedbackSave id={4} />
        <AdminFeedbackSave id={5} />
        <AdminFeedbackSave id={6} />
      </div>
    </div>
  )
}

export default AdminFeedbacks
