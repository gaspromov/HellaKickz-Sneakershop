import React from 'react'
import Button from '../Button/Button'

import styles from './AdminFeedbackSave.module.scss'

const AdminFeedbackSave = ({ id }) => {
  return (
    <div className={styles.feedback}>
      <p className={styles.id}>#{id}</p>
      <p className={styles.title}>Photo:</p>
      <label htmlFor="fileUpload" className={styles.label}>
        Download <input type="file" id="fileUpload" className={styles.fileInput} />
      </label>
      <div className={styles.pathWrapper}>
        <p className={styles.path}>slide1.nike.png</p>
        <button type="button" className={styles.deleteIcon}></button>
      </div>
      <div className={styles.nickWrapper}>
        <p className={styles.title}>Nick.:</p>
        <input type="text" placeholder="@nickname" className={styles.input} />
      </div>
      <div className={styles.subsWrapper}>
        <p className={styles.title}>Subs.:</p>
        <input type="text" placeholder="47 тыс. подписчиков" className={styles.input} />
      </div>
      <div>
        <p style={{ marginBottom: '10px' }} className={styles.title}>Feedback:</p>
        <br />
        <textarea placeholder="Отзыв..." className={styles.textarea}></textarea>
      </div>
      <Button type="button" style="regular" className={styles.saveFeedbackButton} text="Сохранить" />
    </div>
  )
}

export default AdminFeedbackSave
