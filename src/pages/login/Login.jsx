//imports…
import api from "../../api";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useState } from "react";
//styles
import styles from "./login.module.scss"

export default function Login() {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            navigate("/user-dashboard");
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        if (loading) return;

        e.preventDefault();

        try {
            setLoading(true);

            const response = await api.post("/login", {
                mobile: e.target.mobile.value,
                password: e.target.password.value
            });
            toast.success("Login successful!");
            const token = response.data.token;
            localStorage.setItem("authToken", token);
            navigate("/user-dashboard");

        }
        catch (error) {
            toast.error(error.response?.data?.error || "Login failed. Please try again.");
        }
        finally {
            setLoading(false);
        }

    };

    return (
        <div className={styles.login}>
            <h1>Login Page</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formItems}>
                    <label htmlFor="mobile">Mobile:</label>
                    <input
                        type="text"
                        id="mobile"
                        name="mobile"
                        inputMode="numeric"
                        maxLength={10}
                        pattern="[0-9]*"
                        placeholder="Enter your mobile number"
                        required
                        autoComplete="tel"
                    />
                </div>

                <div className={styles.formItems}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        required
                        autoComplete="current-password"
                    />
                </div>

                <div className={styles.formItems}>
                    <button
                        type="submit"
                        className={styles.loginButton}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                    <a href="/forgot-password">Forgot your password?</a>
                    <p>Don't have an account? <a href="/register">Register Now</a></p>
                </div>
            </form>
        </div>
    );
}