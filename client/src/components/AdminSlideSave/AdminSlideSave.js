import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uploadPhoto, deletePhotos } from '../../store/photo/actions'
import { uploadSlide } from '../../store/slide/actions'
import Button from '../Button/Button'

import styles from './AdminSlideSave.module.scss'

const AdminSlidesDownload = ({ id }) => {
  const [photo, setPhoto] = useState('')
  const dispatch = useDispatch()

  const onUploadPhotoClick = (e) => {
    setPhoto(e.target.files[0])
  }

  const onDeletePhotoButtonClick = () => {
    dispatch(deletePhotos(id - 1))
    setPhoto('')
  }

  const onSaveSlideButtonClick = () => {
    dispatch(uploadSlide(id - 1))
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
      <Button type="button" style="regular" onClick={onSaveSlideButtonClick} className={styles.saveHeadPhotosButton} text="Сохранить" />
    </div>
  )
}

export default AdminSlidesDownload
