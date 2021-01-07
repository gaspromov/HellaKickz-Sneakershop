import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uploadPhoto, deletePhotos } from '../../store/photo/actions'
import { uploadHot } from '../../store/hot/actions'
import classNames from 'classnames'
import useInput from '../../hooks/useInput'
import Button from '../Button/Button'

import styles from './AdminHotSave.module.scss'

const AdminHotDownload = ({ id, size, gridArea }) => {
  const [photo, setPhoto] = useState('')
  const link = useInput('')
  const { loading, error } = useSelector(({ uploadHot }) => uploadHot)
  const dispatch = useDispatch()

  const onUploadPhotoClick = (e) => {
    setPhoto(e.target.files[0])
  }

  const onDeletePhotoButtonClick = () => {
    dispatch(deletePhotos(id))
    setPhoto('')
  }

  const onSaveHotButtonClick = () => {
    dispatch(uploadHot(id, link.value))
  }

  useEffect(() => {
    photo && dispatch(uploadPhoto(photo, 'hots', id))
  }, [photo])

  useEffect(() => {
    return () => {
      dispatch(deletePhotos())
    }
  }, [])

  return (
    <div style={{ gridArea }} className={styles.hot}>
      <div className={styles.container}>
        <p className={styles.size}>{size}</p>
        <p className={styles.title}>Photo:</p>
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
        <p className={classNames('message', error[id - 4] && 'error')}>
          <>
            {loading[id - 4] && 'Подождите...'}
            {error[id - 4]}
          </>
        </p>
        <Button type="button" style="regular" className={styles.saveHotPhotoButton} text="Сохранить" onClick={onSaveHotButtonClick} />
      </div>
    </div>
  )
}

export default AdminHotDownload
