import api from "../../api";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useState } from "react";
import BGfromPoster from "../../assets/images/BGfromPoster.png";

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
        password: e.target.password.value,
      });
      toast.success("Login successful!");
      const token = response.data.token;
      localStorage.setItem("authToken", token);
      navigate("/user-dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

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
      <div className="relative z-10 h-screen flex flex-col items-center justify-center p-4">
        <div className="bg-black/30 backdrop-blur-lg p-8 rounded-xl shadow-2xl w-full max-w-sm md:max-w-md ">
          <h1 className="text-3xl font-extrabold mb-8 text-white text-center">
            Welcome Back!
          </h1>

          <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="mobile"
                className="self-start font-medium text-white"
              >
                Mobile:
              </label>
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
                className="w-full h-12 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-inner bg-white/70 text-gray-800 placeholder-gray-500 transition duration-150"
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="password"
                className="self-start font-medium text-white"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                className="w-full h-12 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-inner bg-white/70 text-gray-800 placeholder-gray-500 transition duration-150"
              />
            </div>

            <div className="flex flex-col gap-4 items-center mt-8">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold rounded-lg py-3 px-8 text-lg cursor-pointer transition duration-300 hover:bg-blue-700 disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <a
                href="/forgot-password"
                className="text-white hover:text-blue-200 text-sm transition duration-150"
              >
                Forgot your password?
              </a>
              <p className="text-sm text-white/90">
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="text-blue-400 hover:text-blue-300 font-semibold transition duration-150"
                >
                  Register Now
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
