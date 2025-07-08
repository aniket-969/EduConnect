package com.educonnect.educonnect.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public CloudinaryService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    /**
     * Uploads the given file to Cloudinary and returns the secure URL.
     */
    public String uploadAvatar(MultipartFile file) throws IOException {
        Map<?,?> result = cloudinary.uploader()
                .upload(file.getBytes(),
                        ObjectUtils.asMap("folder", "educonnect/avatars"));
        // secure_url is typically returned
        return result.get("secure_url").toString();
    }
}
