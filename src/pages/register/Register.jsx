//imports…
import { useState } from "react";
import api from "../../api";
import { toast } from "react-toastify";
import { useEffect } from "react";
//styles
import styles from "./register.module.scss"


export default function Register() {
    const [isMobileVerified, setIsMobileVerified] = useState(false);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isWaitingforResend, setIsWaitingforResend] = useState(false);
    const [timer, setTimer] = useState(-1);
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        password: "",
        "re-password": "",
        otp: ""
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleOtpGeneration = async () => {
        setIsOtpSent(true);
        setIsWaitingforResend(true);
        try {
            await api.post("/verify-mobile/generate-otp", { mobile: formData.mobile });
        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to send OTP. Please try again.");
        }
    }

    const handleOtpVerification = async () => {
        try {
            await api.post("/verify-mobile/verify-otp", { mobile: formData.mobile, otp: formData.otp });
        } catch (error) {
            alert("Invalid OTP");
            return;
        }
        setIsMobileVerified(true);
        alert("Mobile number verified successfully!");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);

        if (!isMobileVerified) {
            toast.error("Please verify your mobile number before registering.");
            setIsSubmitting(false);
            return;
        }
        if (formData.password !== formData["re-password"]) {
            toast.error("Passwords do not match.");
            setIsSubmitting(false);
            return;
        }

        try {
            await api.post("/register", {
                name: formData.name,
                mobile: formData.mobile,
                password: formData.password
            });
            toast.success("Registration successful! You can now log in.");
            setFormData({
                name: "",
                mobile: "",
                password: "",
                "re-password": "",
                otp: ""
            });
            setIsMobileVerified(false);
            setIsOtpSent(false);
            setIsWaitingforResend(false);
            setTimer(-1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (error) {
            toast.error("Registration failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    useEffect(() => {
        let interval;
        if (isWaitingforResend && timer === -1) {
            setTimer(60);
        }
        if (isWaitingforResend && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        if (timer === 0) {
            setIsWaitingforResend(false);
            setTimer(-1);
        }
        return () => clearInterval(interval);
    }, [isWaitingforResend, timer]);




    return (
        <div className={styles.register}>
            <h1>Register Page</h1>
            <form className={styles.form}>
                <div className={styles.formItems}>
                    <label htmlFor="name">Name:</label>
                    <input
                        autoComplete="name"
                        id="name"
                        type="text"
                        name="name"
                        required
                        onChange={handleInputChange}
                        value={formData.name}
                    />
                </div>
                <div className={styles.formItems}>
                    <label htmlFor="mobile">Mobile:</label>
                    <input
                        autoComplete="tel"
                        id="mobile"
                        type="tel"
                        name="mobile"
                        required
                        onChange={handleInputChange}
                        disabled={isMobileVerified || isOtpSent}
                        value={formData.mobile}
                    />
                    <button
                        type="button"
                        className={styles.verifyButton}
                        disabled={formData.mobile.length !== 10 || isMobileVerified || isWaitingforResend}
                        onClick={handleOtpGeneration}

                    >
                        {isWaitingforResend ? `Resend in ${timer}s` : "Send OTP"}
                    </button>

                </div>

                <div className={`${styles.formItems} ${!isOtpSent ? styles.hidden : ""}`}>
                    <label htmlFor="otp">OTP:</label>
                    <input
                        autoComplete="one-time-code"
                        id="otp"
                        type="text"
                        name="otp"
                        required
                        onChange={handleInputChange}
                        disabled={isMobileVerified}
                        maxLength={6}
                        value={formData.otp}

                    />
                    <button
                        type="button"
                        className={styles.verifyButton}
                        onClick={handleOtpVerification}
                        disabled={formData.otp?.length !== 6 || isMobileVerified}
                    >
                        {isMobileVerified ? "Verified" : "Verify OTP"}
                    </button>
                </div>

                <div className={styles.formItems}>
                    <label htmlFor="password">Password:</label>
                    <input
                        autoComplete="new-password"
                        id="password"
                        type="password"
                        name="password"
                        required
                        onChange={handleInputChange}
                        value={formData.password}
                    />
                </div>

                <div className={styles.formItems}>
                    <label htmlFor="re-password">Re-enter Password:</label>
                    <input
                        autoComplete="new-password"
                        id="re-password"
                        type="password"
                        name="re-password"
                        required
                        onChange={handleInputChange}
                        value={formData["re-password"]}
                    />
                </div>



                <div className={styles.formItems}>
                    <button type="submit"
                        className={styles.registerButton}
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                    >{isSubmitting ? "Registering..." : "Register"}</button>
                </div>
            </form>
        </div>
    );
}