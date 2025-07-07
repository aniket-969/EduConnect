package com.educonnect.educonnect.dto;

public class AuthResponse {
	private final String token;
	private String message;

	public AuthResponse(String token) {
		this.token = token;
	}

	public AuthResponse(String token, String message) {
		this.token = token;
		this.message = message;
	}

	// getters
	public String getToken() {
		return token;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}
