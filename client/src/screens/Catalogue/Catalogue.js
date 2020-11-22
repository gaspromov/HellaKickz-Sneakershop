import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import MobileFilterPanel from '../../components/MobileFilterPanel/MobileFilterPanel'
import FilterPanel from '../../components/FilterPanel/FilterPanel'
import { fetchProducts } from '../../store/product/actions'

import styles from './Catalogue.module.scss'
import product from '../../assets/mock/product.png'

const Catalogue = () => {
  const { loading, loaded, error, entities } = useSelector(({ products }) => products)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  const onParamsChange = (term, categories, brands, sizes, sort) => {
    dispatch(fetchProducts(term, categories, brands, sizes, sort))
  }

  return (
    <main role="main">
      <div className={styles.wrapper}>
        <MobileFilterPanel onParamsChange onParamsChange={onParamsChange} />
        <FilterPanel onParamsChange={onParamsChange} />
        <div>
          <div className={styles.products}>
            {loaded && entities.map(({ _id, photos, brand, model, price }) => {
              return (
                <NavLink key={_id} to="/" className={styles.product}>
                  <img src={product} alt="" className={styles.image} />
                  <h3 className={styles.title}>{brand}</h3>
                  <p className={styles.model}>{model}</p>
                  <p className={styles.price}>{price} руб.</p>
                </NavLink>
              )
            })}
          </div>
        </div>
      </div>
    </main >
  )
}

export default Catalogue
