import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import validator from 'validator';

function Login({ isOpen, email, setEmail, password, setPassword, handleLogin, handleRegister, onClose, handleSubmit, register,
errors, errorText }) {

    function handlePasswordChange(e) {
        setPassword(e.target.value)
    }

    function handleEmailChange(e) {
        setEmail(e.target.value)
    }

    const loginOpen = isOpen;

    const invalidPassword =  errors.password?.type === "required" || password === '';
    const inValidEmail = errors.email?.type === "required" || errors.email?.type === "isEmail" || email === '';
    const isInvalid = invalidPassword || inValidEmail;

    return (
       <PopupWithForm 
       name="login"
       title="Вход"
       submitButtonText="Войти"
       isOpen={isOpen}
       text="Зарегистрироваться"
       handleLogin={handleLogin}
       loginOpen={loginOpen}
       onClose={onClose}
       handleRegister={handleRegister}
       popupWithoutButton={false}
       handleSubmit={handleSubmit}
       isInvalid={isInvalid}
       errorText={errorText}
       children={
        <>
        <div className="popup__field">
            <p className="popup__label">Email</p>
            <input className="popup__item" type="email" name="email"
                placeholder="Введите адрес электронной почты" value={email} onChange={handleEmailChange}
                ref={register({
                    required: true,
                    validate: {
                        isEmail: (value) =>
                            validator.isEmail(value),
                    },
                })
                }
                 />
                 <span className="popup__item-error">
                            {errors.email?.type === "required" && 'Это поле обязательно для заполнения'}
                            {errors.email?.type === "isEmail" && 'Неправильный формат email'}
                        </span>
                 
        </div>
        <div className="popup__field">
        <p className="popup__label">Пароль</p>
            <input className="popup__item" type="password" name="password"
                placeholder="Введите пароль" value={password} onChange={handlePasswordChange}
                ref={register({
                    required: true,
                })}
                 />
                 <span className="popup__item-error">
                            {errors.password?.type === "required" && 'Это поле обязательно для заполнения'}
                        </span>
        </div>
        </>
       }/>
    )
}

export default Login;
