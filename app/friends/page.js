import styles from './friends.module.css'
import SideMenu from '../../components/Sidemenu_friends'

export default function Friends() {

  return (
    <main className={styles.main}>
      <SideMenu />
      <div className={styles.content}>
        <div className={styles.topmenu}>
          <h1>Friends</h1>
        </div>


        <div className={styles.filter}>
          <button className={styles.filterButton}>
            <img src="./../assets/icons/filter.svg" />
          </button>
          <button className={styles.clearAllButton}>| Clear all</button>
        </div>
        <div className={styles.center_content}>
          <div className={styles.friend}>
            <div className={styles.column}>
              <div className={styles.name}>Sally Cooper</div>
              <span className={[styles.pill, styles.closeFriends].join(' ')}>Close Friends</span>
            </div>
            <div className={styles.details}>sallycooper@gmail.com • (470) 782-5471</div>
          </div>

          <div className={styles.friend}>
            <div className={styles.column}>
              <div className={styles.name}>Judith Gonzalez</div>
            </div>
            <div className={styles.details}>jgonzalez@gmail.com • (123) 142-4123</div>
          </div>

          <div className={styles.friend}>
            <div className={styles.column}>
              <div className={styles.name}>Betty Wood</div>
              <span className={[styles.pill, styles.superCloseFriends].join(' ')}>Super Close Friends</span>
            </div>
            <div className={styles.details}>betty@gmail.com • (273) 098-1029</div>
          </div>
        </div>
      </div>

    </main>
  )
}
