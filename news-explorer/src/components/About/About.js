import React from 'react';
import photo from '../../images/about__photo.jpg';


function About() {

    return (
            <section className="about">
                <img className="about__photo" src={photo} alt="Фотография пользователя" />
                <div className="about__info">
                    <h2 className="about__header">Об авторе</h2>
                    <div className="about__text-field">
                        <p className="about__text">Это блок с описанием автора проекта. Здесь следует указать, как вас зовут,
                чем вы занимаетесь, какими технологиями разработки владеете. </p>
                        <p className="about__text">Также можно рассказать о процессе обучения в Практикуме, чему вы тут научились,
                и чем можете помочь потенциальным заказчикам.</p>
                    </div>
                </div>
            </section>
    )
}

export default About;
