import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProduct } from '../../store/product/actions'
import { createCallback } from '../../store/callback/actions'
import useInput from '../../hooks/useInput'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import CarouselIndicator from '../../components/CarouselIndicator/CarouselIndicator'
import CarouselArrow from '../../components/CarouselArrow/CarouselArrow'
import Select from 'react-select'
import SelectOption from '../../components/SelectOption/SelectOption'
import SelectMenu from '../../components/SelectMenu/SelectMenu'
import SelectControl from '../../components/SelectControl/SelectControl'
import Button from '../../components/Button/Button'
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'

import styles from './ProductPage.module.scss'

const ProductPage = ({ match: { params: { id } }, history }) => {
  const { loading, loaded, error, entities } = useSelector(({ product }) => product)
  const { loading: callbackLoading, loaded: callbackLoaded, error: callbackError } = useSelector(({ createCallback }) => createCallback)
  const [isCreateCallbackModalOpen, setIsCreateCallbackModalOpen] = useState(false)
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false)
  const name = useInput('')
  const contact = useInput('')
  const [size, setSize] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProduct(id))
  }, [])

  useEffect(() => {
    if (name.value && contact.value && callbackLoaded && !callbackError) {
      setIsCreateCallbackModalOpen(false)
      setIsThankYouModalOpen(true)
    }
  }, [name.value, contact.value, callbackLoaded, callbackError])

  const openCreateCallbackModal = () => {
    setIsCreateCallbackModalOpen(true)
  }

  const closeCreateCallbackModal = () => {
    setIsCreateCallbackModalOpen(false)
  }

  const openThankYouModal = () => {
    setIsThankYouModalOpen(true)
  }

  const closeThankYouModal = () => {
    setIsThankYouModalOpen(false)
  }

  const onSizeChange = (e) => {
    setSize(e.value)
  }

  const onSendCallbackSubmit = (e) => {
    e.preventDefault()
    dispatch(createCallback(name.value, contact.value, `/product/${id}`, entities.product.brand, entities.product.model, size, entities.product.color))
  }

  const onToCatalogueButtonClick = () => {
    history.push('/catalogue')
  }

  if (loading) {
    return <p className="message">Подождите...</p>
  }

  if (loaded && !entities.product) {
    return <p className="message">Данные отсутствуют</p>
  }

  if (error) {
    return <p className="error">{error}</p>
  }

  return (
    <div className={styles.container}>
      <Modal open={isCreateCallbackModalOpen} onClose={closeCreateCallbackModal} classNames={{ overlay: styles.overlay }} animationDuration={0} center>
        <div className="modal">
          <p className="modalTitle">Заказ</p>
          <p className="modalText">Оставьте нам свои данные, <br /> чтобы мы с вами связались.</p>
          <form className={styles.modalForm} onSubmit={onSendCallbackSubmit}>
            <input type="text" placeholder="Имя" {...name.bind} className={styles.modalInput} />
            <input type="text" placeholder="Номер телефона / имя профиля Instagram" {...contact.bind} className={styles.modalInput} />
            <p className={classNames('message', callbackError && 'error')}>
              <>
                {callbackLoading && 'Подождите...'}
                {callbackError}
              </>
            </p>
            <Button type="submit" style="regular" text="Отправить" className={styles.sendCallbackButton} />
          </form>
          <p className={styles.policyWarning}>
            Нажимая кнопку “Отправить”, вы соглашаетесь <br />
            с политикой <span className={styles.policyWarningUnderline}>обработки персональных данных</span>
          </p>
          <p className={styles.writeInstagramMessage}>Или напишите нам в Instagram <br />
            <span className={styles.writeInstagramMessageLink}>@hellakickz_</span>
          </p>
        </div>
      </Modal>
      <Modal open={isThankYouModalOpen} onClose={closeThankYouModal} classNames={{ overlay: styles.overlay }} animationDuration={0} center>
        <div className="modal">
          <p className="modalTitle">Отправлено</p>
          <p className="modalText">Спасибо за обращение. <br /> Мы с вами свяжемся.</p>
          <Button type="button" style="regular" text="В каталог" onClick={onToCatalogueButtonClick} className={styles.toCatalogueButtonClick} />
        </div>
      </Modal>
      <NavLink to="/catalogue" className={styles.mobileGoBackButton}></NavLink>
      <div className={styles.productContainer}>
        <div className={styles.photos}>
          {entities?.product?.photos?.length > 0 && (
            <Carousel
              renderThumbs={() => []}
              emulateTouch
              showStatus={false}
              className={styles.carouselWrapper}
              renderArrowPrev={(onClickHandler, hasPrev, label) => hasPrev && (
                <CarouselArrow title={label} onClick={onClickHandler} position="left" style="white" className={styles.leftArrow} />
              )}
              renderArrowNext={(onClickHandler, hasNext, label) => hasNext && (
                <CarouselArrow title={label} onClick={onClickHandler} position="right" style="white" className={styles.rightArrow} />
              )}
              renderIndicator={(onClickHandler, isSelected) => {
                if (isSelected) {
                  return <CarouselIndicator style="gray" isSelected onClick={onClickHandler} />
                }

                return <CarouselIndicator style="gray" onClick={onClickHandler} />
              }}
            >
              {entities.product.photos.map((photo, id) => {
                return <img src={`http://localhost:3000/${photo}`} alt={`Фото ${id + 1}`} className={styles.photo} />
              })}
            </Carousel>
          )}
        </div>
        <div className={styles.productInfo}>
          <NavLink to="/catalogue" className={styles.goBackButton}></NavLink>
          <p className={styles.brand}>{entities?.product?.brand}</p>
          <p className={styles.model}>{entities?.product?.model} {entities?.product?.color}</p>
          <p className={styles.price}>{entities?.product?.price} руб.</p>
          {entities?.product?.sizes.length > 0 && (
            <div className={styles.sizesWrapper}>
              <p className={styles.sizeLabel}>Размер:</p>
              <Select
                options={entities?.product?.sizes.map((size) => ({ value: size, label: isNaN(size) ? size : `${size} US` }))}
                placeholder="Выбрать размер"
                isSearchable={false}
                className={styles.sizes}
                components={{ Option: SelectOption, Menu: SelectMenu, Control: SelectControl }}
                onChange={onSizeChange}
              />
              <NavLink to="/" className={styles.faqButton}>Как выбрать размер?</NavLink>
            </div>
          )}
          <Button type="button" style="regular" text="Купить" onClick={openCreateCallbackModal} className={styles.buyButton} />
          <p className={styles.priceWarning}>Цены на разные размеры могут различаться</p>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
