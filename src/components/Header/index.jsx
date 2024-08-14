import Weather from './WeatherEl'
import styles from './Header.module.sass'

function Header () {
  return (
    <header className={styles.header}>
      <h1>TO DO</h1>
      <Weather />
    </header>
  )
}

export default Header
