import api from "../../api";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import BGfromPoster from "../../assets/images/BGfromPoster.png";

export default function OrderSummary() {
  const location = useLocation();
  const navigate = useNavigate();
  const ticketDetails = location.state?.ticket || {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ticket = new FormData();
    const paymentFile = e.target.paymentScreenshot.files[0];

    if (!paymentFile) {
      toast.error("Please select a payment screenshot to upload.");
      return;
    }

    ticket.append("paymentScreenshot", paymentFile);
    ticket.append("type", ticketDetails.type);
    ticket.append("offerType", ticketDetails.offerType);

    try {
      await api.post("/user/buy-ticket", ticket, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      toast.success("Payment successful! Your ticket has been booked.");
    } catch (error) {
      if (error.response?.data?.error === "Session expired. Please login") {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("authToken");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        toast.error(
          error.response?.data?.error || "Submission failed. Please try again."
        );
      }
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

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <div className="bg-black/30 backdrop-blur-lg p-8 rounded-xl shadow-2xl w-full max-w-sm md:max-w-xl ">
          <h1 className="text-3xl font-extrabold mb-8 text-white text-center">
            Order Summary Page
          </h1>

          {ticketDetails.type ? (
            <div className="summaryBox text-white">
              <h2 className="text-2xl font-semibold mb-4 border-b border-white/50 pb-2">
                Order Details
              </h2>
              <p className="mb-2">
                <span className="font-medium">Ticket Type:</span>{" "}
                {ticketDetails.type}
              </p>
              <p className="mb-4">
                <span className="font-medium">Price:</span>{" "}
                {ticketDetails.offerType === "early-bird" ? "$50" : "$100"}
              </p>

              <h3 className="font-medium mb-1">Ticket Details:</h3>
              <p className="text-sm italic mb-6 text-white/80">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam excepturi voluptates dolorum necessitatibus, deserunt
                veniam voluptatibus consequuntur? Tempore, consequatur, ipsam
                iusto, odit quod suscipit sapiente rem aliquid dicta ea ut.
              </p>

              <div className="qrCodesection flex flex-col items-center mb-6 p-4 border border-white/40 rounded-md bg-white/10">
                <div className="qrCode w-[150px] h-[150px] bg-teal-300 flex items-center justify-center text-gray-800 text-sm font-semibold border-2 border-dashed border-gray-800">
                  Gpay qrcode here
                </div>
                <p className="mt-2 text-lg font-semibold text-white">
                  Scan to Pay
                </p>
              </div>

              <form
                className="paymentForm flex flex-col gap-4"
                onSubmit={handleSubmit}
              >
                <label
                  htmlFor="paymentScreenshot"
                  className="font-medium text-white"
                >
                  Upload Payment Screenshot:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="paymentScreenshot"
                  name="paymentScreenshot"
                  required
                  className="fileInput border border-gray-300 p-2 rounded block w-full bg-white/70 text-gray-800 transition duration-150"
                />

                <button
                  className="w-full bg-green-600 text-white font-semibold rounded-lg py-3 px-8 text-lg cursor-pointer transition duration-300 hover:bg-green-700 shadow-lg hover:shadow-xl mt-4"
                  type="submit"
                >
                  Submit Payment
                </button>
              </form>
            </div>
          ) : (
            <p className="text-center text-lg text-red-400 p-4 border border-red-400/50 rounded-lg bg-black/50">
              No order details available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
