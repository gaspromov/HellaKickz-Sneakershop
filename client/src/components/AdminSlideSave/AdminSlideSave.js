import React from 'react'
import Button from '../Button/Button'

import styles from './AdminSlideSave.module.scss'

const AdminSlidesDownload = ({ id }) => {
  return (
    <div className={styles.slide}>
      <p className={styles.title}>Slide {id}:</p>
      <label htmlFor="fileUpload" className={styles.label}>
        Download <input type="file" id="fileUpload" className={styles.fileInput} />
      </label>
      <div className={styles.pathWrapper}>
        <p className={styles.path}>slide1.nike.png</p>
        <button type="button" className={styles.deleteIcon}></button>
      </div>
      <Button type="button" style="regular" className={styles.saveHeadPhotosButton} text="Сохранить" />
    </div>
  )
}

export default AdminSlidesDownload
