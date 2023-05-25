"use client"
import React, { useState, useEffect } from 'react';
import styles from './Filter.module.css';

const Filter = ({ onApply }) => {
  const [isFilterSelected, setIsFilterSelected] = useState(false);
  const [isAnyCheckboxSelected, setIsAnyCheckboxSelected] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [storedSelectedFilters, setStoredSelectedFilters] = useState([]);

  useEffect(() => {
    setIsAnyCheckboxSelected(selectedFilters.length > 0);
  }, [selectedFilters]);

  const handleFilterButtonClick = () => {
    setIsFilterSelected(!isFilterSelected);
  };

  const handleCloseButtonClick = () => {
    setIsFilterSelected(false);
  };

  const handleCheckboxChange = (event) => {
    const { checked, id } = event.target;

    if (checked) {
      setSelectedFilters((prevFilters) => [...prevFilters, id]);
    } else {
      setSelectedFilters((prevFilters) => prevFilters.filter((filter) => filter !== id));
    }
  };

  const handleClearAllClick = () => {
    setIsAnyCheckboxSelected(false);
    setSelectedFilters([]);
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

  const handleApplyClick = () => {
    onApply(selectedFilters);
    setIsFilterSelected(false);
    setStoredSelectedFilters(selectedFilters);
  };

  useEffect(() => {
    if (isFilterSelected && storedSelectedFilters.length > 0) {
      setSelectedFilters(storedSelectedFilters);
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox) => {
        checkbox.checked = storedSelectedFilters.includes(checkbox.id);
      });
    } else {
      setSelectedFilters([]);
    }
  }, [isFilterSelected, storedSelectedFilters]);

  return (
    <div>
      <button
        className={isFilterSelected ? styles.filterButtonSelected : styles.filterButton}
        onClick={handleFilterButtonClick}
      >
        <img
          src={isFilterSelected ? './../assets/icons/filter-selected.svg' : './../assets/icons/filter.svg'}
          alt="Filter"
        />
      </button>
      {isFilterSelected && (
        <div id="popup" className={styles.overlay}>
          <div className={styles.header}>
            <button
              className={isAnyCheckboxSelected ? `${styles.clearAllBtn} ${styles.clearAllBtnSelected}` : styles.clearAllBtn}
              onClick={handleClearAllClick}
            >
              Clear All
            </button>
            <div className={styles.title}>Filter</div>
            <button className={styles.closeBtn} onClick={handleCloseButtonClick}>
              <img src="../assets/icons/close.svg" alt="Close" />
            </button>
          </div>
          <div className={styles.content}>
            <div className={styles.filterName}>
              Friend Status
              <div className="row">
                <label htmlFor="closeFriends">Close Friends</label>
                <input
                  id="closeFriends"
                  type="checkbox"
                  onChange={handleCheckboxChange}
                  checked={selectedFilters.includes('closeFriends')}
                />
              </div>
              <div className="row">
                <label htmlFor="superCloseFriends">Super Close Friends</label>
                <input
                  id="superCloseFriends"
                  type="checkbox"
                  onChange={handleCheckboxChange}
                  checked={selectedFilters.includes('superCloseFriends')}
                />
              </div>
            </div>
            <button id="applyBtn" className={styles.applyBtn} onClick={handleApplyClick}>
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;