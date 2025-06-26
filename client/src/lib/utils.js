import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const stringValidation = (min, max, fieldName) => {
  return z
    .string()
    .min(min, {
      message: `${fieldName} must be at least ${min} characters long.`,
    })
    .max(max, {
      message: `${fieldName} must be no more than ${max} characters long.`,
    });
};

const CLOUD_NAME = "dni3ccfha";

export function cld(publicId, options = {}) {
  const {
    width,
    height,
    crop    = "fill",
    quality = "auto",
    format  = "auto",
  } = options;

  // build the transformation string
  const transforms = [
    `c_${crop}`,
    width    ? `w_${width}`    : null,
    height   ? `h_${height}`   : null,
    `q_${quality}`,
    `f_${format}`,
  ]
    .filter(Boolean)
    .join(",");

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${publicId}`;
}
