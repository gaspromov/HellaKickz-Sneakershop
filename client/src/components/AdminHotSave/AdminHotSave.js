import React from 'react'
import Button from '../Button/Button'

import styles from './AdminHotSave.module.scss'

const AdminHotDownload = ({ size, gridArea }) => {
  return (
    <div style={{ gridArea }} className={styles.hot}>
      <div className={styles.container}>
        <p className={styles.size}>{size}</p>
        <p className={styles.title}>Photo:</p>
        <label htmlFor="fileUpload" className={styles.label}>
          Download <input type="file" id="fileUpload" className={styles.fileInput} />
        </label>
        <div className={styles.pathWrapper}>
          <p className={styles.path}>slide1.nike.png</p>
          <button type="button" className={styles.deleteIcon}></button>
        </div>
        <div>
          <p className={styles.title}>Link:</p>
          <input type="text" className={styles.input} />
        </div>
        <Button type="button" style="regular" className={styles.saveHotPhotoButton} text="Сохранить" />
      </div>
    </div>
  )
}

export default AdminHotDownload
