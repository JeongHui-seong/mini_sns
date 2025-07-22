import LoginCss from './login.module.css';
import circle1 from '../assets/img/logincircle1.png';
import circle2 from '../assets/img/logincircle2.png';
import circle3 from '../assets/img/logincircle3.png';
import circle4 from '../assets/img/logincircle4.png';
import circle5 from '../assets/img/logincircle5.png';
import circle6 from '../assets/img/logincircle6.png';

const circles = [circle1, circle2, circle3, circle4, circle5, circle6];

const Login = () => {
    const handleSubmit = (e) => {
        e.prevenDefault();
    }

  return (
    <div className={LoginCss.login_container}>
        {circles.map((circle, index) => (
            <img
                key={index}
                src={circle}
                alt={`circle${index + 1}`}
                className={`${LoginCss[`circle${index + 1}`]} ${LoginCss.circle}`}
            ></img>
        ))}
        <form onSubmit={handleSubmit} className={LoginCss.login_form}>
            <h2>환영합니다</h2>
            <p>로그인 후 이용 가능합니다.</p>
            <label htmlFor="email" className={LoginCss.lbl_email}>이메일</label>
            <input type="email" id="email" name="email" required />
            <div className={LoginCss.pw_container}><label htmlFor="password">비밀번호</label>
            <p className={LoginCss.go_find_pw}>비밀번호 찾기</p>
            </div>
            <input type="password" id="password" name="password" required />
            <button type="submit" className={LoginCss.login_btn}>로그인</button>
            <div className={LoginCss.signup_container}>계정이 없으신가요?
                <p className={LoginCss.go_signup}>계정만들기</p>
            </div>
            <div className={LoginCss.line}></div>
            <div className={LoginCss.social_container}>
                <button className={LoginCss.social_btn}>구글로 로그인</button>
                <button className={LoginCss.social_btn}>카카오로 로그인</button>
            </div>
        </form>
    </div>
  );
}

export default Login;