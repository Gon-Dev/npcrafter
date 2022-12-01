import "./Main.css";
function Main() {
  return (
    <main className="main-wrapper">
      <div className="hero-wrapper">
        <aside className="hero-title-wrapper rpgui-container framed-golden">
          <h1 className="hero-title">Characters.</h1>
          <h1 className="hero-title">Done Right.</h1>
        </aside>

        <aside className="hero-description-wrapper">
          <p className="hero-description-text">
            NpCrafter is a place to create and manage your npcs easily.
          </p>
          <button className="rpgui-button hero-description-button">Start crafting</button>
        </aside>
      </div>

      <aside className="hero-questions-wrapper">
        <div className="question-wrapper question-wrapper-one rpgui-container framed-golden-2">
          <p className="question">Hey Dungeon Master! Are your <a target="_blank" href="https://letmegooglethat.com/?q=non+playable+character">npcs</a> souless and boring as hell?</p>
        </div>
        <div className="question-wrapper question-wrapper-two rpgui-container framed-golden-2">
          <p className="question">Would you like to have cool images to illustrate them?</p>
        </div>
        <div className="question-wrapper question-wrapper-three rpgui-container framed-golden-2">
          <p className="question">
            Stop improvising them on the fly, come and craft em' in a fun way!
          </p>
        </div>
      </aside>
    </main>
  );
}

export default Main;
