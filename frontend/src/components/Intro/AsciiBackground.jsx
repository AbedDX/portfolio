import React, { useEffect, useRef } from "react";
import { mountStudio } from "asciify-engine/studio";
import bgCityImg from "../../assets/sunset_view_city.jpg";
import "./IntroAscii.css";

const AsciiBackground = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const studioRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      targetRef.current.x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      targetRef.current.y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const smoothMouse = () => {
      const smoothing = 0.06;
      mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * smoothing;
      mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * smoothing;

      if (studioRef.current) {
        studioRef.current.updateSettings({
          hover: {
            effect: "trail",
            strength: 0.55,
            radius: 0.2,
            edgeSafe: false,
          },
          crop: {
            x: 0.5 + (mouseRef.current.x - 0.5) * 0.15,
            y: 0.5 + (mouseRef.current.y - 0.5) * 0.15,
            zoom: 1,
            rotation: 0,
          },
        });
      }
      requestAnimationFrame(smoothMouse);
    };
    const mouseLoop = smoothMouse();

    (async () => {
      try {
        const studio = await mountStudio(canvas, bgCityImg, {
          settings: {
            "version": 1,
            "aspectRatio": "original",
            "style": "voxel",
            "cellSize": 12,
            "charset": " .:-=+*#%@",
            "colorMode": "source",
            "ink": "#e6e3da",
            "print": {
              "density": 1,
              "weight": 1,
              "angle": -35,
              "roughness": 0.35,
              "invert": false,
              "secondaryInk": "#ec6752",
              "registration": 0.2,
              "seed": 7
            },
            "warps": [],
            "warpEdge": "clamp",
            "crop": {
              "x": 0.5,
              "y": 0.5,
              "zoom": 1,
              "rotation": 0
            },
            "backdrop": {
              "mode": "solid",
              "color": "#0b0b0a",
              "color2": "#1d1d1b",
              "blur": 12,
              "opacity": 1
            },
            "color": {
              "brightness": 0,
              "contrast": 1,
              "saturation": 0.5,
              "grayscale": 0,
              "tint": "#e6e3da",
              "amount": 0,
              "blend": "source-over",
              "blackPoint": 0,
              "whitePoint": 1,
              "gamma": 1,
              "shadows": 0,
              "highlights": 0,
              "curves": {
                "rgb": [[0, 0], [1, 1]],
                "red": [[0, 0], [1, 1]],
                "green": [[0, 0], [1, 1]],
                "blue": [[0, 0], [1, 1]]
              },
              "denoise": 0,
              "levels": "auto"
            },
            "dither": {
              "algorithm": "none",
              "palette": "mono",
              "colors": ["#080808", "#e6e3da"],
              "amount": 1,
              "scale": 2,
              "threshold": 0.5,
              "motion": "none",
              "speed": 1,
              "direction": 45,
              "colorSpace": "rgb"
            },
            "mask": {
              "enabled": false,
              "invert": false,
              "shapes": []
            },
            "lights": [],
            "effects": {
              "bloom": 0,
              "characterBloom": 0,
              "grain": 0,
              "dust": 0,
              "scanlines": 0,
              "crt": 0,
              "prism": 0,
              "rgbSplit": 0,
              "sharpen": 0,
              "vignette": 0,
              "glitch": 0,
              "pixelate": 0,
              "blur": 0,
              "blurType": "gaussian",
              "angle": 0,
              "focus": 0.5,
              "halftone": 0
            },
            "motion": {
              "type": "none",
              "speed": 1,
              "amount": 1
            },
            "hover": {
              "effect": "trail",
              "strength": 0.55,
              "radius": 0.2,
              "edgeSafe": false
            }
          }
        });
        studioRef.current = studio;
      } catch (err) {
        console.warn("AsciiBackground: mountStudio failed —", err.message);
      }
    })();

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(mouseLoop);
      if (studioRef.current) {
        studioRef.current.destroy();
        studioRef.current = null;
      }
    };
  }, []);

  return (
    <div className="ascii-background" ref={containerRef}>
      <canvas ref={canvasRef} className="ascii-canvas" />
    </div>
  );
};

export default AsciiBackground;
