import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import bgImg1 from "../../assets/sunset_view_city.jpg";
import bgImg2 from "../../assets/boy_n_cat.jpg";
import bgImg3 from "../../assets/art_picture.jpg";

const images = [bgImg1, bgImg2, bgImg3];

const KSlideshow = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="intro-background">
      <AnimatePresence>
        {images.map((image, i) =>
          i === index ? (
            <motion.div
              key={i}
              className="background-image"
              style={{ backgroundImage: `url(${image})` }}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          ) : null
        )}
      </AnimatePresence>
    </div>
  );
};

export default KSlideshow;
