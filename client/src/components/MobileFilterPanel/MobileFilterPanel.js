import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import 'rc-menu/assets/index.css'
import Menu, { SubMenu, Item as MenuItem } from 'rc-menu'
import Button from '../Button/Button'
import ExpandIcon from '../ExpandIcon/ExpandIcon'

import styles from './MobileFilterPanel.module.scss'

const MobileFilterPanel = ({ onParamsChange }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [categories, setCategories] = useState({})
  const [brands, setBrands] = useState({})
  const [term, setTerm] = useState('')

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

  const onTermChange = (e) => {
    setTerm(e.target.value)
  }

  const onShowButtonClick = () => {
    onParamsChange(term, Object.keys(categories).join(','), Object.keys(brands).join(','))
    setIsFilterOpen(false)
  }

  const onSearchButtonClick = () => {
    onParamsChange(term, Object.keys(categories).join(','), Object.keys(brands).join(','))
    setIsSearchOpen(false)
  }

  const onEraseFiltersButtonClick = () => {
    setCategories({})
    setBrands({})
    onParamsChange(term, '', '')
    setIsFilterOpen(false)
  }

  return (
    <div className={styles.mobileFilterPanel}>
      <button type="button" className={classNames(styles.filterPanelButton, styles.filterOpenButton)} onClick={onFilterOpenButtonClick}></button>
      <button type="button" className={classNames(styles.filterPanelButton, styles.searchOpenButton)} onClick={onSearchOpenButtonClick}></button>
      <div style={{ display: isFilterOpen ? 'block' : 'none' }} className={styles.filter}>
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
        </Menu>
        <Button type="button" style="regular" text="Показать" onClick={onShowButtonClick} className={styles.showButton} />
      </div>
      <div style={{ display: isSearchOpen ? 'block' : 'none' }} className={styles.search}>
        <button type="button" onClick={onCloseSearchButtonClick} className={styles.closeSearchButton}></button>
        <input type="text" placeholder="Поиск" value={term} onChange={onTermChange} className={styles.searchBar} />
        <Button type="button" style="regular" text="Найти" onClick={onSearchButtonClick} className={styles.searchButton} />
      </div>
    </div >
  )
}

export default MobileFilterPanel
