import React from 'react'
import AdminSlideSave from '../AdminSlideSave/AdminSlideSave'
import AdminHotSave from '../AdminHotSave/AdminHotSave'

import styles from './AdminPhotos.module.scss'

const AdminPhotos = () => {
  return (
    <div className={styles.container}>
      <h2 className="visually-hidden">Фото на лендинге</h2>
      <div className={styles.headWrapper}>
        <h3 className={styles.title}>Head</h3>
        <small className={styles.size}>5/2 (1440х550)</small>
        <div className={styles.slides}>
          <AdminSlideSave id={1} />
          <AdminSlideSave id={2} />
          <AdminSlideSave id={3} />
        </div>
      </div>
      <div className={styles.hotWrapper}>
        <h3 className={styles.title}>Hot</h3>
        <div className={styles.host}>
          <AdminHotSave id={4} size="2/3 (390х690)" gridArea="a" />
          <AdminHotSave id={5} size="3/4 (280x230)" gridArea="b" />
          <AdminHotSave id={6} size="3/4 (280x230)" gridArea="c" />
          <AdminHotSave id={7} size="5/3 (628x370)" gridArea="d" />
        </div>
      </div>
    </div>
  )
}

export default AdminPhotos
