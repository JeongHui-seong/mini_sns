import LoginCss from '../pages/login.module.css';
import { inputValidation } from '../hooks/inputValidation';
import { useEffect } from 'react';

import axios from 'axios';

const SignupForm = ({change}) => {
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 연결
        try {
            // 백엔드에 회원가입 요청 보내기
            const response = await axios.post('/api/member/join', {
                email: emailValidation.value,
                password: passwordValidation.value,
                nickname: nicknameValidation.value
            });
            
            alert(response.data); // "회원가입이 완료되었습니다."
            change("login");      // 로그인 창으로 전환
        } catch (error) {
            console.error('회원가입 실패:', error.response?.data || error.message);
            alert('회원가입에 실패했습니다.');
        }
    };

    const checkEmail = async () => {
        try {
            const res = await axios.get(`/api/member/check?email=${emailValidation.value}`);
            console.log("중복확인 응답값:", res.data);

            if (res.data === true) {
                alert('이미 가입된 이메일 입니다.');
            } else{
                alert('사용 가능한 이메일 입니다.');
            }            
        } catch (err) {
            alert('중복확인에 실패했습니다.');
            console.error("checkEmail 오류:", err.response?.data || err.message)
        }
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;  // 일반적인 이메일 형식
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{4,}$/; // 4글자 이상, 영어와 숫자 조합
    const nicknameRegex = /\S+/;    // 공백이 아닌 문자열

    // 이메일 조건
    const emailValidation = inputValidation(emailRegex);
    // 비밀번호 조건
    const passwordValidation = inputValidation(passwordRegex);
    // 비밀번호 확인 조건
    const passwordConfirmValidation = inputValidation();
    // 닉네임 확인 조건
    const nicknameValidation = inputValidation(nicknameRegex);

    // 비밀번호 확인 로직
    useEffect(() => {
        passwordConfirmValidation.setIsValid(
            passwordValidation.value === passwordConfirmValidation.value);
    },[passwordConfirmValidation.value, passwordValidation.value]);

    return (
        <div className={LoginCss.forms}>
            <h2 className={LoginCss.title}>회원가입</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email" className={LoginCss.lbl_email}>이메일</label>
                <div className={LoginCss.email_container}>
                    <input value={emailValidation.value} onChange={emailValidation.onChange} type="email" id="email" name="email" required className={`${LoginCss.inp} ${LoginCss.inp_signup_email}`} placeholder='example@example.com'/>
                    <button disabled={!emailValidation.isValid} type="button"  onClick={checkEmail} className={`${LoginCss.btn} ${LoginCss.check_btn}`}>중복확인</button>
                </div>
                {!emailValidation.isValid && <p className={LoginCss.val_error}>이메일 형식을 맞춰주세요.</p>}
                <label htmlFor="password" className={LoginCss.lbl}>비밀번호</label>
                <input value={passwordValidation.value} onChange={passwordValidation.onChange} type="password" id='password' name='password' required className={LoginCss.inp} />
                {!passwordValidation.isValid && <p className={LoginCss.val_error}>영어와 숫자를 조합해 4글자 이상 써주세요.</p>}
                <label htmlFor="password" className={LoginCss.lbl}>비밀번호 확인</label>
                <input value={passwordConfirmValidation.value} onChange={passwordConfirmValidation.onChange} type="password" id='password' name='password' required className={LoginCss.inp} />
                {!passwordConfirmValidation.isValid && <p className={LoginCss.val_error}>작성하신 비밀번호와 일치하지 않습니다.</p>}
                <label htmlFor="nickname" className={LoginCss.lbl}>닉네임</label>
                <input value={nicknameValidation.value} onChange={nicknameValidation.onChange} type="text" id='nickname' name='nickname' required className={LoginCss.inp} />
                <button disabled={!emailValidation.isValid || !passwordValidation.isValid || !passwordConfirmValidation.isValid || !nicknameValidation.isValid} type="submit" className={`${LoginCss.btn} ${LoginCss.login_btn}`}>회원가입</button>
            </form>
            <div className={LoginCss.go_login_container} onClick={() => change("login")}>
                <span className={LoginCss.go_login}>로그인창으로 돌아가기</span>
            </div>
        </div>
    );
}

export default SignupForm;