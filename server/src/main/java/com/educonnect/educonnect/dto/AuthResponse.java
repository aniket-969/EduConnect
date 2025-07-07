package com.educonnect.educonnect.dto;

public class AuthResponse {
	private final String token;

	// 1-arg constructor for `new AuthResponse(token)`
	public AuthResponse(String token) {
		this.token = token;
	}

	// getter for JSON serialization
	public String getToken() {
		return token;
	}
}

