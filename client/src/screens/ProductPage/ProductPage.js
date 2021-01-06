import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
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
import Select from 'react-dropdown-select'
import Button from '../../components/Button/Button'
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'

import styles from './ProductPage.module.scss'
import spinner from '../../assets/images/spinner.svg'
import usSizes from '../../assets/sizes/us'
import euSizes from '../../assets/sizes/eu'
import clothesSizes from '../../assets/sizes/clothes'

const ProductPage = ({ match: { params: { id } } }) => {
  const { loading, loaded, error, entities } = useSelector(({ product }) => product)
  const { loading: callbackLoading, loaded: callbackLoaded, error: callbackError } = useSelector(({ createCallback }) => createCallback)
  const [isCreateCallbackModalOpen, setIsCreateCallbackModalOpen] = useState(false)
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false)
  const name = useInput('')
  const contact = useInput('')
  const [size, setSize] = useState('')
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProduct(id))
  }, [id])

  useEffect(() => {
    if (name.value && contact.value && callbackLoaded[0] && !callbackError[0]) {
      setIsCreateCallbackModalOpen(false)
      setIsThankYouModalOpen(true)
    }
  }, [name.value, contact.value, callbackLoaded[0], callbackError[0]])

  const openCreateCallbackModal = () => {
    setIsCreateCallbackModalOpen(true)
  }

  const closeCreateCallbackModal = () => {
    setIsCreateCallbackModalOpen(false)
  }

  const closeThankYouModal = () => {
    setIsThankYouModalOpen(false)
  }

  const sortOptions = (a, b) => {
    if (a.includes('us')) {
      return usSizes.indexOf(a.toUpperCase()) - usSizes.indexOf(b.toUpperCase())
    } else if (a.includes('eu')) {
      return euSizes.indexOf(a.toUpperCase()) - euSizes.indexOf(b.toUpperCase())
    }

    return clothesSizes.indexOf(a.toUpperCase()) - clothesSizes.indexOf(b.toUpperCase())
  }

  const onSizeChange = (e) => {
    setSize(e[0].value)
  }

  const onSendCallbackSubmit = (e) => {
    e.preventDefault()
    dispatch(createCallback(0, name.value, contact.value, `/product/${id}`, entities.product.brand, entities.product.model, size, entities.product.color))
  }

  const onBackLinkClick = () => {
    history.push({
      pathname: '/catalog',
      search: location?.props?.prevPath || '',
      state: { initialNum: location?.props?.num || 32, id }
    })
  }

  const renderProduct = () => {
    if (loading) {
      return (
        <div className="loader">
          <img src={spinner} alt="Подождите" className="spinner" />
        </div>
      )
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
              <p className={classNames('message', callbackError[0] && 'error')}>
                <>
                  {callbackLoading[0] && 'Подождите...'}
                  {callbackError[0]}
                </>
              </p>
              <Button type="submit" style="regular" text="Отправить" className={styles.sendCallbackButton} />
            </form>
            <p className={styles.policyWarning}>
              Нажимая кнопку “Отправить”, вы соглашаетесь <br />
            с политикой <span className={styles.policyWarningUnderline}>обработки персональных данных</span>
            </p>
            <p className={styles.writeInstagramMessage}>Или напишите нам в Instagram <br />
              <a href="https://www.instagram.com/hellakickz_/" target="_blank" className={styles.writeInstagramMessageLink}>@hellakickz_</a>
            </p>
          </div>
        </Modal>
        <Modal open={isThankYouModalOpen} onClose={closeThankYouModal} classNames={{ overlay: styles.overlay }} animationDuration={0} center>
          <div className="modal">
            <p className="modalTitle">Отправлено</p>
            <p className="modalText">Спасибо за обращение. <br /> Мы с вами свяжемся.</p>
            <Button type="button" style="regular" text="К товару" onClick={closeThankYouModal} className={styles.toCatalogueButtonClick} />
          </div>
        </Modal>
        <button className={styles.mobileGoBackButton} onClick={onBackLinkClick}></button>
        <div className={styles.productContainer}>
          <div className={styles.photos}>
            {entities?.product?.photos?.length > 0 && (
              <Carousel
                renderThumbs={() => []}
                emulateTouch
                showStatus={false}
                className={styles.carouselWrapper}
                renderArrowPrev={(onClickHandler, label) => <CarouselArrow title={label} onClick={onClickHandler} position="left" style="gray" className={styles.leftArrow} />}
                renderArrowNext={(onClickHandler, label) => <CarouselArrow title={label} onClick={onClickHandler} position="right" style="gray" className={styles.rightArrow} />}
                renderIndicator={(onClickHandler, isSelected) => {
                  if (isSelected) {
                    return <CarouselIndicator style="gray" isSelected onClick={onClickHandler} />
                  }

                  return <CarouselIndicator style="gray" onClick={onClickHandler} />
                }}
              >
                {entities.product.photos.map((photo, id) => {
                  return <img key={id} src={photo} alt={`Фото ${id + 1}`} className={styles.photo} />
                })}
              </Carousel>
            )}
          </div>
          <div className={styles.productInfo}>
            <button className={styles.goBackButton} onClick={onBackLinkClick}></button>
            {entities?.sameProducts?.length > 1 && (
              <div className={styles.colors}>
                <p className={styles.colorLabel}>Цвет:</p>
                {entities.sameProducts.map(({ _id, photos, brand, model, color }) => {
                  return (
                    <NavLink to={`/product/${_id}/${brand}-${model}`} key={_id} className={styles.imageLink}>
                      < img
                        src={photos[0]}
                        alt={`${brand} ${model} ${color}`
                        }
                        className={classNames(styles.imagePreview, _id === id && styles.imagePreviewCurrent)}
                      />
                    </NavLink >
                  )
                })}
              </div >
            )
            }
            <p className={styles.brand}>{entities?.product?.brand}</p>
            <p className={styles.model}>{entities?.product?.model} {entities?.product?.color}</p>
            <p className={styles.price}>от {entities?.product?.price.toLocaleString('ru')} руб.</p>
            {
              entities?.product?.sizes.length > 0 && (
                <div className={styles.sizesWrapper}>
                  <p className={styles.sizeLabel}>Размер:</p>
                  <Select
                    options={entities?.product?.sizes.sort(sortOptions).map((size) => ({ value: size, label: size.toUpperCase() }))}
                    onChange={onSizeChange}
                    searchable={false}
                    placeholder="Выберите размер"
                    color="#000000"
                    dropdownGap={-3}
                    className={styles.sizes}
                  />
                  <NavLink to="/faq" className={styles.faqButton}>Как подобрать размер?</NavLink>
                </div>
              )
            }
            <Button type="button" style="regular" text="Купить" onClick={openCreateCallbackModal} className={styles.buyButton} />
            <p className={styles.priceWarning}>Цены на разные размеры могут различаться</p>
          </div >
        </div >
      </div >
    )
  }

  return (
    <main role="main" className={styles.main}>
      {renderProduct()}
    </main>
  )
}

export default ProductPage
