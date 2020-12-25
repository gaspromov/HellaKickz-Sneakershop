import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uploadPhoto, deletePhotos } from '../../store/photo/actions'
import { addProduct } from '../../store/product/actions'
import useInput from '../../hooks/useInput'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import Button from '../../components/Button/Button'
import AutosizeInput from 'react-input-autosize'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import CarouselArrow from '../../components/CarouselArrow/CarouselArrow'
import CarouselIndicator from '../../components/CarouselIndicator/CarouselIndicator'

import styles from './AdminAddItem.module.scss'
import usSizes from '../../assets/sizes/us'
import euSizes from '../../assets/sizes/eu'
import clothesSizes from '../../assets/sizes/clothes'

const AdminAddItem = ({ history }) => {
  const [photos, setPhotos] = useState([])
  const brand = useInput('')
  const model = useInput('')
  const color = useInput('')
  const price = useInput('')
  const code = useInput('')
  const category = useInput('sneakers')
  const [sizes, setSizes] = useState({})
  const { loading, loaded, error } = useSelector(({ addProduct }) => addProduct)
  const [isCreateButtonClicked, setIsCreateButtonClicked] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(deletePhotos())
    }
  }, [])

  useEffect(() => {
    if (loaded && !error && isCreateButtonClicked) {
      history.push('/admin/dashboard#section=items')
    }
  }, [loaded, error, isCreateButtonClicked])

  // Photo Handlers
  const onUploadPhotoClick = (e) => {
    dispatch(uploadPhoto(e.target.files[0], 'products'))
    setPhotos((prevPhotos) => [...prevPhotos, e.target.files[0]])
  }

  const onDeletePhotosButtonClick = () => {
    setPhotos([])
    dispatch(deletePhotos())
  }
  // ----------------------------------------------------------------------

  // Sizes handlers
  useEffect(() => {
    setSizes({})
  }, [category.value])

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
        return euSizes
      default:
        return usSizes
    }
  }

  const onSelectAllSizesButtonClick = () => {
    setSizes(renderSizesArray().reduce((acc, size) => {
      acc[size.toLowerCase()] = true
      return acc
    }, {}))
  }

  const onRemoveAllSizesButtonClick = () => {
    setSizes({})
  }
  // ----------------------------------------------------------------------

  // Save product handlers
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

    setIsCreateButtonClicked(true)
    dispatch(addProduct(product))
  }

  const onEraseAllButtonClick = () => {
    setPhotos([])
    dispatch(deletePhotos())
    brand.clear()
    model.clear()
    color.clear()
    price.clear()
    code.clear()
    setSizes({})
  }
  // ----------------------------------------------------------------------

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
        {photos.length > 0 && (
          <Carousel
            renderThumbs={() => []}
            emulateTouch
            showStatus={false}
            renderArrowPrev={(onClickHandler, label) => <CarouselArrow title={label} onClick={onClickHandler} position="left" style="gray" className={styles.leftArrow} />}
            renderArrowNext={(onClickHandler, label) => <CarouselArrow title={label} onClick={onClickHandler} position="right" style="gray" className={styles.rightArrow} />}
            renderIndicator={(onClickHandler, isSelected) => {
              if (isSelected) {
                return <CarouselIndicator style="gray" isSelected onClick={onClickHandler} />
              }

              return <CarouselIndicator style="gray" onClick={onClickHandler} />
            }}
            className={styles.carouselWrapper}>
            {photos.map((photo, id) => {
              return <img src={URL.createObjectURL(photo)} alt={`Фото ${id + 1}`} className={styles.photo} />
            })}
          </Carousel>
        )}
      </div>
      <div className={styles.addPanel}>
        <NavLink to="/admin/dashboard#section=items" className={styles.exitButton}></NavLink>
        <AutosizeInput name="brand" value={brand.bind.value} onChange={brand.bind.onChange} placeholder="Бренд" className={styles.grayInput} />
        <AutosizeInput name="model" value={model.bind.value} onChange={model.bind.onChange} placeholder="Модель" className={styles.grayInput} />
        <AutosizeInput name="color" value={color.bind.value} onChange={color.bind.onChange} placeholder="Цвет" className={styles.grayInput} />
        <AutosizeInput name="price" value={price.bind.value} onChange={price.bind.onChange} placeholder="Цена" className={styles.grayInput} />
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
                  <input type="checkbox" id={size} name={size} checked={!!sizes[size.toLowerCase()]} readOnly className={styles.checkboxButton} />
                  <label htmlFor={size} data-size={size} className={styles.checkboxLabel}>{size}</label>
                </div>
              )
            })}
          </div>
        </div>
        <div className={styles.buttons}>
          <p className={classNames('message', error && 'error')}>
            <>
              {loading && 'Подождите...'}
              {error}
            </>
          </p>
          <Button type="button" style="regular" className={styles.itemButton} text="Сохранить" onClick={onItemSaveButtonClick} />
          <Button type="button" style="black" className={styles.itemButton} text="Сбросить" onClick={onEraseAllButtonClick} />
        </div>
      </div>
    </div>
  )
}

export default AdminAddItem
