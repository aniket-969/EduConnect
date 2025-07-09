package com.educonnect.educonnect.dto;

public class AuthResponse {
	private final String token;
	private final UserDTO user;
	private String message;

	public AuthResponse(String token, UserDTO user) {
		this.token = token;
		this.user  = user;
	}


	public AuthResponse(String token, UserDTO user, String message) {
		this(token, user);
		this.message = message;
	}

	public String getToken() {
		return token;
	}


	public UserDTO getUser() {
		return user;
	}

	public String getMessage() {
		return message;
	}


	public void setMessage(String message) {
		this.message = message;
	}
}
