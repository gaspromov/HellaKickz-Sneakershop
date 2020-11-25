import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import MobileFilterPanel from '../../components/MobileFilterPanel/MobileFilterPanel'
import FilterPanel from '../../components/FilterPanel/FilterPanel'
import { fetchProducts } from '../../store/product/actions'

import styles from './Catalogue.module.scss'
import product from '../../assets/mock/product.png'

const Catalogue = ({ location }) => {
  const { loading, loaded, error, entities } = useSelector(({ products }) => products)
  const [num, setNum] = useState(32)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts(location?.state?.search || '', location?.state?.category || ''))
  }, [])

  useEffect(() => {
    dispatch(fetchProducts(location?.state?.search || '', location?.state?.category || ''))
  }, [location?.state?.search, location?.state?.category])

  const onParamsChange = (term, categories, brands, sizes, sort) => {
    dispatch(fetchProducts(term, categories, brands, sizes, sort))
  }

  const renderProducts = () => {
    if (loading) {
      return <p className="message">Подождите...</p>
    }

    if (loaded && entities.length === 0) {
      return <p className="message">Данные отсутствуют</p>
    }

    if (error) {
      return <p className="error">{error}</p>
    }

    return entities.slice(0, num).map(({ _id, photos, brand, model, price }) => {
      return (
        <NavLink key={_id} to={`/product/${_id}`} className={styles.product}>
          <img src={photos[0] ? `http://localhost:3000/${photos[0]}` : product} alt={`${brand} ${model}`} className={styles.image} />
          <h3 className={styles.title}>{brand}</h3>
          <p className={styles.model}>{model}</p>
          <p className={styles.price}>{price} руб.</p>
        </NavLink>
      )
    })
  }

  return (
    <main role="main">
      <div className={styles.wrapper}>
        <MobileFilterPanel onParamsChange onParamsChange={onParamsChange} />
        <FilterPanel onParamsChange={onParamsChange} />
        <InfiniteScroll
          dataLength={entities.slice(0, num).length}
          next={() => { setNum(num + 32) }}
          hasMore={entities.length > entities.slice(0, num).length}
          loader={<h4 className="message">Loading...</h4>}
        >
          <div className={styles.products}>
            {renderProducts()}
          </div>
        </InfiniteScroll>
      </div>
    </main >
  )
}

export default Catalogue
