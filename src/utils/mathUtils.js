/**
 * Utility functions for AR mathematical calculations
 */

export const degToRad = (degrees) => {
  return degrees * (Math.PI / 180);
};

export const radToDeg = (rad) => {
  return rad * (180 / Math.PI);
};

export const calculateDistance = (point1, point2) => {
  return Math.sqrt(
    Math.pow(point2.x - point1.x, 2) +
    Math.pow(point2.y - point1.y, 2) +
    Math.pow(point2.z - point1.z, 2)
  );
};

export const lerp = (start, end, t) => {
  return start * (1 - t) + end * t;
};

export const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

export const generateRandomInRange = (min, max) => {
  return Math.random() * (max - min) + min;
}; 