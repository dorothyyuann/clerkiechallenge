"use client"
import styles from './friends.module.css';
import SideMenu from '../../components/Sidemenu_friends';
import Filter from '@/components/Filter';
import React, { useState } from 'react';

import friendsData from './data.json' assert { type: 'json' };

export default function Friends() {
  const [selectedCheckbox, setSelectedCheckbox] = useState('');

  const handleClearAllClick = () => {
    setSelectedCheckbox('');
  };

  const handleCheckboxChange = (checkboxValue) => {
    setSelectedCheckbox(checkboxValue);
  };

  const filteredFriends = selectedCheckbox
    ? friendsData.filter((friend) => {
        if (selectedCheckbox === 'superCloseFriends') {
          return friend.status === 3;
        } else if (selectedCheckbox === 'closeFriends') {
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
            <Filter handleCheckboxChange={handleCheckboxChange} onApply={handleCheckboxChange} />
            <div className={styles.clearAllWrapper}>
              <button
                className={selectedCheckbox ? `${styles.clearAllButton} ${styles.clearAllBtnSelected}` : styles.clearAllButton}
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
