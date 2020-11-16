import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uploadPhoto, deletePhotos } from '../../store/photo/actions'
import { addProduct } from '../../store/product/actions'
import useInput from '../../hooks/useInput'
import { NavLink } from 'react-router-dom'
import Button from '../../components/Button/Button'
import ElasticInput from 'react-elastic-input'

import styles from './AdminAddItem.module.scss'
import usSizes from '../../assets/sizes/us'
import clothesSizes from '../../assets/sizes/clothes'

const AdminAddItem = () => {
  const [photo, setPhoto] = useState('')
  const brand = useInput('')
  const model = useInput('')
  const color = useInput('')
  const price = useInput('')
  const code = useInput('')
  const category = useInput('sneakers')
  const [sizes, setSizes] = useState({})
  const { loading, loaded, error } = useSelector(({ addProduct }) => addProduct)
  const dispatch = useDispatch()

  const onUploadPhotoClick = (e) => {
    setPhoto(e.target.files[0])
  }

  const onDeletePhotosButtonClick = () => {
    dispatch(deletePhotos())
  }

  useEffect(() => {
    setSizes({})
  }, [category.value])

  useEffect(() => {
    photo && dispatch(uploadPhoto(photo, 'products'))
  }, [photo])

  const onSizesClick = (e) => {
    if (e.target.tagName === 'LABEL') {
      const size = e.target.dataset.size.toLowerCase()
      if (sizes[size]) {
        setSizes((prevSizes) => {
          const { [size]: deletedValue, ...newSizes } = prevSizes
          return newSizes
        })
      } else {
        setSizes((prevSizes) => ({ ...prevSizes, [size]: true }))
      }
    }
  }

  const renderSizesArray = () => {
    switch (category.value) {
      case 'sneakers':
        return usSizes
      case 'clothes':
        return clothesSizes
      case 'accessory':
        return ['One size']
      case 'childish':
        return usSizes
      default:
        return usSizes
    }
  }

  const onSelectAllSizesButtonClick = () => {
    setSizes(renderSizesArray().reduce((acc, size) => {
      acc[size] = true
      return acc
    }, {}))
  }

  const onRemoveAllSizesButtonClick = () => {
    setSizes({})
  }

  const onItemSaveButtonClick = () => {
    const product = {
      brand: brand.value,
      model: model.value,
      color: color.value,
      code: code.value,
      price: price.value,
      sizes: Object.keys(sizes),
      category: category.value
    }

    dispatch(addProduct(product))
  }

  const onEraseAllButtonClick = () => {
    setPhoto('')
    dispatch(deletePhotos())
    brand.clear()
    model.clear()
    color.clear()
    price.clear()
    code.clear()
    setSizes({})
  }

  return (
    <div className={styles.container}>
      <div className={styles.photos}>
        <div className={styles.photoButtons}>
          <label htmlFor="fileUpload" className={styles.label}>
            Загрузить <input type="file" id="fileUpload" onChange={onUploadPhotoClick} className={styles.fileInput} />
          </label>
          <Button
            type="button"
            style="black"
            className={styles.deletePhotosButton}
            text="Удалить все"
            onClick={onDeletePhotosButtonClick}
          />
        </div>
        <p className={styles.backgroundTitle}>Загрузите фото</p>
      </div>
      <div className={styles.addPanel}>
        <NavLink to="/admin/dashboard" className={styles.exitButton}></NavLink>
        <ElasticInput placeholder="Бренд" {...brand.bind} className={styles.grayInput} />
        <ElasticInput placeholder="Модель" {...model.bind} className={styles.grayInput} />
        <ElasticInput placeholder="Цвет" {...color.bind} className={styles.grayInput} />
        <ElasticInput placeholder="Цена" {...price.bind} className={styles.grayInput} />
        <div className={styles.codeWrapper}>
          <p className={styles.title}>Артикул:</p>
          <input type="text" {...code.bind} className={styles.codeInput} />
        </div>
        <div>
          <p className={styles.title}>Тип:</p>
          <div {...category.bind} className={styles.radioButtons}>
            <div className={styles.radioButtonWrapper}>
              <input type="radio" id="sneakers" name="category" value="sneakers" defaultChecked className={styles.radioButton} />
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
              <button type="button" onClick={onSelectAllSizesButtonClick} className={styles.sizesButton}>Выбрать все</button>
              <button type="button" onClick={onRemoveAllSizesButtonClick} className={styles.sizesButton}>Сбросить</button>
            </div>
          </div>
          <div className={styles.checkboxButtons} onClick={onSizesClick}>
            {renderSizesArray().map((size) => {
              return (
                <div key={size} className={styles.checkboxButtonWrapper}>
                  <input type="checkbox" id={size} name={size} checked={!!sizes[size.toLowerCase()]} className={styles.checkboxButton} />
                  <label htmlFor={size} data-size={size} className={styles.checkboxLabel}>{`${size}${category.value === 'sneakers' || category.value === 'childish' ? ' US' : ''}`}</label>
                </div>
              )
            })}
          </div>
        </div>
        <div className={styles.buttons}>
          <p className={styles.error}>{error}</p>
          <Button type="button" style="regular" className={styles.itemButton} text="Сохранить" onClick={onItemSaveButtonClick} />
          <Button type="button" style="black" className={styles.itemButton} text="Сбросить" onClick={onEraseAllButtonClick} />
        </div>
      </div>
    </div>
  )
}

export default AdminAddItem
