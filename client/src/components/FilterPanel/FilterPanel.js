import React, { useState, useRef, useEffect } from 'react'
import classNames from 'classnames'
import Select from 'react-select'
import SelectOption from '../SelectOption/SelectOption'
import SelectMenu from '../SelectMenu/SelectMenu'
import SelectControl from '../SelectControl/SelectControl'

import styles from './FilterPanel.module.scss'
import usSizes from '../../assets/sizes/us'
import clothesSizes from '../../assets/sizes/clothes'

const CATEGORIES = [['Обувь', 'sneakers'], ['Одежда', 'clothes'], ['Аксессуары', 'accessory'], ['Для детей', 'childish']]
const BRANDS = ['Yeezy', 'Nike', 'Stussy', 'Supreme', 'Off-White', 'CPFM', 'Fear of God', 'CDG', 'ACG']
const options = [
  { value: '', label: 'По умолчанию', className: styles.option },
  { value: '-createdAt', label: 'Новинки' },
  { value: 'price', label: 'Цена: по возрастанию' },
  { value: '-price', label: 'Цена: по убыванию' }
]

const FilterPanel = ({ onParamsChange }) => {
  const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState(false)
  const [isBrandFilterOpen, setIsBrandFilterOpen] = useState(false)
  const [isSizeFilterOpen, setIsSizeFilterOpen] = useState(false)
  const [categories, setCategories] = useState({})
  const [brands, setBrands] = useState({})
  const [sizes, setSizes] = useState({})
  const [term, setTerm] = useState('')
  const [sort, setSort] = useState('')
  const categoryRef = useRef()
  const brandRef = useRef()
  const sizeRef = useRef()

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  useEffect(() => {
    onParamsChange(term, Object.keys(categories).join(','), Object.keys(brands).join(','), Object.keys(sizes).join(','), sort)
  }, [term, categories, brands, sizes, sort])

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

  const onToggleCategoryFilterButtonClick = () => {
    setIsCategoryFilterOpen((prevIsCategoryFilterOpen) => !prevIsCategoryFilterOpen)
  }

  const onToggleBrandFilterButtonClick = () => {
    setIsBrandFilterOpen((prevIsBrandFilterOpen) => !prevIsBrandFilterOpen)
  }

  const onToggleSizeFilterButtonClick = () => {
    setIsSizeFilterOpen((prevIsSizeFilterOpen) => !prevIsSizeFilterOpen)
  }

  const onCategoryCheckboxChange = (e) => {
    const category = e.target.name
    if (categories[category]) {
      setCategories((prevCategories) => {
        const { [category]: deletedValue, ...newCategories } = prevCategories
        return newCategories
      })
    } else {
      setCategories((prevCategories) => ({ ...prevCategories, [category]: true }))
    }
  }

  const onBrandCheckboxChange = (e) => {
    const brand = e.target.name
    if (brands[brand]) {
      setBrands((prevBrands) => {
        const { [brand]: deletedValue, ...newBrands } = prevBrands
        return newBrands
      })
    } else {
      setBrands((prevBrands) => ({ ...prevBrands, [brand]: true }))
    }
  }

  const onSizeCheckboxChange = (e) => {
    const size = e.target.name
    if (sizes[size]) {
      setSizes((prevSizes) => {
        const { [size]: deletedValue, ...newSizes } = prevSizes
        return newSizes
      })
    } else {
      setSizes((prevSizes) => ({ ...prevSizes, [size]: true }))
    }
  }

  const onTermChangee = (e) => {
    setTerm(e.target.value)
  }

  const onSortChange = (e) => {
    setSort(e.value)
  }

  const onTagRemoveClick = (tag, type) => {
    switch (type) {
      case 'category':
        setCategories((prevCategories) => {
          const { [tag]: deletedValue, ...newCategories } = prevCategories
          return newCategories
        })
        break
      case 'brand':
        setBrands((prevBrands) => {
          const { [tag]: deletedValue, ...newBrends } = prevBrands
          return newBrends
        })
        break
      case 'size':
        setSizes((prevSizes) => {
          const { [tag]: deletedValue, ...newSizes } = prevSizes
          return newSizes
        })
        break
    }

  }

  const onEraseAllTagsButtonClick = () => {
    setCategories({})
    setBrands({})
    setSizes({})
  }

  return (
    <div className={styles.filterPanel}>
      <div className={styles.container}>
        <div className={styles.filterContainer}>
          <div className={styles.filterSelect} ref={categoryRef}>
            <button type="button" onClick={onToggleCategoryFilterButtonClick} className={classNames(styles.toggleFilterButton, isCategoryFilterOpen && styles.toggleFilterButtonOpen)}>Категория</button>
            <div style={{ display: isCategoryFilterOpen ? 'grid' : 'none' }} className={classNames(styles.selectBox, styles.categorySelectBox)}>
              {CATEGORIES.map((category) => {
                return (
                  <div className={styles.item}>
                    <input type="checkbox" id={category[1]} name={category[1]} checked={!!categories[category[1]]} onChange={onCategoryCheckboxChange} className={styles.checkbox} />
                    <label htmlFor={category[1]} className={styles.label}>{category[0]}</label>
                  </div>
                )
              })}
            </div>
          </div>
          <div className={styles.filterSelect} ref={brandRef}>
            <button type="button" onClick={onToggleBrandFilterButtonClick} className={classNames(styles.toggleFilterButton, isBrandFilterOpen && styles.toggleFilterButtonOpen)}>Бренд</button>
            <div style={{ display: isBrandFilterOpen ? 'grid' : 'none' }} className={classNames(styles.selectBox, styles.brandSelectBox)}>
              {BRANDS.map((brand) => {
                return (
                  <div className={styles.item}>
                    <input type="checkbox" id={brand} name={brand} checked={!!brands[brand]} onChange={onBrandCheckboxChange} className={styles.checkbox} />
                    <label htmlFor={brand} className={styles.label}>{brand}</label>
                  </div>
                )
              })}
            </div>
          </div>
          <div className={styles.filterSelect} ref={sizeRef}>
            <button type="button" onClick={onToggleSizeFilterButtonClick} className={classNames(styles.toggleFilterButton, isSizeFilterOpen && styles.toggleFilterButtonOpen)}>Размер</button>
            <div style={{ display: isSizeFilterOpen ? 'grid' : 'none' }} className={classNames(styles.selectBox, styles.sizesSelectBox)}>
              <div className={styles.usSizes}>
                {usSizes.map((size) => {
                  return (
                    <div className={styles.item}>
                      <input type="checkbox" id={size} name={size} checked={!!sizes[size]} onChange={onSizeCheckboxChange} className={styles.checkbox} />
                      <label htmlFor={size} className={styles.label}>{size} US</label>
                    </div>
                  )
                })}
              </div>
              <div className={styles.clothesSizes}>
                {clothesSizes.map((size) => {
                  return (
                    <div className={styles.item}>
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
          <input type="text" placeholder="Поиск" value={term} onChange={onTermChangee} className={styles.searchBar} />
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
            return <button type="button" onClick={() => onTagRemoveClick(category, 'category')} className={styles.tag}>{category}</button>
          })}
          {Object.keys(brands).map((brand) => {
            return <button type="button" onClick={() => onTagRemoveClick(brand, 'brand')} className={styles.tag}>{brand}</button>
          })}
          {Object.keys(sizes).map((size) => {
            return <button type="button" onClick={() => onTagRemoveClick(size, 'size')} className={styles.tag}>{isNaN(size) ? size : `${size} US`}</button>
          })}
          <button type="button" onClick={onEraseAllTagsButtonClick} className={styles.eraseAllTagsButton}>Очистить всё</button>
        </div>
      )}
    </div>
  )
}

export default FilterPanel
