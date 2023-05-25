"use client"
import styles from './friends.module.css';
import SideMenu from '../../components/Sidemenu_friends';
import Filter from '@/components/Filter';
import React, { useState } from 'react';

import friends from './data.json' assert {type: 'json'};

export default function Friends() {
  const [isAnyCheckboxSelected, setIsAnyCheckboxSelected] = useState(false);

  const handleClearAllClick = () => {
    setIsAnyCheckboxSelected(false);
  };

  return (
    <main className={styles.main}>
      <SideMenu />
      <div className={styles.content}>
        <div className={styles.topmenu}>
          <h1>Friends</h1>
        </div>

        <div className={styles.center_content}>
          <div className={styles.filterWrapper}>
            <Filter setIsAnyCheckboxSelected={setIsAnyCheckboxSelected} />
            <div className={styles.clearAllWrapper}>
              <button className={isAnyCheckboxSelected ? `${styles.clearAllButton} ${styles.clearAllButtonSelected}` : styles.clearAllButton} onClick={handleClearAllClick}>
                Clear All
              </button>
            </div>
          </div>

          {friends.map((friend, index) => (
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
