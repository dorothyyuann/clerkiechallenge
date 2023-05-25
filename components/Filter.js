"use client"
import React, { useState, useEffect } from 'react';
import styles from './Filter.module.css';

const Filter = ({ selectedFilters, onApply, onClearAll }) => {
  const [isFilterSelected, setIsFilterSelected] = useState(false);
  const [isAnyCheckboxSelected, setIsAnyCheckboxSelected] = useState(false);

  useEffect(() => {
    setIsAnyCheckboxSelected(selectedFilters.length > 0);
  }, [selectedFilters]);

  const handleFilterButtonClick = () => {
    setIsFilterSelected(!isFilterSelected);
  };

  const handleCloseButtonClick = () => {
    setIsFilterSelected(false);
  };

  const handleClearAllClick = () => {
    setIsAnyCheckboxSelected(false);
    onClearAll();
  };

  const handleCheckboxChange = (event) => {
    const { checked, id } = event.target;
    setIsAnyCheckboxSelected(checked);
    onApply(id, checked);
  };

  const handleApplyClick = () => {
    onApply();
    setIsFilterSelected(false);
  };

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
        {selectedFilters.length > 0 ? <span>{selectedFilters.length}</span> : undefined}
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
