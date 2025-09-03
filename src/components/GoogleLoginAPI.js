// src/components/GoogleLoginAPI.js
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";


const GoogleLoginAPI = () => {
  const handleSuccess = (credentialResponse) => {
    const idToken = credentialResponse.credential;
    console.log("Google ID Token:", idToken);

    // 디코딩된 사용자 정보 확인 (클라이언트 측에서 참고용)
    const decodedUserInfo = jwtDecode(idToken);
    console.log("Decoded User Info:", decodedUserInfo);

    // ID 토큰을 백엔드 서버로 전송
    sendTokenToServer(idToken);
  };

  const handleError = () => {
    console.log('Login Failed');
  };

  const sendTokenToServer = (idToken) => {
    fetch('http://localhost:8080/member/auth/google', { // Spring Boot 서버의 엔드포인트
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: idToken }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Server response:', data);
      // 서버로부터 받은 자체 토큰(JWT 등)을 저장하는 로직
      // 예: localStorage.setItem('userToken', data.token);
      // 로그인 성공 후 페이지 이동 등
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div>
      <h2>Google 로그인</h2>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </div>
  );
};

export default GoogleLoginAPI;