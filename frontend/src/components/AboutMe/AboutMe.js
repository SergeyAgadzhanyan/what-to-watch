import {Link} from 'react-router-dom';
import avatar from '../../images/avatar.jpeg';
import Portfolio from '../Portfolio/Portfolio';

function aboutMe() {
  return (
      <section className="about-me" id="about-me">
        <h2 className="title">Студент</h2>
        <div className="about-me__content">
          <div>
            <p className="about-me__name">Виталий</p>
            <p className="about-me__skills">Фронтенд-разработчик, 30 лет</p>
            <p className="about-me__description">Я родился и живу в Саратове,
              закончил факультет
              экономики
              СГУ. У меня есть жена
              и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно
              начал кодить. С 2015 года
              работал в компании «СКБ Контур». После того, как прошёл курс по
              веб-разработке, начал
              заниматься фриланс-заказами и ушёл с постоянной работы.</p>
            <Link to="https://github.com/GulshatG"
                  className="about-me__github animate-opacity">Github</Link>
          </div>
          <img src={avatar} alt="avatar" className="about-me__avatar"/>
        </div>
        <Portfolio/>
      </section>
  );
}

export default aboutMe;
