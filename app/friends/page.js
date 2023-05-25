"use client"
import styles from './friends.module.css';
import SideMenu from '../../components/Sidemenu_friends';
import Filter from '@/components/Filter';
import React, { useState, useEffect } from 'react';

import friendsData from './data.json' assert { type: 'json' };

export default function Friends() {
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    const storedSelectedFilters = JSON.parse(localStorage.getItem('selectedFilters'));
    if (storedSelectedFilters && storedSelectedFilters.length > 0) {
      setSelectedFilters(storedSelectedFilters);
    }
  }, []);

  const handleClearAllClick = () => {
    setSelectedFilters([]);
    localStorage.removeItem('selectedFilters');
  };

  const handleCheckboxChange = (checkboxValue, checked) => {
    if (checked) {
      setSelectedFilters([checkboxValue]);
      localStorage.setItem('selectedFilters', JSON.stringify([checkboxValue]));
    } else {
      setSelectedFilters([]);
      localStorage.removeItem('selectedFilters');
    }
  };

  const filteredFriends = selectedFilters.length
    ? friendsData.filter((friend) => {
        if (selectedFilters[0] === 'superCloseFriends') {
          return friend.status === 3;
        } else if (selectedFilters[0] === 'closeFriends') {
          return friend.status === 2;
        }
        return true;
      })
    : friendsData;

  return (
    <main className={styles.main}>
      <SideMenu />
      <div className={styles.content}>
        <div className={styles.topmenu}>
          <h1>Friends</h1>
        </div>

        <div className={styles.center_content}>
          <div className={styles.filterWrapper}>
            <Filter
              selectedFilters={selectedFilters}
              onApply={handleCheckboxChange}
              onClearAll={handleClearAllClick}
            />
            <div className={styles.clearAllWrapper}>
              <button
                className={
                  selectedFilters.length > 0
                    ? `${styles.clearAllButton} ${styles.clearAllBtnSelected}`
                    : styles.clearAllButton
                }
                onClick={handleClearAllClick}
              >
                Clear All
              </button>
            </div>
          </div>

          {filteredFriends.map((friend, index) => (
            <div className={styles.friend} key={index}>
              <div className={styles.headerWrapper}>
                <div className={styles.name}>{friend.name}</div>
                {friend.status === 3 && (
                  <span className={[styles.pill, styles.superCloseFriends].join(' ')}>
                    Super Close Friends
                  </span>
                )}
                {friend.status === 2 && (
                  <span className={[styles.pill, styles.closeFriends].join(' ')}>
                    Close Friends
                  </span>
                )}
              </div>
              <div className={styles.details}>
                {friend.email} • {friend.number}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
