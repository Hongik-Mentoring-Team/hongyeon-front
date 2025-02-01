// src/components/Login.js
import React from "react";

const LoginNew = () => {
  const handleSocialLogin = (provider) => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    // 백엔드에서 제공하는 OAuth 엔드포인트로 리다이렉트
    // 예: /oauth2/authorization/google 또는 /oauth2/authorization/naver
    window.location.href = `${backendUrl}/oauth2/authorization/${provider}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>
        <button
          className="w-full py-2 mb-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded"
          onClick={() => handleSocialLogin("google")}
        >
          구글 로그인
        </button>
        <button
          className="w-full py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded"
          onClick={() => handleSocialLogin("naver")}
        >
          네이버 로그인
        </button>
      </div>
    </div>
  );
};

export default LoginNew;
