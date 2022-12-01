import "./Main.css";
import star from "../../../assets/star-home.svg";
import heroDescriptionShape from "../../../assets/hero-description-shape.svg";
import heroQuestionsShape from "../../../assets/hero-questions-shape.svg";
function Main() {
  return (
    <main className="main-wrapper">
      <div className="hero-wrapper">
        <aside className="hero-title-wrapper">
          <img className="hero-star" src={star} alt="magenta star" />
          <h1 className="hero-title">Characters.</h1>
          <h1 className="hero-title">Done Right.</h1>
        </aside>

        <aside className="hero-description-wrapper">
          <img className="hero-description-background" src={heroDescriptionShape} alt="" />
          <p className="hero-description-text">
            NpCrafter is a place to create and manage your npcs easily.
            <br />
            Bring them to life with Magic the Gathering illustrations!
          </p>
        </aside>
      </div>

      <aside className="hero-questions-wrapper">
        <img className="hero-questions-background" src={heroQuestionsShape} alt="" />
        <div className="question-wrapper question-wrapper-one">
          <p className="question">Do you love tabletop roleplaying games?</p>
        </div>
        <div className="question-wrapper question-wrapper-two">
          <p className="question">Do you have cool illustrations for them?</p>
        </div>
        <div className="question-wrapper question-wrapper-three">
          <p className="question">Are your NPCs ready to interact with your players?</p>
        </div>
      </aside>
    </main>
  );
}

export default Main;
