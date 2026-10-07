import "./InteractiveCharacterStage.css";

function InteractiveCharacterStage() {
  return (
    <div
      className="interactive-character"
      role="img"
      aria-label="Stylized interactive portfolio character"
    >
      <div className="interactive-character__artwork">
        <img
          className="interactive-character__body"
          src="/images/character/body.png"
          alt=""
          aria-hidden="true"
          draggable={false}
        />

        <div className="interactive-character__head-group" aria-hidden="true">
          <img
            className="interactive-character__head"
            src="/images/character/head.png"
            alt=""
            draggable={false}
          />

          <img
            className="interactive-character__iris interactive-character__iris--left"
            src="/images/character/eye-left-iris.png"
            alt=""
            draggable={false}
          />

          <img
            className="interactive-character__iris interactive-character__iris--right"
            src="/images/character/eye-right-iris.png"
            alt=""
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}

export default InteractiveCharacterStage;
