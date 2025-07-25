import LoginCss from '../pages/login.module.css';
import circle1 from '../assets/img/logincircle1.webp';
import circle2 from '../assets/img/logincircle2.webp';
import circle3 from '../assets/img/logincircle3.webp';
import circle4 from '../assets/img/logincircle4.webp';
import circle5 from '../assets/img/logincircle5.webp';
import circle6 from '../assets/img/logincircle6.webp';
import googleIcon from '../assets/img/googleicon.webp';
import kakaoIcon from '../assets/img/kakaoicon.webp';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import { AuthContext } from '../contexts/AuthContext';

export const circles = [circle1, circle2, circle3, circle4, circle5, circle6];

const LoginForm = ({ change }) => {
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext)

    const handleLogin = async () => {
        try{
            const res = await login(email, pw);
            setUser(res.data.email);
            navigate("/");
        } catch (err) {
            console.log(err)
            alert(err.response.data);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin();
    }

    return (
        <div className={LoginCss.forms}>
            <form onSubmit={handleSubmit}>
                <h2 className={LoginCss.title}>환영합니다</h2>
                <p className={LoginCss.subtitle}>로그인 후 이용 가능합니다.</p>
                <label htmlFor="email" className={LoginCss.lbl_email}>이메일</label>
                <input type="email" id="email" name="email" required className={LoginCss.inp} onChange={(e) => setEmail(e.target.value)} placeholder='example@example.com' />
                <div className={LoginCss.pw_container}><label htmlFor="password">비밀번호</label>
                    <p className={LoginCss.go_find_pw}>비밀번호 찾기</p>
                </div>
                <input type="password" id="password" name="password" required className={LoginCss.inp} onChange={(e) => setPw(e.target.value)} />
                <button type="submit" className={`${LoginCss.login_btn} ${LoginCss.btn}`}>로그인</button>
            </form>
            <div className={LoginCss.signup_container}>계정이 없으신가요?
                <p className={LoginCss.go_signup} onClick={() => change("signup")}>계정만들기</p>
            </div>
            <div className={LoginCss.line}></div>
            <div className={LoginCss.social_container}>
                <button className={`${LoginCss.btn} ${LoginCss.oauth_google}`}><img src={googleIcon} />구글로 로그인</button>
                <button className={`${LoginCss.btn} ${LoginCss.oauth_kakao}`}><img src={kakaoIcon} />카카오로 로그인</button>
            </div>
        </div>

    );
}

export default LoginForm;