import React, { useState, useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import classNames from 'classnames'
import queryString from 'query-string'
import useDebounce from '../../hooks/useDebounce'
import Select from 'react-dropdown-select'

import styles from './FilterPanel.module.scss'
import usSizes from '../../assets/sizes/us'
import euSizes from '../../assets/sizes/eu'
import clothesSizes from '../../assets/sizes/clothes'

const CATEGORIES = { sneakers: 'Обувь', clothes: 'Одежда', accessory: 'Аксессуары', childish: 'Для детей' }
const BRANDS = ['Yeezy', 'Jordan', 'Stussy', 'Supreme', 'Off-White', 'Nike', 'CPFM', 'Fear of God', 'CDG', 'ACG']
const options = [
  { value: '-createdAt', label: 'Новинки' },
  { value: 'price', label: 'Цена: по возрастанию' },
  { value: '-price', label: 'Цена: по убыванию' }
]

const FilterPanel = ({ initialSearch, initialCategory, initialBrand, initialSizes, initialSort }) => {
  const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState(false)
  const [isBrandFilterOpen, setIsBrandFilterOpen] = useState(false)
  const [isSizeFilterOpen, setIsSizeFilterOpen] = useState(false)
  const [category, setCategory] = useState('')
  const [brands, setBrands] = useState({})
  const [sizes, setSizes] = useState({})
  const [search, setSearch, searchValue] = useDebounce(initialSearch, 500)
  const [isTyped, setIsTyped] = useState(false)
  const [sort, setSort] = useState('')
  const categoryRef = useRef()
  const brandRef = useRef()
  const sizeRef = useRef()
  const history = useHistory()

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  const renderQuery = (search, category, brands, sizes, sort) => {
    const query = {
      search,
      categories: category,
      brands: Object.keys(brands).join(','),
      sizes: Object.keys(sizes).join(','),
      sort
    }
    history.push(`/catalog/?${queryString.stringify(query)}`)
  }

  useEffect(() => {
    setSearch(initialSearch)
  }, [initialSearch])

  useEffect(() => {
    setCategory(initialCategory)
  }, [initialCategory])

  useEffect(() => {
    setSort(initialSort)
  }, [initialSort])

  useEffect(() => {
    setBrands(
      initialBrand ? initialBrand.split(',').reduce((acc, brand) => {
        acc[brand] = true
        return acc
      }, {}) : {}
    )
  }, [initialBrand])

  useEffect(() => {
    setSizes(
      initialSizes ? initialSizes.split(',').reduce((acc, size) => {
        acc[size] = true
        return acc
      }, {}) : {}
    )
  }, [initialSizes])

  const handleOutsideClick = (e) => {
    if (!categoryRef.current.contains(e.target)) {
      setIsCategoryFilterOpen(false)
    }

    if (!brandRef.current.contains(e.target)) {
      setIsBrandFilterOpen(false)
    }

    if (!sizeRef.current.contains(e.target)) {
      setIsSizeFilterOpen(false)
    }
  }

  const onCategoryMouseEvent = (action) => {
    action === 'open' ? setIsCategoryFilterOpen(true) : setIsCategoryFilterOpen(false)
  }

  const onBrandMouseEvent = (action) => {
    action === 'open' ? setIsBrandFilterOpen(true) : setIsBrandFilterOpen(false)
  }

  const onSizeMouseEvent = (action) => {
    action === 'open' ? setIsSizeFilterOpen(true) : setIsSizeFilterOpen(false)
  }

  const onCategoryCheckboxChange = (e) => {
    if (e.target.name === category) {
      setCategory('')
      renderQuery(search, '', brands, sizes, sort)
    } else {
      setCategory(e.target.name)
      renderQuery(search, e.target.name, brands, sizes, sort)
    }
  }

  const onBrandCheckboxChange = (e) => {
    const brand = e.target.name
    if (brands[brand]) {
      setBrands((prevBrands) => {
        const { [brand]: deletedValue, ...newBrands } = prevBrands
        renderQuery(search, category, newBrands, sizes, sort)
        return newBrands
      })
    } else {
      setBrands((prevBrands) => {
        const newBrands = { ...prevBrands, [brand]: true }
        renderQuery(search, category, newBrands, sizes, sort)
        return newBrands
      })
    }
  }

  const onSizeCheckboxChange = (e) => {
    const size = e.target.name
    if (sizes[size]) {
      setSizes((prevSizes) => {
        const { [size]: deletedValue, ...newSizes } = prevSizes
        renderQuery(search, category, brands, newSizes, sort)
        return newSizes
      })
    } else {
      setSizes((prevSizes) => {
        const newSizes = { ...prevSizes, [size]: true }
        renderQuery(search, category, brands, newSizes, sort)
        return newSizes
      })
    }
  }

  const onSearchChange = (e) => {
    !isTyped && setIsTyped(true)
    setSearch(e.target.value)
  }

  useEffect(() => {
    isTyped && renderQuery(search, category, brands, sizes, sort)
  }, [search])

  const onSortChange = (e) => {
    setSort(e[0].value)
    renderQuery(search, category, brands, sizes, e[0].value)
  }

  const onTagRemoveClick = (tag, type) => {
    switch (type) {
      case 'category':
        setCategory('')
        renderQuery(search, '', brands, sizes, sort)
        break
      case 'brand':
        setBrands((prevBrands) => {
          const { [tag]: deletedValue, ...newBrands } = prevBrands
          renderQuery(search, category, newBrands, sizes, sort)
          return newBrands
        })
        break
      case 'size':
        setSizes((prevSizes) => {
          const { [tag]: deletedValue, ...newSizes } = prevSizes
          renderQuery(search, category, brands, newSizes, sort)
          return newSizes
        })
        break
      case 'search':
        setSearch('')
    }

  }

  const onEraseAllTagsButtonClick = () => {
    setCategory('')
    setBrands({})
    setSizes({})
    setSearch('')
    renderQuery('', '', {}, {}, sort)
  }

  return (
    <div className={styles.filterPanel}>
      <div className={styles.container}>
        <div className={styles.filterContainer}>
          <div className={styles.filterSelect} ref={categoryRef} onMouseEnter={() => onCategoryMouseEvent('open')} onMouseLeave={() => onCategoryMouseEvent('close')}>
            <button type="button" className={classNames(styles.toggleFilterButton, isCategoryFilterOpen && styles.toggleFilterButtonOpen)}>Категория</button>
            <div style={{ display: isCategoryFilterOpen ? 'grid' : 'none' }} className={classNames(styles.selectBox, styles.categorySelectBox)}>
              {Object.entries(CATEGORIES).map(([key, value]) => {
                return (
                  <div key={key} className={styles.item}>
                    <input type="checkbox" id={key} name={key} checked={category === key} onChange={onCategoryCheckboxChange} className={styles.checkbox} />
                    <label htmlFor={key} className={styles.label}>{value}</label>
                  </div>
                )
              })}
            </div>
          </div>
          <div className={styles.filterSelect} ref={brandRef} onMouseEnter={() => onBrandMouseEvent('open')} onMouseLeave={() => onBrandMouseEvent('close')}>
            <button type="button" className={classNames(styles.toggleFilterButton, isBrandFilterOpen && styles.toggleFilterButtonOpen)}>Бренд</button>
            <div style={{ display: isBrandFilterOpen ? 'grid' : 'none' }} className={classNames(styles.selectBox, styles.brandSelectBox)}>
              {BRANDS.map((brand) => {
                return (
                  <div key={brand} className={styles.item}>
                    <input type="checkbox" id={brand} name={brand} checked={!!brands[brand]} onChange={onBrandCheckboxChange} className={styles.checkbox} />
                    <label htmlFor={brand} className={styles.label}>{brand}</label>
                  </div>
                )
              })}
            </div>
          </div>
          <div className={styles.filterSelect} ref={sizeRef} onMouseEnter={() => onSizeMouseEvent('open')} onMouseLeave={() => onSizeMouseEvent('close')}>
            <button type="button" className={classNames(styles.toggleFilterButton, isSizeFilterOpen && styles.toggleFilterButtonOpen)}>Размер</button>
            <div style={{ display: isSizeFilterOpen ? 'grid' : 'none' }} className={classNames(styles.selectBox, styles.sizesSelectBox)}>
              <div className={styles.usSizes}>
                {(category === 'childish' ? euSizes : usSizes).map((size) => {
                  return (
                    <div key={size} className={styles.item}>
                      <input type="checkbox" id={size} name={size} checked={!!sizes[size]} onChange={onSizeCheckboxChange} className={styles.checkbox} />
                      <label htmlFor={size} className={styles.label}>{size}</label>
                    </div>
                  )
                })}
              </div>
              <div className={styles.clothesSizes}>
                {clothesSizes.map((size) => {
                  return (
                    <div key={size} className={styles.item}>
                      <input type="checkbox" id={size} name={size} checked={!!sizes[size]} onChange={onSizeCheckboxChange} className={styles.checkbox} />
                      <label htmlFor={size} className={styles.label}>{size}</label>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.searchAndSortContainer}>
          <input
            type="text"
            placeholder="Поиск"
            value={searchValue}
            onChange={onSearchChange}
            className={styles.searchBar}
          />
          <Select
            values={sort ? [{ value: sort, label: options.find(({ value }) => value === sort).label }] : [{ value: '', label: 'Сортировать' }]}
            options={options}
            onChange={onSortChange}
            searchable={false}
            placeholder="Сортировать"
            color="#000000"
            dropdownGap={-3}
            className={styles.sortBar}
          />
        </div>
      </div>
      {(category || Object.keys(brands).length > 0 || Object.keys(sizes).length > 0 || (search && searchValue)) && (
        <div className={styles.tags}>
          {category && <button type="button" onClick={() => onTagRemoveClick(category, 'category')} className={styles.tag}>{CATEGORIES[category]}</button>}
          {Object.keys(brands).map((brand) => {
            return <button key={brand} type="button" onClick={() => onTagRemoveClick(brand, 'brand')} className={styles.tag}>{brand}</button>
          })}
          {Object.keys(sizes).map((size) => {
            return <button key={size} type="button" onClick={() => onTagRemoveClick(size, 'size')} className={styles.tag}>{size}</button>
          })}
          {searchValue && search && <button type="button" onClick={() => onTagRemoveClick(search, 'search')} className={styles.tag}>{search}</button>}
          <button type="button" onClick={onEraseAllTagsButtonClick} className={styles.eraseAllTagsButton}>Очистить всё</button>
        </div>
      )}
    </div>
  )
}

export default FilterPanel
