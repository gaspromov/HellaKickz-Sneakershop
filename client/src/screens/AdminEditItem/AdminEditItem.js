import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uploadPhoto, deletePhotos } from '../../store/photo/actions'
import { addProduct, fetchProduct } from '../../store/product/actions'
import useInput from '../../hooks/useInput'
import { NavLink } from 'react-router-dom'
import Button from '../../components/Button/Button'
import ElasticInput from 'react-elastic-input'

import styles from './AdminEditItem.module.scss'
import usSizes from '../../assets/sizes/us'
import clothesSizes from '../../assets/sizes/clothes'

const AdminEditItem = ({ match: { params: { id } } }) => {
  const { loading, loaded, error, entities } = useSelector(({ product }) => product)
  console.log(entities.product)
  const newBrand = useInput('')
  const newModel = useInput('')
  const newColor = useInput('')
  const newPrice = useInput('')
  const newCode = useInput('')
  const newCategory = useInput('')
  const [newSizes, setNewSizes] = useState({})
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProduct(id))
  }, [])

  useEffect(() => {
    if (entities.product) {
      newBrand.setInitialValue(entities.product.brand)
      newModel.setInitialValue(entities.product.model)
      newColor.setInitialValue(entities.product.color)
      newPrice.setInitialValue(entities.product.price)
      newCode.setInitialValue(entities.product.code)
      newCategory.setInitialValue(entities.product.category)
      setNewSizes(entities.product.sizes.reduce((acc, size) => {
        acc[size] = true
        return acc
      }, {}))
    }
  }, [entities])

  if (loading) {
    return <p>Загрузка...</p>
  }

  if (!entities?.product) {
    return <span>wtf</span>
  }

  if (error) {
    return <p>Ошибка</p>
  }

  return (
    <div className={styles.container}>
      <div className={styles.photos}>
        <div className={styles.photoButtons}>
          <label htmlFor="fileUpload" className={styles.label}>
            Загрузить <input type="file" id="fileUpload" /* onChange={onUploadPhotoClick} */ className={styles.fileInput} />
          </label>
          <Button
            type="button"
            style="black"
            className={styles.deletePhotosButton}
            text="Удалить все"
          // onClick={onDeletePhotosButtonClick}
          />
        </div>
        <p className={styles.backgroundTitle}>Загрузите фото</p>
      </div>
      <div className={styles.addPanel}>
        <NavLink to="/admin/dashboard" className={styles.exitButton}></NavLink>
        <ElasticInput placeholder={entities.product.brand} {...newBrand.bind} className={styles.grayInput} />
        <ElasticInput placeholder={entities.product.model} {...newModel.bind} className={styles.grayInput} />
        <ElasticInput placeholder={entities.product.color} {...newColor.bind} className={styles.grayInput} />
        <ElasticInput placeholder={entities.product.price} {...newPrice.bind} className={styles.grayInput} />
        <div className={styles.codeWrapper}>
          <p className={styles.title}>Артикул:</p>
          <input type="text" placeholder={entities.product.code} {...newCode.bind} className={styles.codeInput} />
        </div>
        <div>
          <p className={styles.title}>Тип:</p>
          <div className={styles.radioButtons}>
            <div className={styles.radioButtonWrapper}>
              <input type="radio" id="sneakers" name="category" value="sneakers" className={styles.radioButton} />
              <label htmlFor="sneakers" className={styles.radioLabel}>Обувь</label>
            </div>
            <div className={styles.radioButtonWrapper}>
              <input type="radio" id="clothes" name="category" value="clothes" className={styles.radioButton} />
              <label htmlFor="clothes" className={styles.radioLabel}>Одежда</label>
            </div>
            <div className={styles.radioButtonWrapper}>
              <input type="radio" id="accessory" name="category" value="accessory" className={styles.radioButton} />
              <label htmlFor="accessory" className={styles.radioLabel}>Аксессуар</label>
            </div>
            <div className={styles.radioButtonWrapper}>
              <input type="radio" id="childish" name="category" value="childish" className={styles.radioButton} />
              <label htmlFor="childish" className={styles.radioLabel}>Детское</label>
            </div>
          </div>
        </div>
        <div className={styles.sizesWrapper}>
          <div style={{ marginBottom: '15px' }} className={styles.sizesHeader}>
            <p className={styles.title}>Размеры:</p>
            <div>
              <button type="button" /* onClick={onSelectAllSizesButtonClick} */ className={styles.sizesButton}>Выбрать все</button>
              <button type="button" /* onClick={onRemoveAllSizesButtonClick} */ className={styles.sizesButton}>Сбросить</button>
            </div>
          </div>
          <div className={styles.checkboxButtons} /* onClick={onSizesClick} */>
            {/* renderSizesArray() */[].map((size) => {
              return (
                <div key={size} className={styles.checkboxButtonWrapper}>
                  <input type="checkbox" /* id={size} name={size} */ /* checked={!!sizes[size.toLowerCase()]} */ className={styles.checkboxButton} />
                  <label /* htmlFor={size} data-size={size} */ className={styles.checkboxLabel}>{/* {`${size}${category.value === 'sneakers' || category.value === 'childish' ? ' US' : ''}`} */}</label>
                </div>
              )
            })}
          </div>
        </div>
        <div className={styles.buttons}>
          {/* <p className={styles.error}>{error}</p> */}
          <Button type="button" style="regular" className={styles.itemButton} text="Сохранить" /* onClick={onItemSaveButtonClick} */ />
          <Button type="button" style="black" className={styles.itemButton} text="Сбросить" /* onClick={onEraseAllButtonClick} */ />
        </div>
      </div>
    </div>
  )
}

export default AdminEditItem
