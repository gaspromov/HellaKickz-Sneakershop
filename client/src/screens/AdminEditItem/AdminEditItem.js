import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uploadPhoto, deletePhotos } from '../../store/photo/actions'
import { editProduct, fetchProduct } from '../../store/product/actions'
import useInput from '../../hooks/useInput'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import Button from '../../components/Button/Button'
import AutosizeInput from 'react-input-autosize'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import CarouselArrow from '../../components/CarouselArrow/CarouselArrow'
import CarouselIndicator from '../../components/CarouselIndicator/CarouselIndicator'

import styles from './AdminEditItem.module.scss'
import usSizes from '../../assets/sizes/us'
import euSizes from '../../assets/sizes/eu'
import clothesSizes from '../../assets/sizes/clothes'

const AdminEditItem = ({ match: { params: { id } } }) => {
  const { loading: productLoading, productError, entities } = useSelector(({ product }) => product)
  const { loading: editLoading, error: editError } = useSelector(({ editProduct }) => editProduct)
  const [newPhotos, setNewPhotos] = useState([])
  const newBrand = useInput('')
  const newModel = useInput('')
  const newColor = useInput('')
  const newPrice = useInput('')
  const newCode = useInput('')
  const [newCategory, setNewCategory] = useState('')
  const [newSizes, setNewSizes] = useState({})
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProduct(id))

    return () => {
      dispatch(deletePhotos())
    }
  }, [])

  useEffect(() => {
    if (entities.product) {
      setNewPhotos(entities.product.photos)
      newBrand.setInitialValue(entities.product.brand)
      newModel.setInitialValue(entities.product.model)
      newColor.setInitialValue(entities.product.color)
      newPrice.setInitialValue(entities.product.price)
      newCode.setInitialValue(entities.product.code)
      setNewCategory(entities.product.category)
      setNewSizes(entities.product.sizes.reduce((acc, size) => {
        acc[size] = true
        return acc
      }, {}))
    }
  }, [entities])

  // Photo handlers
  const onUploadPhotoClick = (e) => {
    dispatch(uploadPhoto(e.target.files[0], 'products'))
    setNewPhotos((prevPhotos) => [...prevPhotos, e.target.files[0]])
  }

  const onDeletePhotosButtonClick = () => {
    setNewPhotos([])
    dispatch(deletePhotos())
  }
  // ----------------------------------------------------------------------

  // Category handlers
  const onNewCategoryChange = (e) => {
    setNewCategory(e.target.value)
    setNewSizes({})
  }
  // ----------------------------------------------------------------------

  // Sizes handlers
  const onSizesClick = (e) => {
    if (e.target.tagName === 'LABEL') {
      const size = e.target.dataset.size.toLowerCase()
      if (newSizes[size]) {
        setNewSizes((prevSizes) => {
          const { [size]: deletedValue, ...newNewSizes } = prevSizes
          return newNewSizes
        })
      } else {
        setNewSizes((prevSizes) => ({ ...prevSizes, [size]: true }))
      }
    }
  }

  const renderSizesArray = () => {
    switch (newCategory) {
      case 'sneakers':
        return usSizes
      case 'clothes':
        return clothesSizes
      case 'accessory':
        return ['One size']
      case 'childish':
        return euSizes
      default:
        return usSizes
    }
  }

  const onSelectAllSizesButtonClick = () => {
    setNewSizes(renderSizesArray().reduce((acc, size) => {
      acc[size.toLowerCase()] = true
      return acc
    }, {}))
  }

  const onRemoveAllSizesButtonClick = () => {
    setNewSizes({})
  }
  // ----------------------------------------------------------------------

  // Save product handlers
  const onItemSaveButtonClick = () => {
    const product = {
      photos: newPhotos.filter((photo) => typeof photo !== 'object'),
      brand: newBrand.value,
      model: newModel.value,
      color: newColor.value,
      code: newCode.value,
      price: newPrice.value,
      sizes: Object.keys(newSizes),
      category: newCategory
    }

    dispatch(editProduct(id, product))
  }

  const onEraseAllButtonClick = () => {
    setNewPhotos([])
    dispatch(deletePhotos())
    newBrand.clear()
    newModel.clear()
    newColor.clear()
    newPrice.clear()
    newCode.clear()
    setNewSizes({})
  }
  // ----------------------------------------------------------------------

  if (productLoading) {
    return <p>Загрузка...</p>
  }

  if (!entities?.product) {
    return <span>wtf</span>
  }

  if (productError) {
    return <p>Ошибка</p>
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
        {newPhotos.length > 0 && (
          <Carousel
            renderThumbs={() => []}
            emulateTouch
            showStatus={false}
            className={styles.carouselWrapper}
            renderArrowPrev={(onClickHandler, hasPrev, label) => <CarouselArrow title={label} onClick={onClickHandler} position="left" style="gray" className={styles.leftArrow} />}
            renderArrowNext={(onClickHandler, hasNext, label) => <CarouselArrow title={label} onClick={onClickHandler} position="right" style="gray" className={styles.rightArrow} />}
            renderIndicator={(onClickHandler, isSelected) => {
              if (isSelected) {
                return <CarouselIndicator style="gray" isSelected onClick={onClickHandler} />
              }

              return <CarouselIndicator style="gray" onClick={onClickHandler} />
            }}
          >
            {newPhotos.map((photo, id) => {
              return <img src={typeof photo === 'object' ? URL.createObjectURL(photo) : photo} alt={`Фото ${id + 1}`} className={styles.photo} />
            })}
          </Carousel>
        )}
        <p className={styles.backgroundTitle}>Загрузите фото</p>
      </div>
      <div className={styles.addPanel}>
        <NavLink to="/admin/dashboard#section=items" className={styles.exitButton}></NavLink>
        <AutosizeInput name="brand" value={newBrand.bind.value} onChange={newBrand.bind.onChange} placeholder={entities.product.brand} className={styles.grayInput} />
        <AutosizeInput name="model" value={newModel.bind.value} onChange={newModel.bind.onChange} placeholder={entities.product.model} className={styles.grayInput} />
        <AutosizeInput name="color" value={newColor.bind.value} onChange={newColor.bind.onChange} placeholder={entities.product.color} className={styles.grayInput} />
        <AutosizeInput name="price" value={newPrice.bind.value} onChange={newPrice.bind.onChange} placeholder={entities.product.price} className={styles.grayInput} />
        <div className={styles.codeWrapper}>
          <p className={styles.title}>Артикул:</p>
          <input type="text" placeholder={entities.product.code} {...newCode.bind} className={styles.codeInput} />
        </div>
        <div>
          <p className={styles.title}>Тип:</p>
          <div value={newCategory} onChange={onNewCategoryChange} className={styles.radioButtons}>
            <div className={styles.radioButtonWrapper}>
              <input type="radio" id="sneakers" name="category" value="sneakers" defaultChecked={entities.product.category === 'sneakers'} className={styles.radioButton} />
              <label htmlFor="sneakers" className={styles.radioLabel}>Обувь</label>
            </div>
            <div className={styles.radioButtonWrapper}>
              <input type="radio" id="clothes" name="category" value="clothes" defaultChecked={entities.product.category === 'clothes'} className={styles.radioButton} />
              <label htmlFor="clothes" className={styles.radioLabel}>Одежда</label>
            </div>
            <div className={styles.radioButtonWrapper}>
              <input type="radio" id="accessory" name="category" value="accessory" defaultChecked={entities.product.category === 'accessory'} className={styles.radioButton} />
              <label htmlFor="accessory" className={styles.radioLabel}>Аксессуар</label>
            </div>
            <div className={styles.radioButtonWrapper}>
              <input type="radio" id="childish" name="category" value="childish" defaultChecked={entities.product.category === 'childish'} className={styles.radioButton} />
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
                  <input type="checkbox" id={size} name={size} checked={!!newSizes[size.toLowerCase()]} className={styles.checkboxButton} />
                  <label htmlFor={size} data-size={size} className={styles.checkboxLabel}>{size}</label>
                </div>
              )
            })}
          </div>
        </div>
        <div className={styles.buttons}>
          <p className={classNames('message', editError && 'error')}>
            <>
              {editLoading && 'Подождите...'}
              {editError}
            </>
          </p>
          <Button type="button" style="regular" className={styles.itemButton} text="Сохранить" onClick={onItemSaveButtonClick} />
          <Button type="button" style="black" className={styles.itemButton} text="Сбросить" onClick={onEraseAllButtonClick} />
        </div>
      </div>
    </div>
  )
}

export default AdminEditItem
