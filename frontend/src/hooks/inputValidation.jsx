import { useState } from 'react';

// input값과 정규식으로 유효성 검사하는 커스텀 훅
export const inputValidation = (regex) => {
    const [value, setValue] = useState('');
    const [isValid, setIsValid] = useState(false);

    const onChange = (e) => {
        const val = e.target.value;
        setValue(val);
        if (regex) setIsValid(regex.test(val)); // regex가 없으면 빈 문자열을 허용하는 유효성 검사
    };

    return { value, isValid, onChange, setIsValid };
}