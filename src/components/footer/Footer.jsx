//imports…
import { Button } from "@mui/material";
import { IconButton } from "@mui/material";
//icons
import facebookIcon from "../../assets/icons/fb.svg"
import instagramIcon from "../../assets/icons/insta.svg"
import linkedInIcon from "../../assets/icons/linkedin.svg"
//styles
import styles from "./footer.module.scss"

export default function Footer() {

    return (
        <div className={styles.footer}>
            <footer className={styles.footerContent} >
                <div className={styles.horizontal}>
                    <div className={styles.socials}>
                        <h3>Get Updated!</h3>
                        <div className={styles.iconsBar}>
                            <IconButton
                                href="https://www.linkedin.com/company/ieee-sb-gcek/"
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="solid"
                                sx={
                                    {
                                        backgroundColor: "#0A66C2",
                                        ":hover": {
                                            backgroundColor: "#67a0ebff",
                                        }
                                    }
                                }
                            >
                                <img className={styles.icons} src={linkedInIcon} alt="LinkedIn Icon" />
                            </IconButton>
                            <IconButton
                                href="https://www.instagram.com/ieeesbgcek?igsh=NjM2OW41dG85NmJi"
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="solid"
                                sx={
                                    {
                                        backgroundColor: "#E1306C",
                                        ":hover": {
                                            backgroundColor: "#f1a7b8",
                                        }
                                    }
                                }
                            >
                                <img className={styles.insta} src={instagramIcon} alt="Instagram Icon" />
                            </IconButton>
                            <IconButton
                                href="https://www.facebook.com/ieesbgcek/"
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="solid"
                                sx={
                                    {
                                        backgroundColor: "#1877F2",
                                        ":hover": {
                                            backgroundColor: "#67a0ebff",
                                        }
                                    }
                                }
                            >
                                <img className={styles.icons} src={facebookIcon} alt="Facebook Icon" />
                            </IconButton>
                        </div>
                    </div>
                    <div className={styles.contacts}>
                        <h3>Contact Us</h3>
                        <p>
                            Ajay E.K. : 85929 36392<br />
                            Person 2  : 0987654321<br />
                            Person 3  : 7531984260
                        </p>
                    </div>
                    <div className={styles.address}>
                        <h3>Venue</h3>
                        <p>
                            Government College of Engineering Kannur,<br />
                            Mangattuparamba, <br />
                            Parassinikadavu P.O.,<br />
                            Kannur-670 563, Kerala.
                        </p>
                        <Button
                            variant="contained"
                            color="primary"
                            href="https://www.google.com/maps/place/Government+College+of+Engineering,+Kannur/@11.9858706,75.3790987,17z/data=!4m6!3m5!1s0x3ba43e5eaa1932c3:0xa686759a5aa8afa5!8m2!3d11.9858654!4d75.3816736!16zL20vMDhmMnRy?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D"
                        >
                            Get Directions
                        </Button>
                    </div>
                </div>
                <hr className={styles.divider} />
                <div className={styles.copyright}>
                    <p> © {new Date().getFullYear()} <strong>IEEE SB GCEK</strong>, All rights reserved.</p>

                </div>



            </footer>

        </div>
    );
}