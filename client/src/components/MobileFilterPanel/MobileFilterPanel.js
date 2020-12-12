import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import classNames from 'classnames'
import queryString from 'query-string'
import 'rc-menu/assets/index.css'
import Menu, { SubMenu, Item as MenuItem } from 'rc-menu'
import Button from '../Button/Button'
import ExpandIcon from '../ExpandIcon/ExpandIcon'

import styles from './MobileFilterPanel.module.scss'
import usSizes from '../../assets/sizes/us'
import euSizes from '../../assets/sizes/eu'
import clothesSizes from '../../assets/sizes/clothes'

const MobileFilterPanel = ({ initialSearch, initialCategories, initialBrand, initialSizes }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [categories, setCategories] = useState({})
  const [brands, setBrands] = useState({})
  const [sizes, setSizes] = useState({})
  const [search, setSearch] = useState('')
  const filterRef = useRef()
  const searchRef = useRef()
  const history = useHistory()

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  useEffect(() => {
    if (isFilterOpen || isSearchOpen) {
      document.querySelector('header').style.boxShadow = '0 0 0 9999px rgba(0, 0, 0, 0.2)'
    } else {
      document.querySelector('header').style.boxShadow = 'none'
    }
  }, [isFilterOpen, isSearchOpen])

  const handleOutsideClick = (e) => {
    if (!filterRef.current.contains(e.target)) {
      setIsFilterOpen(false)
    }

    if (!searchRef.current.contains(e.target)) {
      setIsSearchOpen(false)
    }
  }

  const onFilterOpenButtonClick = () => {
    setIsFilterOpen(true)
    setIsSearchOpen(false)
  }

  const onFilterCloseButtonClick = () => {
    setIsFilterOpen(false)
  }

  const onSearchOpenButtonClick = () => {
    setIsSearchOpen(true)
    setIsFilterOpen(false)
  }

  const onCloseSearchButtonClick = () => {
    setIsSearchOpen(false)
  }

  const renderQuery = (search, categories, brands, sizes) => {
    const query = {
      search,
      categories: Object.keys(categories).join(','),
      brands: Object.keys(brands).join(','),
      sizes: Object.keys(sizes).join(',')
    }
    history.push(`/catalog/?${queryString.stringify(query)}`)
  }

  useEffect(() => {
    setSearch(initialSearch)
  }, [initialSearch])

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

  const onCategoryItemClick = (e) => {
    const category = e.key
    if (categories[category]) {
      setCategories((prevCategories) => {
        const { [category]: deletedValue, ...newCategories } = prevCategories
        return newCategories
      })
    } else {
      setCategories((prevCategories) => ({ ...prevCategories, [category]: true }))
    }
  }

  const onBrandItemClick = (e) => {
    const brand = e.key
    if (brands[brand]) {
      setBrands((prevBrands) => {
        const { [brand]: deletedValue, ...newBrand } = prevBrands
        return newBrand
      })
    } else {
      setBrands((prevBrands) => ({ ...prevBrands, [brand]: true }))
    }
  }

  const onSizeItemClick = (e) => {
    const size = e.key
    if (sizes[size]) {
      setSizes((prevSizes) => {
        const { [size]: deletedValue, ...newSize } = prevSizes
        return newSize
      })
    } else {
      setSizes((prevSizes) => ({ ...prevSizes, [size]: true }))
    }
  }

  const onSearchChange = (e) => {
    setSearch(e.target.value)
  }

  const onShowButtonClick = () => {
    renderQuery(search, categories, brands, sizes)
    setIsFilterOpen(false)
  }

  const onSearchButtonClick = () => {
    renderQuery(search, categories, brands, sizes)
    setIsSearchOpen(false)
  }

  const onEraseFiltersButtonClick = () => {
    setCategories({})
    setBrands({})
    setSizes({})
    renderQuery(search, {}, {}, {})
    setIsFilterOpen(false)
  }

  return (
    <div className={styles.mobileFilterPanel}>
      <button type="button" className={classNames(styles.filterPanelButton, styles.filterOpenButton)} onClick={onFilterOpenButtonClick}></button>
      <button type="button" className={classNames(styles.filterPanelButton, styles.searchOpenButton)} onClick={onSearchOpenButtonClick}></button>
      <div style={{ display: isFilterOpen ? 'block' : 'none' }} ref={filterRef} className={styles.filter}>
        <div className={styles.filterButtons}>
          <button type="button" className={classNames(styles.filterPanelButton, styles.filterOpenButton)} onClick={onFilterCloseButtonClick}></button>
          <button type="button" onClick={onEraseFiltersButtonClick} className={styles.eraseFilterButton}>Сбросить</button>
        </div>
        <Menu multiple mode="inline" className={styles.menu} expandIcon={ExpandIcon}>
          <SubMenu title="Категория" key="categories" className={styles.submenu}>
            <MenuItem key="sneakers" onClick={onCategoryItemClick} className={classNames(styles.menuItem, categories['sneakers'] && styles.menuItemSelected)}>Обувь</MenuItem>
            <MenuItem key="clothes" onClick={onCategoryItemClick} className={classNames(styles.menuItem, categories['clothes'] && styles.menuItemSelected)}>Одежда</MenuItem>
            <MenuItem key="accessory" onClick={onCategoryItemClick} className={classNames(styles.menuItem, categories['accessory'] && styles.menuItemSelected)}>Аксессуары</MenuItem>
            <MenuItem key="childish" onClick={onCategoryItemClick} className={classNames(styles.menuItem, categories['childish'] && styles.menuItemSelected)}>Для детей</MenuItem>
          </SubMenu>
          <SubMenu title="Бренд" key="brands" className={styles.submenu}>
            <MenuItem key="yeezy" onClick={onBrandItemClick} className={classNames(styles.menuItem, brands['yeezy'] && styles.menuItemSelected)}>Yeezy</MenuItem>
            <MenuItem key="nike" onClick={onBrandItemClick} className={classNames(styles.menuItem, brands['nike'] && styles.menuItemSelected)}>Nike</MenuItem>
            <MenuItem key="off-white" onClick={onBrandItemClick} className={classNames(styles.menuItem, brands['off-white'] && styles.menuItemSelected)}>Off-white</MenuItem>
            <MenuItem key="supreme" onClick={onBrandItemClick} className={classNames(styles.menuItem, brands['supreme'] && styles.menuItemSelected)}>Supreme</MenuItem>
          </SubMenu>
          <SubMenu title="Размер" key="sizes" className={styles.submenu}>
            {(categories.childish ? euSizes : usSizes).map((size) => {
              return (
                <MenuItem key={size} onClick={onSizeItemClick} className={classNames(styles.menuItem, sizes[size] && styles.menuItemSelected)}>{size}</MenuItem>
              )
            })}
            {clothesSizes.map((size) => {
              return (
                <MenuItem key={size} onClick={onSizeItemClick} className={classNames(styles.menuItem, sizes[size] && styles.menuItemSelected)}>{size}</MenuItem>
              )
            })}
          </SubMenu>
        </Menu>
        <Button type="button" style="regular" text="Показать" onClick={onShowButtonClick} className={styles.showButton} />
      </div>
      <div style={{ display: isSearchOpen ? 'block' : 'none' }} ref={searchRef} className={styles.search}>
        <button type="button" onClick={onCloseSearchButtonClick} className={styles.closeSearchButton}></button>
        <input type="text" placeholder="Поиск" value={search} onChange={onSearchChange} className={styles.searchBar} />
        <Button type="button" style="regular" text="Найти" onClick={onSearchButtonClick} className={styles.searchButton} />
      </div>
    </div >
  )
}

export default MobileFilterPanel
