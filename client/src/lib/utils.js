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

const CLOUD__NAME = "dmt0faojk";
export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "educonnect_uploads"); 
  formData.append("folder", "course/thumbnail"); 

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD__NAME}/image/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to upload image to Cloudinary");

  const data = await res.json();
  return data.secure_url; 
};

