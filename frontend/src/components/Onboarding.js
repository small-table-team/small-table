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
    <Box display="flex" flexDirection="column" height="100vh" sx={{ backgroundColor: "white", position: "relative" }}>
      <Swiper
        ref={swiperRef}
        onSlideChange={(swiper) => setIndex(swiper.activeIndex)}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        style={{ width: "100%", flex: 1 }}
        speed={500}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <Box display="flex" flexDirection="column" height="100%">
              {/* תמונה */}
              <Box
                component="img"
                src={slide.img}
                alt=""
                sx={{
                  width: 240,
                  height: 292,
                  borderRadius: "12px",
                  objectFit: "cover",
                  boxShadow: 3,
                  mt: "114px",
                  mx: "auto",
                  opacity: 1
                }}
              />

              {/* טקסט */}
              <Box
                sx={{
                  width: 246,
                  height: 81,
                  mt: "73px",
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
                    fontSize: 18,
                    lineHeight: "100%",
                    letterSpacing: 0,
                    textAlign: "center",
                    color: "#32343E",
                    style: "bold",
                    
                  }}
                >
                  {slide.text}
                </Typography>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* כפתור Next / Finish */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: "27px", mb: "20px" }}>
        <Button
          variant="contained"
          sx={{
            width: 327,
            height: 62,
            borderRadius: "12px",
            backgroundColor: "#651C1C",
            fontWeight: "bold",
            textTransform: "none",
            fontFamily: "Sen",
          }}
          onClick={handleNext}
        >
          {index === slides.length - 1 ? "Finish" : "Next"}
        </Button>
        <Button onClick={handleSkip} sx={{ mt: 1, color: "gray", textTransform: "none" }}>
          Skip
        </Button>
      </Box>

      {/* מיקום Pagination לפי הפיגמה */}
      <Box
        sx={{
          fontFamily: "Sen",
          position: "absolute",
          top: "675px",
          left: "24px",
          width: "327px",
          height: "62px",
          borderRadius: "12px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pointerEvents: "none" // כדי שה-Swiper יטפל בלחיצה על הנקודות
        }}
      />
    </Box>
  );
}
