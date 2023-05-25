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
    let updatedFilters = [];
    if (checked) {
      updatedFilters = [...selectedFilters, checkboxValue];
    } else {
      updatedFilters = selectedFilters.filter((filter) => filter !== checkboxValue);
    }
    setSelectedFilters(updatedFilters);
    localStorage.setItem('selectedFilters', JSON.stringify(updatedFilters));
  };

  const filteredFriends = selectedFilters.length
    ? friendsData.filter((friend) => {
        for (const filter of selectedFilters) {
          if (filter === 'superCloseFriends' && friend.status === 3) {
            return true;
          } else if (filter === 'closeFriends' && friend.status === 2) {
            return true;
          }
        }
        return false;
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
              setSelectedFilters={setSelectedFilters}
              onApply={handleCheckboxChange}
              onClearAll={handleClearAllClick}
            />
            <div className={styles.clearAllWrapper}>
              <button
                className={
                  selectedFilters.length > 0
                    ? styles.clearAllBtnSelected
                    : styles.clearAllBtn
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
