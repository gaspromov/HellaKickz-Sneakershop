import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uploadPhoto, deletePhotos } from '../../store/photo/actions'
import { uploadFeedback } from '../../store/feedback/actions'
import useInput from '../../hooks/useInput'
import classNames from 'classnames'
import Button from '../Button/Button'

import styles from './AdminFeedbackSave.module.scss'

const AdminFeedbackSave = ({ id }) => {
  const [photo, setPhoto] = useState('')
  const name = useInput('')
  const subs = useInput('')
  const feedback = useInput('')
  const { loading, error } = useSelector(({ uploadFeedback }) => uploadFeedback)

  const dispatch = useDispatch()

  const onUploadPhotoClick = (e) => {
    setPhoto(e.target.files[0])
  }

  const onDeletePhotoButtonClick = () => {
    dispatch(deletePhotos(id))
    setPhoto('')
  }

  useEffect(() => {
    photo && dispatch(uploadPhoto(photo, 'feedbacks', id))
  }, [photo])

  useEffect(() => {
    return () => {
      dispatch(deletePhotos())
    }
  }, [])

  const onUploadFeedbackButtonClick = () => {
    const data = {
      name: name.value,
      subs: subs.value,
      feedback: feedback.value
    }

    dispatch(uploadFeedback(id, data))
  }

  return (
    <div className={styles.feedback}>
      <p className={styles.id}>#{id}</p>
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
      <div className={styles.nickWrapper}>
        <p className={styles.title}>Nick.:</p>
        <input type="text" placeholder="@nickname" {...name.bind} className={styles.input} />
      </div>
      <div className={styles.subsWrapper}>
        <p className={styles.title}>Subs.:</p>
        <input type="text" placeholder="47 тыс. подписчиков" {...subs.bind} className={styles.input} />
      </div>
      <div>
        <p style={{ marginBottom: '10px' }} className={styles.title}>Feedback:</p>
        <br />
        <textarea placeholder="Отзыв..." {...feedback.bind} className={styles.textarea}></textarea>
      </div>
      <p className={classNames('message', error[id] && 'error')}>
        <>
          {loading[id] && 'Подождите...'}
          {error[id]}
        </>
      </p>
      <Button type="button" style="regular" className={styles.saveFeedbackButton} text="Сохранить" onClick={onUploadFeedbackButtonClick} />
    </div>
  )
}

export default AdminFeedbackSave
