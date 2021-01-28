import React, { useState, useEffect } from 'react';
import { Route, Switch, withRouter, useHistory } from 'react-router-dom';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import NewsCardList from '../NewsCardList/NewsCardList.js';
import About from '../About/About.js';
import Footer from '../Footer/Footer.js';
import { CurrentUserContext, initialUser } from '../../context/CurrentUserContext.js';
import { CurrentCardContext, initiaCards } from '../../context/CurrentCardContext.js';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader.js';
import SavedNews from '../SavedNews/SavedNews.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import InfoTooltip from '../InfoTooltip/InfoTooltip.js';
import { useForm } from 'react-hook-form';

function App() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(initialUser);
    const [cards, setCards] = useState(initiaCards);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [popupRegisterOpen, setPopupRegisterOpen] = useState(false);
    const [popupLoginOpen, setPopupLoginOpen] = useState(false);
    const [registerOk, setRegisterOk] = useState(false);
    const [mobileView, setMobileView] = useState(false)
    const history = useHistory();

    const { register, errors, handleSubmit, clearErrors } = useForm({
        reValidateMode: 'onBlur',
        mode: 'onBlur',
    });

    const {
        register: regLogin,
        errors: errLogin,
        handleSubmit: submitLogin,
        clearErrors: clearErrorsLogin,
    } = useForm({
        reValidateMode: 'onBlur',
        mode: 'onBlur',
    });

    function handleSaveArtical(card) {
        console.log('You can save this artical')
    }

    function handleRegister(e) {
        e.preventDefault()
        setMobileView(false)
        setPopupLoginOpen(false)
        setPopupRegisterOpen(true);
        setEmail('');
        setPassword('');
        setName('');
    }

    function handleLogin(e) {
        e.preventDefault()
        setPopupRegisterOpen(false)
        setRegisterOk(false)
        setPopupLoginOpen(true);
    }

    function closeAllPopups() {
        clearErrors()
        clearErrorsLogin()
        setPopupLoginOpen(false)
        setPopupRegisterOpen(false)
        setRegisterOk(false)
    }

    function showRegisterOk() {
        setPopupRegisterOpen(false)
        setRegisterOk(true);
    }

    useEffect(() => {
        function handleEsc(evt) {
            if (evt.key === 'Escape') {
                closeAllPopups()
            }
        }
        document.addEventListener('keydown', handleEsc)
        return () => window.removeEventListener('keydown', handleEsc)
    }, [])

    function handleSubmitRegister() {
        console.log('Register')
        showRegisterOk()
    }

    function handleSubmitLogin() {
        setLoggedIn(true);
        closeAllPopups();
    }

    function handleLogOut() {
        setLoggedIn(false);
        history.push('/');
    }

    function handleMobileView() {
        setMobileView(true)
    }

    function handleInfoClose() {
        setMobileView(false)
    }

    return (
        <>
            <div className="root" >

                <Switch>

                    <CurrentUserContext.Provider value={currentUser} >
                        <CurrentCardContext.Provider value={cards}>

                            <Header
                                loggedIn={loggedIn}
                                handleRegister={handleRegister}
                                handleLogOut={handleLogOut}
                                handleMobileView={handleMobileView}
                                handleInfoClose={handleInfoClose}
                                mobileView={mobileView} 
                                popupRegisterOpen={popupRegisterOpen}
                                onClose={closeAllPopups}
                                popupLoginOpen={popupLoginOpen}/>

                            <Route exact path='/'>
                                <Main />
                                <NewsCardList handleClick={handleSaveArtical}
                                    loggedIn={loggedIn}
                                    setCards={setCards}
                                />
                                <About />
                            </Route>

                            <Route path='/saved-news'>
                                <SavedNewsHeader />
                                <SavedNews />
                            </Route>

                            <Footer />
                            
                            <Register
                                email={email}
                                setEmail={setEmail}
                                password={password}
                                setPassword={setPassword}
                                name={name}
                                setName={setName}
                                isOpen={popupRegisterOpen}
                                onClose={closeAllPopups}
                                handleLogin={handleLogin}
                                showRegisterOk={showRegisterOk}
                                register={register}
                                errors={errors}
                                handleSubmit={handleSubmit(handleSubmitRegister)}
                            />

                            <Login
                                email={email}
                                setEmail={setEmail}
                                password={password}
                                setPassword={setPassword}
                                isOpen={popupLoginOpen}
                                handleLogin={handleLogin}
                                handleRegister={handleRegister}
                                onClose={closeAllPopups}
                                register={regLogin}
                                errors={errLogin}
                                handleSubmit={submitLogin(handleSubmitLogin)}
                            />

                            <InfoTooltip
                                registerText="Пользователь успешно зарегистрирован!"
                                isOpen={registerOk}
                                onClose={closeAllPopups}
                                handleLogin={handleLogin}>
                            </InfoTooltip>

                        </CurrentCardContext.Provider>
                    </ CurrentUserContext.Provider >

                </Switch>
            </div>
        </>
    )
}

export default withRouter(App);
