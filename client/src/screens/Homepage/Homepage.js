import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSlides } from '../../store/slide/actions'
import { fetchHots } from '../../store/hot/actions'
import { fetchFeedbacks } from '../../store/feedback/actions'
import { NavLink, useLocation } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel'
import CarouselArrow from '../../components/CarouselArrow/CarouselArrow'
import CarouselIndicator from '../../components/CarouselIndicator/CarouselIndicator'
import Slider from 'react-elastic-carousel'
import Link from '../../components/Link/Link'
import Ticker from 'react-ticker'
import PageVisibility from 'react-page-visibility'
import { Element } from 'react-scroll'
import { Helmet } from 'react-helmet'

import styles from './Homepage.module.scss'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import logoWhite from '../../assets/images/logoWhite.svg'
import aboutPhoto from '../../assets/images/aboutPhoto.jpg'

const Homepage = () => {
  const { loaded: slidesLoaded, entities: slides } = useSelector(({ slides }) => slides)
  const { loaded: hotsLoaded, entities: hots } = useSelector(({ hots }) => hots)
  const { loaded: feedbacksLoaded, entities: feedbacks } = useSelector(({ feedbacks }) => feedbacks)
  const [pageIsVisible, setPageIsVisible] = useState(true)
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    dispatch(fetchSlides())
    dispatch(fetchHots())
    dispatch(fetchFeedbacks())
  }, [])

  useEffect(() => {
    if (location.hash) {
      const elem = document.getElementById(location.hash.slice(1))
      if (elem) {
        setTimeout(() => {
          elem.scrollIntoView({ behavior: "smooth" })
        }, 500)
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
    }
  }, [location])

  const handleVisibilityChange = (isVisible) => {
    setPageIsVisible(isVisible)
  }

  const onSlideClick = (index) => {
    window.open(slides[index].link)
  }

  return (
    <main role="main">
      <Helmet>
        <meta name="description" content="Мы занимаемся только 100% оригинальной продукцией Yeezy | Jordan и много другое. Гарантии оригинальности товара." />
        <meta name="keywords" content="кроссовки, изи, изи 350, YEEZY, yeezy boost, оригинал, только оригинал, yeezy 350 v2, купить изи 350, hellakickz, мода, Jordan, Off-White, офф вайт, yeezy 700, hypestation, депо, kickstown, айзел, aizel, nikita efremov, federation, фederation, оригинальные бренды, tsum, цум, Kanye west, канье вест, коллаборация, фарфетч, farfetch, supreme, kaws, суприм, кавс, travis scott, тревис скот, nike, dunk, virgil abloh, вирджил абло, yeezy black, yeezy white" />
        <title>Hellakickz – Больше чем просто кроссовки</title>
      </Helmet>
      <div>
        <div className={styles.carousel}>
          <Carousel
            renderThumbs={() => []}
            emulateTouch
            showStatus={false}
            renderArrowPrev={(onClickHandler, label) => <CarouselArrow title={label} onClick={onClickHandler} position="left" style="white" className={styles.sliderLeftArrow} />}
            renderArrowNext={(onClickHandler, label) => <CarouselArrow title={label} onClick={onClickHandler} position="right" style="white" className={styles.sliderRightArrow} />}
            renderIndicator={(onClickHandler, isSelected) => {
              if (isSelected) {
                return <CarouselIndicator style="white" isSelected onClick={onClickHandler} />
              }
              return <CarouselIndicator style="white" onClick={onClickHandler} />
            }}
            autoPlay
            infiniteLoop
            onClickItem={onSlideClick}
            className={styles.carouselWrapper}
          >
            {slidesLoaded && slides.map(({ photo }) => {
              return <img src={photo} className={styles.slide} />
            })}
          </Carousel>
        </div>
        <Link to="/catalog" text="В каталог" className={styles.link} />
        <section className={styles.sectionBest}>
          <h2 className={styles.title}>Наша подборка</h2>
          {hotsLoaded && (
            <div className={styles.bestContainer}>
              <NavLink to={hots[0].link} style={{ gridArea: 'a' }}>
                <img src={hots[0].photo} alt="Подборка 1" className={styles.bestItem} />
              </NavLink>
              <NavLink to={hots[1].link} style={{ gridArea: 'b' }}>
                <img src={hots[1].photo} alt="Подборка 2" className={styles.bestItem} />
              </NavLink>
              <NavLink to={hots[2].link} style={{ gridArea: 'c' }}>
                <img src={hots[2].photo} alt="Подборка 3" className={styles.bestItem} />
              </NavLink>
              <NavLink to={hots[3].link} style={{ gridArea: 'd' }}>
                <img src={hots[3].photo} alt="Подборка 4" className={styles.bestItem} />
              </NavLink>
            </div>
          )}
        </section>
        <PageVisibility onChange={handleVisibilityChange}>
          {pageIsVisible && (
            <Ticker>
              {() => (
                <div className={styles.tickerLine}>
                  <img src={logoWhite} alt="Лого" width={396} height={77} />
                  <p className={styles.tickerText}>Больше, чем просто кроссовки</p>
                </div>
              )}
            </Ticker>
          )}
        </PageVisibility>
        <Element id="about">
          <section className={styles.sectionAbout}>
            <h2 className={styles.title}>О нас</h2>
            <div className={styles.aboutContainer}>
              <div className={styles.aboutText}>
                <p className={styles.aboutTextParagraph}>
                  <span className={styles.aboutName}>HellaKickz</span> – это не только о лимитированных кросcовках, но и о стритвир-культуре в целом.
                </p>
                <p className={styles.aboutTextParagraph}>
                  С каждым днем все больше людей желает заполучить редкую модель, часто сталкиваясь с подделками или сомнительными продавцами.
                </p>
                <p className={styles.aboutTextParagraph}>
                  В свое время осознав эту проблему и испытав серьезные трудности при поиске и покупке лимитированной обуви, мы решили открыть свой онлайн-стор, который будет помогать в выборе и приобретении крутых и оригинальных кроссовок, одежды и аксессуаров, ведь мы не только продаем наши товары, но и сами сходим по ним с ума и с удовольствием носим.
                </p>
                <p className={styles.aboutTextParagraph}>
                  Наш большой опыт и работа в кратчайшие сроки помогут Вам быть стильными и необычными в этом бурно меняющемся мире.
                </p>
                Ваши Борис и Артем.
              </div>
              <div className={styles.aboutPhotoWrapper}>
                <img src={aboutPhoto} className={styles.aboutPhoto} />
              </div>
            </div>
          </section>
        </Element>
        <Element id="feedbacks">
          <section className={styles.sectionFeedbacks}>
            <h2 className={styles.title}>Отзывы</h2>
            <div className={styles.feedbacksWrapper}>
              <Slider
                breakPoints={[{ width: 0, itemsToShow: 2, itemsToScroll: 2 }, { width: 769, itemsToShow: 3, itemsToScroll: 3 }, { width: 850, itemsToShow: 2, itemsToScroll: 2 }, { width: 1200, itemsToShow: 3, itemsToScroll: 3 }]}
                itemPadding={[20, 10, 20, 0]}
                showArrows
                renderArrow={({ type, onClick }) =>
                  <CarouselArrow
                    onClick={onClick}
                    position={type === 'PREV' ? 'left' : 'right'}
                    style="orange"
                    className={type === 'PREV' ? styles.feedbacksLeftArrow : styles.feedbacksRightArrow}
                  />
                }
                renderPagination={({ pages, activePage, onClick }) => {
                  return (
                    <ul className={styles.feedbacksIndicators}>
                      {pages.map((page) => {
                        const isSelected = activePage === page
                        return (
                          <CarouselIndicator key={page} onClick={() => onClick(page)} style="gray" isSelected={isSelected} />
                        )
                      })}
                    </ul>
                  )
                }}
                style={{ position: 'relative' }}
              >
                {feedbacksLoaded && feedbacks.map(({ index, photo, name, subs, feedback }) => {
                  return (
                    <div key={index} className={styles.feedback}>
                      <div className={styles.feedbackBorder}></div>
                      <a href="https://www.instagram.com/s/aGlnaGxpZ2h0OjE3ODQ1NDMxOTg2MDMxNjM4?igshid=pgqq9d0h44kn" target="_blank">
                        <img src={photo} alt={`${name} аватар`} className={styles.feedbackImage} />
                      </a>
                      <h3 className={styles.feedbackName}>{name}</h3>
                      <p className={styles.feedbackSubs}>{subs}</p>
                      <p className={styles.feedbackComment}>{feedback}</p>
                    </div>
                  )
                })}
              </Slider>
            </div>
          </section>
        </Element>
      </div>
    </main>
  )
}

export default Homepage
