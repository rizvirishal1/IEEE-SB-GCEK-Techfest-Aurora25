//imports…
import { useState } from "react";
import api from "../../api";
import { toast } from "react-toastify";
import { useEffect } from "react";
// Import the background image assumed to be used in the login page
import BGfromPoster from "../../assets/images/BGfromPoster.png";

//styles
// import styles from "./register.module.scss" // SCSS file no longer needed

export default function Register() {
    const [isMobileVerified, setIsMobileVerified] = useState(false);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isWaitingforResend, setIsWaitingforResend] = useState(false);
    const [timer, setTimer] = useState(-1);
    const [formData, setFormData] = useState({
        name: "",
        IEEEMemberId: "",
        mobile: "",
        password: "",
        "re-password": "",
        otp: ""
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleOtpGeneration = async () => {
        setIsOtpSent(true);
        setIsWaitingforResend(true);
        try {
            await api.post("/verify-mobile/generate-otp", {
                mobile: formData.mobile,
            });
        } catch (error) {
            toast.error(
                error.response?.data?.error || "Failed to send OTP. Please try again."
            );
        }
    };

    const handleOtpVerification = async () => {
        try {
            await api.post("/verify-mobile/verify-otp", {
                mobile: formData.mobile,
                otp: formData.otp,
            });
        } catch (error) {
            alert("Invalid OTP");
            return;
        }
        setIsMobileVerified(true);
        alert("Mobile number verified successfully!");
    };

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
                IEEEMemberId: formData.IEEEMemberId,
                mobile: formData.mobile,
                password: formData.password
            });
            toast.success("Registration successful! You can now log in.");
            setFormData({
                name: "",
                IEEEMemberId: "",
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
        <div className="relative min-h-screen">
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `url(${BGfromPoster})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            ></div>

            {/* Glassmorphism Container: Centered, Blurry Background */}
            <div className="relative z-10 h-screen flex flex-col items-center justify-center p-4">
                {/* Registration Box with Glassmorphism Effect */}
                <div className="bg-black/30 backdrop-blur-lg p-8 rounded-xl shadow-2xl w-full max-w-sm md:max-w-md border border-white/50">
                    <h1 className="text-3xl font-extrabold mb-8 text-white text-center">
                        Create Account
                    </h1>
                    <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
                        {/* Name Input */}
                        <div className="flex flex-col gap-2 w-full">
                            <label
                                htmlFor="name"
                                className="self-start font-medium text-white"
                            >
                                Name:
                            </label>
                            <input
                                autoComplete="name"
                                id="name"
                                type="text"
                                name="name"
                                required
                                onChange={handleInputChange}
                                value={formData.name}
                                className="w-full h-12 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-inner bg-white/70 text-gray-800 placeholder-gray-500 transition duration-150"
                            />
                        </div>
                        <div className={styles.formItems}>
                            <label htmlFor="IEEEMemberId">IEEE Member ID:</label>
                            <input
                                autoComplete="IEEEMemberId"
                                id="IEEEMemberId"
                                type="text"
                                name="IEEEMemberId"
                                required
                                onChange={handleInputChange}
                                value={formData.IEEEMemberId}
                                placeholder="IEEE Members can get discount on tickets"
                            />
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <label
                                htmlFor="mobile"
                                className="self-start font-medium text-white"
                            >
                                Mobile:
                            </label>
                            <div className="flex gap-2 w-full">
                                <input
                                    autoComplete="tel"
                                    id="mobile"
                                    type="tel"
                                    name="mobile"
                                    required
                                    onChange={handleInputChange}
                                    disabled={isMobileVerified || isOtpSent}
                                    value={formData.mobile}
                                    className="w-full h-12 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-inner bg-white/70 text-gray-800 placeholder-gray-500 transition duration-150 disabled:bg-gray-300/50"
                                />
                                <button
                                    type="button"
                                    className="bg-green-600 text-white  rounded-lg py-1 px-4 text-sm font-semibold cursor-pointer shadow-md transition duration-200 hover:bg-[#6c802a] min-w-[120px] disabled:bg-gray-400 disabled:border-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed disabled:shadow-none"
                                    disabled={
                                        formData.mobile.length !== 10 ||
                                        isMobileVerified ||
                                        isWaitingforResend
                                    }
                                    onClick={handleOtpGeneration}
                                >
                                    {isWaitingforResend ? `Resend in ${timer}s` : "Send OTP"}
                                </button>
                            </div>
                        </div>

                        {/* OTP Verification Input */}
                        <div
                            className={`flex flex-col gap-2 w-full transition-all duration-300 ${!isOtpSent ? "hidden" : "block"
                                }`}
                        >
                            <label
                                htmlFor="otp"
                                className="self-start font-medium text-white"
                            >
                                OTP:
                            </label>
                            <div className="flex gap-2 w-full">
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
                                    className="w-full h-12 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-inner bg-white/70 text-gray-800 placeholder-gray-500 transition duration-150 disabled:bg-gray-300/50"
                                />
                                <button
                                    type="button"
                                    className="bg-[#87a036] text-white border-2 border-[#87a036] rounded-lg py-1 px-4 text-sm font-semibold cursor-pointer shadow-md transition duration-200 hover:bg-[#6c802a] min-w-[120px] disabled:bg-gray-400 disabled:border-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed disabled:shadow-none"
                                    onClick={handleOtpVerification}
                                    disabled={formData.otp?.length !== 6 || isMobileVerified}
                                >
                                    {isMobileVerified ? "Verified" : "Verify OTP"}
                                </button>
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="flex flex-col gap-2 w-full">
                            <label
                                htmlFor="password"
                                className="self-start font-medium text-white"
                            >
                                Password:
                            </label>
                            <input
                                autoComplete="new-password"
                                id="password"
                                type="password"
                                name="password"
                                required
                                onChange={handleInputChange}
                                value={formData.password}
                                className="w-full h-12 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-inner bg-white/70 text-gray-800 placeholder-gray-500 transition duration-150"
                            />
                        </div>

                        {/* Re-enter Password Input */}
                        <div className="flex flex-col gap-2 w-full">
                            <label
                                htmlFor="re-password"
                                className="self-start font-medium text-white"
                            >
                                Re-enter Password:
                            </label>
                            <input
                                autoComplete="new-password"
                                id="re-password"
                                type="password"
                                name="re-password"
                                required
                                onChange={handleInputChange}
                                value={formData["re-password"]}
                                className="w-full h-12 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-inner bg-white/70 text-gray-800 placeholder-gray-500 transition duration-150"
                            />
                        </div>

                        {/* Register Button */}
                        <div className="flex flex-col gap-2 items-center mt-8">
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white font-semibold rounded-lg py-3 px-8 text-lg cursor-pointer transition duration-300 hover:bg-blue-700 disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Registering..." : "Register"}
                            </button>
                            <p className="text-sm text-white/90 mt-2">
                                Already have an account?{" "}
                                <a
                                    href="/login"
                                    className="text-blue-400 hover:text-blue-300 font-semibold transition duration-150"
                                >
                                    Log In
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    );
}
