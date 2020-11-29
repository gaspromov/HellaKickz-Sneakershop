import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import MobileFilterPanel from '../../components/MobileFilterPanel/MobileFilterPanel'
import FilterPanel from '../../components/FilterPanel/FilterPanel'
import { fetchProducts } from '../../store/product/actions'
import queryString from 'query-string'

import styles from './Catalogue.module.scss'
import product from '../../assets/mock/product.png'
import spinner from '../../assets/images/spinner.svg'

const Catalogue = () => {
  const { loading, loaded, error, entities } = useSelector(({ products }) => products)
  const [num, setNum] = useState(32)
  const [initialSearch, setInitialSearch] = useState('')
  const [initialBrand, setInitialBrand] = useState('')
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()

  useEffect(() => {
    const params = queryString.parse(location.search)
    setInitialSearch(params.search || '')
    setInitialBrand(params.brands || '')
  }, [location])

  const onParamsChange = (term, categories, brands, sizes, sort) => {
    const query = {
      search: term === null ? initialSearch : term,
      brands: !brands ? initialBrand : brands
    }
    console.log(query)
    // history.push(`/catalogue${query && `?${query}`}`)
    // history.push(`/catalogue/?${queryString.stringify(query)}`)

    dispatch(fetchProducts(term, categories, brands, sizes, sort))
  }

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
      <div className={styles.wrapper}>
        <MobileFilterPanel onParamsChange={onParamsChange} />
        <FilterPanel onParamsChange={onParamsChange} initialSearch={initialSearch} initialBrand={initialBrand} />
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
