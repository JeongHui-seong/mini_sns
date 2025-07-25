import axios from 'axios';

// 회원가입 요청
export const signupUser = async ({ email, password, nickname }) => {
  const response = await axios.post('/api/member/join', {
    email,
    password,
    nickname
  });
  return response.data; // 성공 시 메시지 반환
};

// 이메일 중복확인 요청
export const checkEmailDuplication = async (email) => {
  const response = await axios.get(`/api/member/check?email=${email}`);
  return response.data; // true 또는 false 반환
};
