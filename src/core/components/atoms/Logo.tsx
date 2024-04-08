import Image from "next/image"
import logo from "../../assets/images/icon.png"
import styles from "./Logo.module.scss"

export function Logo() {
    return (
     <div className={styles.logodiv}>
     <Image src={logo} alt="Logo"/>
     </div>
    )
}