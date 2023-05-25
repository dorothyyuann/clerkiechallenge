import styles from './page.module.css'
import SideMenu from '../components/Sidemenu'

export default function Home() {
  return (
    <main className={styles.main}>
    <SideMenu/>
      <div className={styles.content}>
        <div className={styles.topmenu}>
          <h1>Home</h1>
        </div>
        <div className={styles.center_content}>
          <h1>Welcome to the Clerkie Challenge!</h1>
        </div>
      </div>

    </main>
  )
}
