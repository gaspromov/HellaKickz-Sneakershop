import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import MobileFilterPanel from '../../components/MobileFilterPanel/MobileFilterPanel'
import FilterPanel from '../../components/FilterPanel/FilterPanel'
import { fetchProducts } from '../../store/product/actions'
import { Helmet } from 'react-helmet'
import queryString from 'query-string'

import styles from './Catalogue.module.scss'
import product from '../../assets/mock/product.png'
import spinner from '../../assets/images/spinner.svg'

const Catalogue = () => {
  const { loading, loaded, error, entities } = useSelector(({ products }) => products)
  const [num, setNum] = useState(32)
  const [initialSearch, setInitialSearch] = useState('')
  const [initialCategories, setInitialCategories] = useState('')
  const [initialBrand, setInitialBrand] = useState('')
  const [initialSizes, setInitialSizes] = useState('')
  const [initialSort, setInitialSort] = useState('')
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    const params = queryString.parse(location.search)
    setInitialSearch(params.search || '')
    setInitialCategories(params.categories || '')
    setInitialBrand(params.brands || '')
    setInitialSizes(params.sizes || '')
    setInitialSort(params.sort || '')
    dispatch(fetchProducts(params.search, params.categories, params.brands, params.sizes, params.sort))
  }, [location])

  const renderProducts = () => {
    if (loading) {
      return (
        <div className="loader">
          <img src={spinner} alt="Подождите" className="spinner" />
        </div>
      )
    }

    if (loaded && entities.length === 0) {
      return (
        <div className={styles.container}>
          <div style={{ maxWidth: '1800px', margin: '0 auto' }}>
            <p className="message">Данные отсутствуют</p>
          </div>
        </div>
      )
    }

    if (error) {
      return <p className="error">{error}</p>
    }

    return (
      <div className={styles.container}>
        <div className={styles.products}>
          {entities.slice(0, num).map(({ _id, photos, brand, model, price }) => {
            return (
              <NavLink key={_id} to={`/product/${_id}`} className={styles.product}>
                <img src={photos[0] ? `http://localhost:3000/${photos[0]}` : product} alt={`${brand} ${model}`} className={styles.image} />
                <h3 className={styles.title}>{brand}</h3>
                <p className={styles.model}>{model}</p>
                <p className={styles.price}>{price} руб.</p>
              </NavLink>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <main role="main">
      <Helmet>
        <meta name="description" content="Широкий выбор кроссовок Nike, Yeezy, Off-White, Air Jordan, Supreme, Travis Scott, KAWS, BEARBRICK. Поможем Вам подобрать модель и определиться с размером. Оплата после примерки. Доставка в любую точку мира. Гарантии оригинальности." />
        <meta name="keywords" content="кроссовки, изи, изи 350, YEEZY, yeezy boost, оригинал, только оригинал, yeezy 350 v2, купить изи 350, hellakickz, мода, Jordan, Off-White, офф вайт, yeezy 700, hypestation, депо, kickstown, айзел, aizel, nikita efremov, federation, фederation, оригинальные бренды, tsum, цум, Kanye west, канье вест, коллаборация, фарфетч, farfetch, supreme, kaws, суприм, кавс, travis scott, тревис скот, nike, dunk, virgil abloh, вирджил абло, yeezy black, yeezy white" />
        <title>Hellakickz - каталог</title>
      </Helmet>
      <div className={styles.wrapper}>
        <MobileFilterPanel initialSearch={initialSearch} initialCategories={initialCategories} initialBrand={initialBrand} initialSizes={initialSizes} initialSort={initialSort} />
        <FilterPanel initialSearch={initialSearch} initialCategories={initialCategories} initialBrand={initialBrand} initialSizes={initialSizes} initialSort={initialSort} />
        <InfiniteScroll
          dataLength={entities.slice(0, num).length}
          next={() => { setNum(num + 32) }}
          hasMore={entities.length > entities.slice(0, num).length}
          loader={<h4 className="message">Loading...</h4>}
          className={loading && styles.infiniteScroll}
        >
          {renderProducts()}
        </InfiniteScroll>
      </div>
    </main >
  )
}

export default Catalogue
