import LoginForm from '../components/LoginForm.jsx';
import SignupForm from '../components/SignupForm.jsx';
import circle1 from '../assets/img/logincircle1.webp';
import circle2 from '../assets/img/logincircle2.webp';
import circle3 from '../assets/img/logincircle3.webp';
import circle4 from '../assets/img/logincircle4.webp';
import circle5 from '../assets/img/logincircle5.webp';
import circle6 from '../assets/img/logincircle6.webp';
import LoginCss from './login.module.css';
import { useState } from 'react';

const circles = [circle1, circle2, circle3, circle4, circle5, circle6];

const Login = () => {
    const [currentTab, setCurrentTab] = useState("login");

    // 조건에 따라 로그인 폼과 회원가입 폼을 전환하는 함수
    const changeTab = () => {
        switch (currentTab) {
            case "login" :
                return <LoginForm change={setCurrentTab}/>;
            case "signup" :
                return <SignupForm change={setCurrentTab}/>;
            default:
                return null;
        }
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
            {changeTab()}
        </div>
    );
}

export default Login;