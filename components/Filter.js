"use client"
import React, { useState, useEffect } from 'react';
import styles from './Filter.module.css';

const Filter = () => {
    const [isFilterSelected, setIsFilterSelected] = useState(false);
    const [isAnyCheckboxSelected, setIsAnyCheckboxSelected] = useState(false);

    useEffect(() => {
        setIsAnyCheckboxSelected(false);
    }, [isFilterSelected]);

    const handleFilterButtonClick = () => {
        setIsFilterSelected(!isFilterSelected);
    };

    const handleCloseButtonClick = () => {
        setIsFilterSelected(false);
    };

    const handleCheckboxChange = (event) => {
        setIsAnyCheckboxSelected(event.target.checked);
    };

    const handleClearAllClick = () => {
        setIsAnyCheckboxSelected(false);
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });
    };

    return (
        <div>
            <button
                className={isFilterSelected ? styles.filterButtonSelected : styles.filterButton}
                onClick={handleFilterButtonClick}
            >
                <img src={isFilterSelected ? './../assets/icons/filter-selected.svg' : './../assets/icons/filter.svg'} />
            </button>
            {isFilterSelected && (
                <div id="popup" className={styles.overlay}>
                    <div className={styles.header}>
                        <button className={isAnyCheckboxSelected ? `${styles.clearAllBtn} ${styles.clearAllBtnSelected}` : styles.clearAllBtn} onClick={handleClearAllClick}>
                            Clear All
                        </button>
                        <div className={styles.title}>Filter</div>
                        <button className={styles.closeBtn} onClick={handleCloseButtonClick}>
                            <img src="../assets/icons/close.svg" />
                        </button>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.filterName}>
                            Friend Status
                            <div className="row">
                                <label htmlFor="closeFriends">Close Friends</label>
                                <input id="closeFriends" type="checkbox" onChange={handleCheckboxChange} />
                            </div>
                            <div className="row">
                                <label htmlFor="superCloseFriends">Super Close Friends</label>
                                <input id="superCloseFriends" type="checkbox" onChange={handleCheckboxChange} />
                            </div>
                        </div>

                        <button className={styles.applyBtn}>Apply</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Filter;
