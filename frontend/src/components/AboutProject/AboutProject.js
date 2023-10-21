function AboutProject() {
  return (
      <section className="about-project" id="about-project">
        <h2 className="title">О проекте</h2>
        <div className="about-project__description-block">
          <div>
            <p className="about-project__description-title">Дипломный проект
              включал 5 этапов</p>
            <p className="about-project__description-text">Составление плана,
              работу над бэкендом,
              вёрстку, добавление функциональности и
              финальные доработки.</p>
          </div>
          <div>
            <p className="about-project__description-title">На выполнение
              диплома ушло 5 недель</p>
            <p className="about-project__description-text">У каждого этапа был
              мягкий и жёсткий
              дедлайн, которые нужно было соблюдать, чтобы
              успешно защититься.</p>
          </div>
        </div>
        <div className="about-project__duration">
          <div className="about-project__duration-element">
            <div className="about-project__weeks about-project__weeks_backend">1
              неделя
            </div>
            <p className="about-project__second-title">Back-end</p>
          </div>
          <div
              className="about-project__duration-element about-project__duration-element_frontend">
            <div
                className="about-project__weeks about-project__weeks_frontend">4
              недели
            </div>
            <p className="about-project__second-title">Front-end</p>
          </div>
        </div>
      </section>
  );
}

export default AboutProject;
