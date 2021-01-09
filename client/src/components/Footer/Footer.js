import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createCallback } from '../../store/callback/actions'
import useInput from '../../hooks/useInput'
import { NavLink } from 'react-router-dom'
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'
import classNames from 'classnames'
import Button from '../Button/Button'

import styles from './Footer.module.scss'

const Footer = () => {
  const { loading, loaded, error } = useSelector(({ createCallback }) => createCallback)
  const [isCreateCallbackModalOpen, setIsCreateCallbackModalOpen] = useState(false)
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false)
  const name = useInput('')
  const contact = useInput('')
  const dispatch = useDispatch()

  useEffect(() => {
    if (name.value && contact.value && loaded[1] && !error[1]) {
      setIsCreateCallbackModalOpen(false)
      setIsThankYouModalOpen(true)
    }
  }, [name.value, contact.value, loaded[1], error[1]])

  const onOrderCallbackButtonClick = () => {
    setIsCreateCallbackModalOpen(true)
  }

  const closeCreateCallbackModal = () => {
    setIsCreateCallbackModalOpen(false)
  }

  const closeThankYouModal = () => {
    setIsThankYouModalOpen(false)
  }

  const onSendCallbackSubmit = (e) => {
    e.preventDefault()
    dispatch(createCallback(1, name.value, contact.value))
  }

  return (
    <footer className={styles.footer}>
      <Modal open={isCreateCallbackModalOpen} onClose={closeCreateCallbackModal} classNames={{ overlay: styles.overlay }} animationDuration={0} center>
        <div className="modal">
          <p className="modalTitle">Заказ</p>
          <p className="modalText">Оставьте нам свои данные, <br /> чтобы мы с вами связались.</p>
          <form className={styles.modalForm} onSubmit={onSendCallbackSubmit}>
            <input type="text" placeholder="Имя" {...name.bind} className={styles.modalInput} />
            <input type="text" placeholder="Номер телефона / имя профиля Instagram" {...contact.bind} className={styles.modalInput} />
            <p className={classNames('message', error[1] && 'error')}>
              <>
                {loading[1] && 'Подождите...'}
                {error[1]}
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
          <Button type="button" style="regular" text="Вернутся на главную" onClick={closeThankYouModal} className={styles.toCatalogueButtonClick} />
        </div>
      </Modal>
      <div className={styles.container}>
        <ul className={styles.mobileSocialMenu}>
          <li className={styles.socialIcon}><a href="https://www.instagram.com/hellakickz_/" target="_blank"></a></li>
          <li className={styles.socialIcon}><a href="https://t.me/hellakickz" target="_blank"></a></li>
          <li className={styles.socialIcon}><a href="https://api.whatsapp.com/send/?phone=79854920460&text&app_absent=0" target="_blank"></a></li>
        </ul>
        <div className={styles.wrapper}>
          <div className={styles.contacts}>
            <p className={styles.phone}><span className={styles.phoneCode}>+7 </span>(985) 492-04-60</p>
            <button type="button" onClick={onOrderCallbackButtonClick} className={styles.callback}>Заказать обратный звонок</button>
            <ul className={styles.desktopSocialMenu}>
              <li className={styles.socialIcon}><a href="https://www.instagram.com/hellakickz_/" target="_blank"></a></li>
              <li className={styles.socialIcon}><a href="https://t.me/hellakickz" target="_blank"></a></li>
              <li className={styles.socialIcon}><a href="https://api.whatsapp.com/send/?phone=79854920460&text&app_absent=0" target="_blank"></a></li>
            </ul>
          </div>
          <ul className={styles.menu}>
            <li className={styles.menuItem}><NavLink to="/faq" className={styles.menuLink}>FAQ</NavLink></li>
            <li className={styles.menuItem}><NavLink to="/faq/#delivery" className={styles.menuLink}>Доставка</NavLink></li>
            <li className={styles.menuItem}><NavLink to="/faq/#back" className={styles.menuLink}>Обмен и возврат</NavLink></li>
            <li className={styles.menuItem}><NavLink to="/faq/#sizes" className={styles.menuLink}>Как подобрать размер</NavLink></li>
          </ul>
        </div>
        <div className={styles.policy}>
          <NavLink to="/user_agreement" target="_blank" className={styles.policyMessage}>Пользовательское соглашение</NavLink>
          <a href="https://CactusWeb.io" className={styles.cactusWebLink}>CactusWeb</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
