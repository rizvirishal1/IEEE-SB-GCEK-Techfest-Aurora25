import BGfromPoster from "../../assets/images/BGfromPoster.png";

export default function About() {
  return (
    <div
      className="min-h-screen w-full flex flex-col justify-center items-center overflow-x-hidden bg-cover bg-center bg-no-repeat relative py-20"
      style={{ backgroundImage: `url(${BGfromPoster})` }}
    >
      <div
        className="bg-black/50 backdrop-blur-lg p-8 rounded-xl max-w-4xl text-white text-center m-4"
        style={{ boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.5)" }}
      >
        <h1 className="text-4xl font-extrabold mb-2 text-cyan-400">About Us</h1>
        {/* <h2 className="text-2xl font-semibold mb-6 text-cyan-400">Aurora'25</h2> */}

        <p className="text-justify px-4 sm:px-8 md:px-12 text-lg">
          We are proud to announce AURORA '25, the inaugural annual technical
          festival of the IEEE Student Branch at Govt. College of Engineering,
          Kannur. As the first edition, AURORA '25 is not just an event; it's
          the launch of a new legacy in Kerala's tech landscape. Our mission is
          to establish a premier state-level platform that ignites innovation,
          fosters hands-on learning, and connects the region's brightest
          engineering minds with industry leaders. This is a ground-floor
          opportunity to be part of a tradition in the making.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-cyan-400">
          IEEE SB GCEK
        </h2>
        <p className="text-justify px-4 sm:px-8 md:px-12 text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
          perspiciatis amet neque repellat obcaecati numquam, ullam magnam
          libero fuga incidunt voluptatem, voluptates possimus reiciendis natus
          perferendis vel fugit aliquid? Ad.
        </p>
      </div>
    </div>
  );
}
