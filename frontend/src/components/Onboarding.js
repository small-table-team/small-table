import React, { useState, useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";

const slides = [
  { img: "/images/1.jpg", text: "Ghar Ka Swad, Office Tak Pure Veg Tiffins!" },
  { img: "/images/2.jpg", text: "Skip the drive we deliver for a buck!" },
  { img: "/images/3.jpg", text: "Your event’s MVP our catering!" },
  { img: "/images/4.jpg", text: "Click. Calendar. Done! Schedule 30 days of deliveries in seconds!" }
];

export default function Onboarding() {
  const [index, setIndex] = useState(0);
  const swiperRef = useRef(null);
  const navigate = useNavigate();

  const handleNext = () => {
    if (index < slides.length - 1) swiperRef.current.swiper.slideNext();
    else navigate("/HomePage");
  };

  const handleSkip = () => navigate("/HomePage");

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      sx={{
        backgroundColor: "white",
        position: "relative",
        overflow: "hidden",
        px: "4vw",
      }}
    >
      <Swiper
        ref={swiperRef}
        onSlideChange={(swiper) => setIndex(swiper.activeIndex)}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        style={{ width: "100%", flex: 1 }}
        speed={500}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <Box display="flex" flexDirection="column" alignItems="center" height="100%">
              {/* תמונה */}
              <Box
                component="img"
                src={slide.img}
                alt=""
                sx={{
                  width: "60vw",
                  maxWidth: 240,
                  height: "48vh",
                  maxHeight: 292,
                  borderRadius: "12px",
                  objectFit: "cover",
                  mt: "12vh",
                  opacity: 1,
                }}
              />

              {/* טקסט */}
              <Box
                sx={{
                  width: "74vw",
                  maxWidth: 296,
                  mt: "6vh",
                  mx: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontWeight: 700,
                    fontSize: "4.5vw",
                    lineHeight: "110%",
                    letterSpacing: 0,
                    textAlign: "center",
                    color: "#32343E",
                    "@media (min-width: 400px)": {
                      fontSize: "18px",
                    },
                  }}
                >
                  {slide.text}
                </Typography>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* אזור כפתורים */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: "4vh",
          mb: "2vh",
        }}
      >
        {/* כפתור ראשי - תמיד באותו מקום */}
        <Button
          variant="contained"
          sx={{
            width: "82vw",
            maxWidth: 327,
            height: "8vh",
            maxHeight: 62,
            borderRadius: "12px",
            backgroundColor: "#691C2B",
            fontWeight: "bold",
            textTransform: "none",
            fontFamily: "Sen",
            fontSize: "4.2vw",
            "@media (min-width: 400px)": {
              fontSize: "16px",
            },
          }}
          onClick={handleNext}
        >
          {index === slides.length - 1 ? "Get Started" : "Next"}
        </Button>

        {/* מקום קבוע ל-Skip */}
        <Box
          sx={{
            height: "5vh", // שומר מקום קבוע גם כשהכפתור נעלם
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {index < slides.length - 1 && (
            <Button
              onClick={handleSkip}
              sx={{
                color: "gray",
                textTransform: "none",
                fontFamily: "Sen",
                fontSize: "3.8vw",
                "@media (min-width: 400px)": {
                  fontSize: "15px",
                },
              }}
            >
              Skip
            </Button>
          )}
        </Box>
      </Box>

      {/* Pagination לפי הפיגמה */}
      <Box
        sx={{
          position: "absolute",
          top: "83vh",
          left: "50%",
          transform: "translateX(-50%)",
          width: "82vw",
          maxWidth: 327,
          height: "8vh",
          borderRadius: "12px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pointerEvents: "none",
        }}
      />
    </Box>
  );
}
