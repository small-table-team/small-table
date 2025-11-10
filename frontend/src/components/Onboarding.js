import React, { useState, useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom"; // אם אתם משתמשים ב-react-router

const slides = [
  {
    img: "https://source.unsplash.com/600x400/?food",
    text: "Ghar Ka Swad, Office Tak Pure Veg Tiffins!"
  },
  {
    img: "https://source.unsplash.com/600x400/?lunch",
    text: "Skip the drive we deliver for a buck!"
  },
  {
    img: "https://source.unsplash.com/600x400/?healthy",
    text: "Your event’s MVP our catering!"
  },
  {
    img: "https://source.unsplash.com/600x400/?dessert",
    text: "Sweet endings for your events!"
  }
];

export default function Onboarding() {
  const [index, setIndex] = useState(0);
  const swiperRef = useRef(null);
  const navigate = useNavigate();

  const handleNext = () => {
    if (index < slides.length - 1) {
      swiperRef.current.swiper.slideNext();
    } else {
      navigate("/HomePage"); // דף הבית
    }
  };

  const handleSkip = () => {
    navigate("/HomePage"); // דילוג ישיר לדף הבית
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      height="100vh"
      p={3}
      sx={{ backgroundColor: "white" }}
    >
      <Swiper
        ref={swiperRef}
        onSlideChange={(swiper) => setIndex(swiper.activeIndex)}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        style={{ width: "100%", flex: 1 }}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="100%"
            >
              <Box
                component="img"
                src={slide.img}
                alt=""
                sx={{
                  width: 240,
                  height: 292,
                  borderRadius: 2,
                  objectFit: "cover",
                  boxShadow: 3,
                  mt: 6,
                  mb: 3
                }}
              />
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: 700,
                  fontSize: 18,
                  textAlign: "center",
                  color: "#32343E",
                  mb: 2
                }}
              >
                {slide.text}
              </Typography>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      <Box width="100%" textAlign="center" mb={3}>
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#651C1C",
            borderRadius: 2,
            py: 1.5,
            fontWeight: "bold",
            textTransform: "none"
          }}
          onClick={handleNext}
        >
          {index === slides.length - 1 ? "Finish" : "Next"}
        </Button>

        <Button
          onClick={handleSkip}
          sx={{
            mt: 1,
            color: "gray",
            textTransform: "none"
          }}
        >
          Skip
        </Button>
      </Box>
    </Box>
  );
}
