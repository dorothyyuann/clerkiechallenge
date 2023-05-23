import styles from './Sidemenu.css'

const Sidemenu = () => {
    return (
        <nav id='sideMenu' className={styles.sidemenu}>
            <div className='flex'>
                <div className="logo">
                    <img src="../assets/images/logo-text.svg" />
                </div>
                <a className='btn' href='/'>
                    <img src="../assets/icons/home.svg" />
                    Home
                </a>
                <a className='btn' href='#'>
                    <img src="../assets/icons/friends.svg" />
                    Friends
                </a>
            </div>
        </nav>
    );
}

export default Sidemenu;