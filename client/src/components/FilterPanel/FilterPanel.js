import React, { useState, useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import classNames from 'classnames'
import queryString from 'query-string'
import useDebounce from '../../hooks/useDebounce'
import Select from 'react-select'
import SelectOption from '../SelectOption/SelectOption'
import SelectMenu from '../SelectMenu/SelectMenu'
import SelectControl from '../SelectControl/SelectControl'

import styles from './FilterPanel.module.scss'
import usSizes from '../../assets/sizes/us'
import euSizes from '../../assets/sizes/eu'
import clothesSizes from '../../assets/sizes/clothes'

const CATEGORIES = [['Обувь', 'sneakers'], ['Одежда', 'clothes'], ['Аксессуары', 'accessory'], ['Для детей', 'childish']]
const BRANDS = ['Yeezy', 'Nike', 'Stussy', 'Supreme', 'Off-White', 'CPFM', 'Fear of God', 'CDG', 'ACG']
const options = [
  { value: '', label: 'По умолчанию', className: styles.option },
  { value: '-createdAt', label: 'Новинки' },
  { value: 'price', label: 'Цена: по возрастанию' },
  { value: '-price', label: 'Цена: по убыванию' }
]

const FilterPanel = ({ initialSearch, initialCategories, initialBrand, initialSizes, initialSort }) => {
  const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState(false)
  const [isBrandFilterOpen, setIsBrandFilterOpen] = useState(false)
  const [isSizeFilterOpen, setIsSizeFilterOpen] = useState(false)
  const [categories, setCategories] = useState({})
  const [brands, setBrands] = useState({})
  const [sizes, setSizes] = useState({})
  const [search, setSearch, searchValue] = useDebounce(initialSearch, 500)
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

  const renderQuery = (search, categories, brands, sizes, sort) => {
    const query = {
      search,
      categories: Object.keys(categories).join(','),
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
    setSort(initialSort)
  }, [initialSort])

  useEffect(() => {
    setCategories(
      initialCategories ? initialCategories.split(',').reduce((acc, category) => {
        acc[category] = true
        return acc
      }, {}) : {}
    )
  }, [initialCategories])

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
    const category = e.target.name
    if (categories[category]) {
      setCategories((prevCategories) => {
        const { [category]: deletedValue, ...newCategories } = prevCategories
        renderQuery(search, newCategories, brands, sizes, sort)
        return newCategories
      })
    } else {
      setCategories((prevCategories) => {
        const newCategories = { ...prevCategories, [category]: true }
        renderQuery(search, newCategories, brands, sizes, sort)
        return newCategories
      })
    }
  }

  const onBrandCheckboxChange = (e) => {
    const brand = e.target.name
    if (brands[brand]) {
      setBrands((prevBrands) => {
        const { [brand]: deletedValue, ...newBrands } = prevBrands
        renderQuery(search, categories, newBrands, sizes, sort)
        return newBrands
      })
    } else {
      setBrands((prevBrands) => {
        const newBrands = { ...prevBrands, [brand]: true }
        renderQuery(search, categories, newBrands, sizes, sort)
        return newBrands
      })
    }
  }

  const onSizeCheckboxChange = (e) => {
    const size = e.target.name
    if (sizes[size]) {
      setSizes((prevSizes) => {
        const { [size]: deletedValue, ...newSizes } = prevSizes
        renderQuery(search, categories, brands, newSizes, sort)
        return newSizes
      })
    } else {
      setSizes((prevSizes) => {
        const newSizes = { ...prevSizes, [size]: true }
        renderQuery(search, categories, brands, newSizes, sort)
        return newSizes
      })
    }
  }

  const onSearchChange = (e) => {
    setSearch(e.target.value)
    renderQuery(e.target.value, categories, brands, sizes, sort)
  }

  const onSortChange = (e) => {
    setSearch(e.value)
    renderQuery(search, categories, brands, sizes, e.value)
  }

  const onTagRemoveClick = (tag, type) => {
    switch (type) {
      case 'category':
        setCategories((prevCategories) => {
          const { [tag]: deletedValue, ...newCategories } = prevCategories
          renderQuery(search, newCategories, brands, sizes, sort)
          return newCategories
        })
        break
      case 'brand':
        setBrands((prevBrands) => {
          const { [tag]: deletedValue, ...newBrands } = prevBrands
          renderQuery(search, categories, newBrands, sizes, sort)
          return newBrands
        })
        break
      case 'size':
        setSizes((prevSizes) => {
          const { [tag]: deletedValue, ...newSizes } = prevSizes
          renderQuery(search, categories, brands, newSizes, sort)
          return newSizes
        })
        break
    }

  }

  const onEraseAllTagsButtonClick = () => {
    setCategories({})
    setBrands({})
    setSizes({})
    renderQuery(search, {}, {}, {}, sort)
  }

  return (
    <div className={styles.filterPanel}>
      <div className={styles.container}>
        <div className={styles.filterContainer}>
          <div className={styles.filterSelect} ref={categoryRef} onMouseEnter={() => onCategoryMouseEvent('open')} onMouseLeave={() => onCategoryMouseEvent('close')}>
            <button type="button" className={classNames(styles.toggleFilterButton, isCategoryFilterOpen && styles.toggleFilterButtonOpen)}>Категория</button>
            <div style={{ display: isCategoryFilterOpen ? 'grid' : 'none' }} className={classNames(styles.selectBox, styles.categorySelectBox)}>
              {CATEGORIES.map((category) => {
                return (
                  <div key={category[1]} className={styles.item}>
                    <input type="checkbox" id={category[1]} name={category[1]} checked={!!categories[category[1]]} onChange={onCategoryCheckboxChange} className={styles.checkbox} />
                    <label htmlFor={category[1]} className={styles.label}>{category[0]}</label>
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
                {(categories.childish ? euSizes : usSizes).map((size) => {
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
            options={options}
            placeholder="Сортировать"
            onChange={onSortChange}
            isSearchable={false}
            className={styles.sortBar}
            components={{ Option: SelectOption, Menu: SelectMenu, Control: SelectControl }}
          />
        </div>
      </div>
      {(Object.keys(categories).length > 0 || Object.keys(brands).length > 0 || Object.keys(sizes).length > 0) && (
        <div className={styles.tags}>
          {Object.keys(categories).map((category) => {
            return <button key={category} type="button" onClick={() => onTagRemoveClick(category, 'category')} className={styles.tag}>{category}</button>
          })}
          {Object.keys(brands).map((brand) => {
            return <button key={brand} type="button" onClick={() => onTagRemoveClick(brand, 'brand')} className={styles.tag}>{brand}</button>
          })}
          {Object.keys(sizes).map((size) => {
            return <button key={size} type="button" onClick={() => onTagRemoveClick(size, 'size')} className={styles.tag}>{size}</button>
          })}
          <button type="button" onClick={onEraseAllTagsButtonClick} className={styles.eraseAllTagsButton}>Очистить всё</button>
        </div>
      )}
    </div>
  )
}

export default FilterPanel
