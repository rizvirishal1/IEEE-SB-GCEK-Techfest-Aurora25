import { Button } from "@mui/material";
import { IconButton } from "@mui/material";
import Email from "@mui/icons-material/Email";
import Phone from "@mui/icons-material/Phone";
import MapOutlined from "@mui/icons-material/MapOutlined";

import facebookIcon from "../../assets/icons/fb.svg";
import instagramIcon from "../../assets/icons/insta.svg";
import linkedInIcon from "../../assets/icons/linkedin.svg";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="mt-0">
      <footer className="border-t border-gray-700 bg-gradient-to-br from-[#1c1d1f] to-[#111213] text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Change: grid-cols-1 for a clean vertical stack on mobile, 4 columns on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-y-8 gap-x-4 lg:gap-12">
            {/* 1. Get Updated (Social Media) */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-white">
                Get Updated
              </h3>
              <div className="flex gap-3">
                <IconButton
                  component="a"
                  href="https://www.linkedin.com/company/ieee-sb-gcek/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  sx={{
                    backgroundColor: "white",
                    color: "#0A66C2",
                    transition: "all 0.3s",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <img
                    className="w-4 h-4"
                    src={linkedInIcon}
                    alt="LinkedIn Icon"
                  />
                </IconButton>

                <IconButton
                  component="a"
                  href="https://www.instagram.com/ieeesbgcek?igsh=NjM2OW41dG85NmJi"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  sx={{
                    backgroundColor: "white",
                    color: "#E1306C",
                    transition: "all 0.3s",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <img
                    className="w-4 h-4"
                    src={instagramIcon}
                    alt="Instagram Icon"
                  />
                </IconButton>

                <IconButton
                  component="a"
                  href="https://www.facebook.com/ieesbgcek/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  sx={{
                    backgroundColor: "white",
                    color: "#1877F2",
                    transition: "all 0.3s",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <img
                    className="w-4 h-4"
                    src={facebookIcon}
                    alt="Facebook Icon"
                  />
                </IconButton>
              </div>
            </div>

            {/* 2. Contact Us */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-white">
                Contact Us
              </h3>
              <div className="space-y-2 text-xs sm:text-sm">
                <p className="flex items-center gap-2">
                  <Phone sx={{ fontSize: 16 }} className="text-gray-500" />
                  Ajay E.K. : 85929 36392
                </p>
                <p className="flex items-center gap-2">
                  <Phone sx={{ fontSize: 16 }} className="text-gray-500" />
                  Parvathi : 89213 75020
                </p>
                <p className="flex items-center gap-2">
                  <Phone sx={{ fontSize: 16 }} className="text-gray-500" />
                  Yadunand: 98958 42152
                </p>
                <p className="flex items-center gap-2">
                  <Email sx={{ fontSize: 16 }} className="text-gray-500" />
                  <a
                    href="mailto:ieeesb@gcek.ac.in"
                    className="hover:text-white transition-colors"
                  >
                    ieeesb@gcek.ac.in
                  </a>
                </p>
              </div>
            </div>

            {/* 3. Website by */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-white">
                Website by
              </h3>
              <div className="space-y-2 text-sm">
                <p
                  className="flex gap-2 items-center cursor-pointer hover:text-white transition-colors"
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/in/rizvi-rishal/",
                      "_blank"
                    )
                  }
                >
                  <img
                    className="w-3.5 invert"
                    src={linkedInIcon}
                    alt="LinkedIn Icon"
                  />
                  Rizvi Rishal
                </p>

                <p
                  className="flex gap-2 items-center cursor-pointer hover:text-white transition-colors"
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/in/shad-c-t/",
                      "_blank"
                    )
                  }
                >
                  <img
                    className="w-3.5 invert"
                    src={linkedInIcon}
                    alt="LinkedIn Icon"
                  />
                  Shad C.T.
                </p>
              </div>
            </div>

            {/* 4. Venue & Directions */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-white">
                Venue
              </h3>
              <div className="text-sm space-y-4">
                <p className="leading-relaxed">
                  <span className="flex items-start gap-2">
                    <MapOutlined
                      sx={{ fontSize: 16 }}
                      className="text-gray-500 mt-1"
                    />
                    <span>
                      Government College of Engineering Kannur, Mangattuparamba,
                      Parassinikadavu P.O., Kannur-670 563, Kerala.
                    </span>
                  </span>
                </p>
                <Button
                  component="a"
                  variant="contained"
                  href="https://www.google.com/maps/place/Government+College+of+Engineering,+Kannur/@11.9858706,75.3790987,17z/data=!4m6!3m5!1s0x3ba43e5eaa1932c3:0xa686759a5aa8afa5!8m2!3d11.9858654!4d75.3816736!16zL20vMDhmMnRy?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  sx={{
                    backgroundColor: "#52b202",
                    "&:hover": {
                      backgroundColor: "#79d821",
                    },
                    color: "black",
                    fontWeight: "bold",
                    textTransform: "none",
                    padding: "6px 16px",
                    fontSize: "0.875rem",
                  }}
                >
                  Get Directions
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <hr className="max-w-7xl mx-auto border-gray-700 mx-4 sm:mx-6 lg:mx-8" />
        <div className="text-center py-6 text-xs sm:text-sm text-gray-500">
          <p>
            © {currentYear} <strong className="text-white">IEEE SB GCEK</strong>
            , All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
