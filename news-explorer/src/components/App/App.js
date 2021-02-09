import React, { useState, useEffect } from 'react';
import { Route, Switch, withRouter, useHistory } from 'react-router-dom';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import NewsCardList from '../NewsCardList/NewsCardList.js';
import About from '../About/About.js';
import Footer from '../Footer/Footer.js';
import { CurrentUserContext } from '../../context/CurrentUserContext.js';
import { CurrentCardContext, initiaCards } from '../../context/CurrentCardContext.js';
import ProtectedRoute from '../ProtectedRoute/protectedRoute.js';
import SavedNews from '../SavedNews/SavedNews.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import InfoTooltip from '../InfoTooltip/InfoTooltip.js';
import { useForm } from 'react-hook-form';
import NewsApi from '../../utils/NewsApi';
import * as MainApi from '../../utils/MainApi.js';

function App() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState('');
    const [savedCards, setSavedCards] = useState([]);
    const [cards, setCards] = useState(initiaCards);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [popupRegisterOpen, setPopupRegisterOpen] = useState(false);
    const [popupLoginOpen, setPopupLoginOpen] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [registerOk, setRegisterOk] = useState(false);
    const [mobileView, setMobileView] = useState(false);
    const [search, setSearch] = useState('');
    const [load, setLoad] = useState(false);
    const [errReq, setErrReq] = useState(false);
    const [newsNotFound, setNewsNotFound] = useState(false);
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

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if(loggedIn===false) {
            if (history.location.state && history.location.state.noAuthRedirected && history.action === "REPLACE") {
                setPopupLoginOpen(true)
            }
        }
        
        if (token) {
            MainApi.getContent(token)
                .then((user) => {
                    setLoggedIn(true);
                    setCurrentUser(user);
                });
            
            MainApi.getArticle(token)
            .then((items) => {
                setSavedCards(items)
            })
        }

        const articles = JSON.parse(localStorage.getItem('articles'));
        if (articles) {
            setCards(articles)
        }

        function handleEsc(evt) {
            if (evt.key === 'Escape') {
                closeAllPopups()
            }
        }
        document.addEventListener('keydown', handleEsc)
        return () => window.removeEventListener('keydown', handleEsc)
    }, [])

    function handleSaveArtical(card) {
        if(loggedIn===false) {
            setPopupRegisterOpen(true)
        } else {
            const token = localStorage.getItem('jwt');
            MainApi.saveArticle(card, token)
            .then((savedCard) => {
                setSavedCards([...savedCards, savedCard])
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    function handleDeleteArticle(card) {
        const token = localStorage.getItem('jwt');
        MainApi.deleteArticle(card, token)
        .then(() => {
            const newCards = savedCards.filter((item) => {
                return item._id !== card
            });
            setSavedCards(newCards)
            console.log(newCards)
        })
        .catch(err => {
            console.log(err)
        })
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
        setErrorText('')
        setPopupLoginOpen(false)
        setPopupRegisterOpen(false)
        setRegisterOk(false)
    }

    function showRegisterOk() {
        setPopupRegisterOpen(false)
        setRegisterOk(true);
    }

    function handleSubmitRegister() {
        MainApi.register(email, password, name)
            .then((res) => {
                if (res) {
                    console.log(res)
                    showRegisterOk(true);
                    setCurrentUser(res)
                    setErrorText('')
                }
            })
            .catch((err) => {
                if(err==='Ошибка: 409') {
                    setErrorText('Такой пользователь уже существует')
                } if (err==='Ошибка: 400')
                    setErrorText('На сервере произошла ошибка, попробуйте позднее')
            })
    }

    function handleSubmitLogin() {
        MainApi.authorize(email, password)
            .then((data) => {
                localStorage.setItem('jwt', data.token)
                if (data.token) {
                    setLoggedIn(true);
                    closeAllPopups();
                    setErrorText('')
                }
            })
            .catch((err) => {
                if (err === 'Ошибка: 400') {
                    setErrorText('Неверный email или пароль')
                }
                if (err === 'Ошибка: 401') {
                    setErrorText('Пользователь с email не найден')
                }
            })
    }

    function handleLogOut() {
        setLoggedIn(false);
        setSavedCards([])
        localStorage.clear();
        history.push('/');
    }

    function handleMobileView() {
        setMobileView(true)
    }

    function handleInfoClose() {
        setMobileView(false)
    }

    function handleSearchSubmit(e) {
        e.preventDefault();
        setNewsNotFound(false);
        setErrReq(false);
        setLoad(true);
        NewsApi.getNews(search)
        .then((data) => {
            const cardsList = data.articles.map((item, index) => ({
                id: index,
                keyword: search,
                title: item.title,
                text: item.description,
                date: new Date(`${item.publishedAt}`).toLocaleString('ru', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }),
                source: item.source.name,
                link: item.url,
                image: item.urlToImage,
            }));
            setCards(cardsList);
            localStorage.setItem('articles', JSON.stringify(cardsList))
            localStorage.setItem('searchText', search)
            setLoad(false);

            if (data.articles.length === 0) {
                setNewsNotFound(true)
            }
        })
        .catch((err) => {
            setLoad(false)
            setErrReq(true)
            console.log(err)
        })
        
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
                                <Main 
                                    search={search}
                                    setSearch={setSearch}
                                    handleSearchSubmit={handleSearchSubmit}
                                />
                                <NewsCardList 
                                    handleClick={handleSaveArtical}
                                    loggedIn={loggedIn}
                                    setCards={setCards}
                                    load={load}
                                    errReq={errReq}
                                    newsNotFound={newsNotFound}
                                />
                                <About />
                            </Route>

                            <ProtectedRoute path="/saved-news"
                                isLoggedIn={loggedIn} 
                                cards={savedCards}
                                handleDeleteClick={handleDeleteArticle}
                                component={SavedNews}
                            />

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
                                errorText={errorText}
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
                                errorText={errorText}
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
