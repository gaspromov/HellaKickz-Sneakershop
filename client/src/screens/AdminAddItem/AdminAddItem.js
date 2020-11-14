import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Button from '../../components/Button/Button'
import ElasticInput from 'react-elastic-input'

import styles from './AdminAddItem.module.scss'

const AdminAddItem = () => {
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [color, setColor] = useState('')
  const [price, setPrice] = useState('')

  return (
    <div className={styles.container}>
      <div className={styles.photos}>
        <div className={styles.photoButtons}>
          <label htmlFor="fileUpload" className={styles.label}>
            Загрузить <input type="file" id="fileUpload" className={styles.fileInput} />
          </label>
          <Button type="button" style="black" className={styles.deletePhotosButton} text="Удалить все" />
        </div>
        <p className={styles.backgroundTitle}>Загрузите фото</p>
      </div>
      <div className={styles.addPanel}>
        <NavLink to="/admin/dashboard" className={styles.exitButton}></NavLink>
        <ElasticInput placeholder="Бренд" className={styles.grayInput} />
        <ElasticInput placeholder="Модель" className={styles.grayInput} />
        <ElasticInput placeholder="Цвет" className={styles.grayInput} />
        <ElasticInput placeholder="Цена" className={styles.grayInput} />
        <div className={styles.vendorWrapper}>
          <p className={styles.title}>Артикул:</p>
          <input type="text" className={styles.vendorInput} />
        </div>
        <div>
          <p className={styles.title}>Тип:</p>
          <div className={styles.radioButtons}>
            <input type="radio" id="sneakers" name="category" value="sneakers" className={styles.radioButton} />
            <label for="sneakers" className={styles.radioLabel}>Обувь</label>

            <input type="radio" id="clothes" name="category" value="clothes" className={styles.radioButton} />
            <label for="clothes" className={styles.radioLabel}>Одежда</label>

            <input type="radio" id="accessory" name="category" value="accessory" className={styles.radioButton} />
            <label for="accessory" className={styles.radioLabel}>Аксессуар</label>

            <input type="radio" id="childish" name="category" value="childish" className={styles.radioButton} />
            <label for="childish" className={styles.radioLabel}>Детское</label>
          </div>
        </div>
        <div style={{ marginBottom: 'auto' }}>
          <p className={styles.title}>Размеры:</p>
        </div>
        <div className={styles.buttons}>
          <Button type="button" style="regular" className={styles.itemButton} text="Сохранить" />
          <Button type="button" style="black" className={styles.itemButton} text="Сбросить" />
        </div>
      </div>
    </div>
  )
}

export default AdminAddItem
