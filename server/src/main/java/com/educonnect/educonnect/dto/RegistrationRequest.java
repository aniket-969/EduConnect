package com.educonnect.educonnect.dto;

import com.educonnect.educonnect.Role;
import lombok.Data;
import javax.validation.constraints.*;

@Data
public class RegistrationRequest {
    @NotBlank
    private String name;

    @Email @NotBlank
    private String email;

    @NotBlank
    private String password;

    @NotNull
    private Role role;

    // optional
    private String bio;
}
