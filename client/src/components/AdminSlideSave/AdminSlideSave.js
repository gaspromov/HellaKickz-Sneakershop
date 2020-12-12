import React, { useState, useEffect } from 'react'
import useInput from '../../hooks/useInput'
import { useDispatch, useSelector } from 'react-redux'
import { uploadPhoto, deletePhotos } from '../../store/photo/actions'
import { uploadSlide } from '../../store/slide/actions'
import classNames from 'classnames'
import Button from '../Button/Button'

import styles from './AdminSlideSave.module.scss'

const AdminSlidesDownload = ({ id }) => {
  const [photo, setPhoto] = useState('')
  const link = useInput('')
  const { loading, error } = useSelector(({ uploadSlide }) => uploadSlide)
  const dispatch = useDispatch()

  const onUploadPhotoClick = (e) => {
    setPhoto(e.target.files[0])
  }

  const onDeletePhotoButtonClick = () => {
    dispatch(deletePhotos(id - 1))
    setPhoto('')
  }

  const onSaveSlideButtonClick = () => {
    dispatch(uploadSlide(id - 1, link.value))
  }

  useEffect(() => {
    photo && dispatch(uploadPhoto(photo, 'slides', id - 1))
  }, [photo])

  useEffect(() => {
    return () => {
      dispatch(deletePhotos())
    }
  }, [])

  return (
    <div className={styles.slide}>
      <p className={styles.title}>Slide {id}:</p>
      <label htmlFor={`fileUpload${id}`} className={styles.label}>
        Download <input type="file" id={`fileUpload${id}`} onChange={onUploadPhotoClick} className={styles.fileInput} />
      </label>
      <div className={styles.pathWrapper}>
        {photo && (
          <>
            <p className={styles.path}>{photo.name}</p>
            <button type="button" onClick={onDeletePhotoButtonClick} className={styles.deleteIcon}></button>
          </>
        )}
      </div>
      <div>
        <p className={styles.title}>Link:</p>
        <input type="text" {...link.bind} className={styles.input} />
      </div>
      <p className={classNames('message', error[id - 1] && 'error')}>
        <>
          {loading[id - 1] && 'Подождите...'}
          {error[id - 1]}
        </>
      </p>
      <Button type="button" style="regular" onClick={onSaveSlideButtonClick} className={styles.saveHeadPhotosButton} text="Сохранить" />
    </div>
  )
}

export default AdminSlidesDownload
