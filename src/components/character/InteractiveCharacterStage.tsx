import { useEffect, useRef } from "react";
import "./InteractiveCharacterStage.css";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function InteractiveCharacterStage() {
  const artworkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const artwork = artworkRef.current;
    if (!artwork) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const smoothing = 14;
    const headSmoothing = 6;
    const bodySmoothing = 3.5;
    const tolerance = 0.01;
    const rotationTolerance = 0.005;
    let targetX = 0;
    let targetY = 0;
    let targetHeadX = 0;
    let targetHeadY = 0;
    let targetHeadRotation = 0;
    let targetBodyX = 0;
    let targetBodyY = 0;
    let currentX = 0;
    let currentY = 0;
    let currentHeadX = 0;
    let currentHeadY = 0;
    let currentHeadRotation = 0;
    let currentBodyX = 0;
    let currentBodyY = 0;
    let frameId: number | null = null;
    let lastFrameTime = 0;

    function writePosition() {
      artwork!.style.setProperty("--iris-x", `${currentX}px`);
      artwork!.style.setProperty("--iris-y", `${currentY}px`);
      artwork!.style.setProperty("--head-x", `${currentHeadX}px`);
      artwork!.style.setProperty("--head-y", `${currentHeadY}px`);
      artwork!.style.setProperty(
        "--head-rotation",
        `${currentHeadRotation}deg`,
      );
      artwork!.style.setProperty("--body-x", `${currentBodyX}px`);
      artwork!.style.setProperty("--body-y", `${currentBodyY}px`);
    }

    function isSettled() {
      return (
        Math.abs(targetX - currentX) <= tolerance &&
        Math.abs(targetY - currentY) <= tolerance &&
        Math.abs(targetHeadX - currentHeadX) <= tolerance &&
        Math.abs(targetHeadY - currentHeadY) <= tolerance &&
        Math.abs(targetHeadRotation - currentHeadRotation) <=
          rotationTolerance &&
        Math.abs(targetBodyX - currentBodyX) <= tolerance &&
        Math.abs(targetBodyY - currentBodyY) <= tolerance
      );
    }

    function animate(timestamp: number) {
      frameId = null;
      const deltaTime = Math.max(0, (timestamp - lastFrameTime) / 1000);
      lastFrameTime = timestamp;
      const alpha = 1 - Math.exp(-smoothing * deltaTime);
      const headAlpha = 1 - Math.exp(-headSmoothing * deltaTime);
      const bodyAlpha = 1 - Math.exp(-bodySmoothing * deltaTime);

      currentX += (targetX - currentX) * alpha;
      currentY += (targetY - currentY) * alpha;
      currentHeadX += (targetHeadX - currentHeadX) * headAlpha;
      currentHeadY += (targetHeadY - currentHeadY) * headAlpha;
      currentHeadRotation +=
        (targetHeadRotation - currentHeadRotation) * headAlpha;
      currentBodyX += (targetBodyX - currentBodyX) * bodyAlpha;
      currentBodyY += (targetBodyY - currentBodyY) * bodyAlpha;

      const settled = isSettled();

      if (settled) {
        currentX = targetX;
        currentY = targetY;
        currentHeadX = targetHeadX;
        currentHeadY = targetHeadY;
        currentHeadRotation = targetHeadRotation;
        currentBodyX = targetBodyX;
        currentBodyY = targetBodyY;
      }

      writePosition();

      if (!settled) {
        frameId = window.requestAnimationFrame(animate);
      }
    }

    function startAnimation() {
      if (frameId !== null || isSettled()) {
        return;
      }

      lastFrameTime = performance.now();
      frameId = window.requestAnimationFrame(animate);
    }

    function handlePointerMove(event: PointerEvent) {
      if (event.pointerType === "touch" || reducedMotion.matches) return;

      const rect = artwork!.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = event.clientX - centerX;
      const deltaY = event.clientY - centerY;
      const distanceX = deltaX < 0 ? centerX : window.innerWidth - centerX;
      const distanceY = deltaY < 0 ? centerY : window.innerHeight - centerY;
      const normalizedX = clamp(deltaX / Math.max(distanceX, 1), -1, 1);
      const normalizedY = clamp(deltaY / Math.max(distanceY, 1), -1, 1);
      const maxX = clamp(rect.width * 0.012, 2.5, 7);
      const maxY = clamp(rect.height * 0.004, 1.5, 4.5);
      const maxHeadX = clamp(rect.width * 0.009, 2, 6);
      const maxHeadY = clamp(rect.height * 0.003, 1, 4);
      const maxHeadRotation = 1.4;
      const maxBodyX = clamp(rect.width * 0.0035, 0.75, 2.5);
      const maxBodyY = clamp(rect.height * 0.0012, 0.4, 1.5);

      targetX = normalizedX * maxX;
      targetY = normalizedY * maxY;
      targetHeadX = normalizedX * maxHeadX;
      targetHeadY = normalizedY * maxHeadY;
      targetHeadRotation = normalizedX * maxHeadRotation;
      targetBodyX = normalizedX * maxBodyX;
      targetBodyY = normalizedY * maxBodyY;
      startAnimation();
    }

    function returnToNeutral() {
      targetX = 0;
      targetY = 0;
      targetHeadX = 0;
      targetHeadY = 0;
      targetHeadRotation = 0;
      targetBodyX = 0;
      targetBodyY = 0;
      startAnimation();
    }

    function handlePointerOut(event: PointerEvent) {
      if (event.pointerType !== "touch" && event.relatedTarget === null) {
        returnToNeutral();
      }
    }

    function handleMotionPreferenceChange() {
      if (!reducedMotion.matches) return;

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
        frameId = null;
      }

      targetX = 0;
      targetY = 0;
      targetHeadX = 0;
      targetHeadY = 0;
      targetHeadRotation = 0;
      targetBodyX = 0;
      targetBodyY = 0;
      currentX = 0;
      currentY = 0;
      currentHeadX = 0;
      currentHeadY = 0;
      currentHeadRotation = 0;
      currentBodyX = 0;
      currentBodyY = 0;
      writePosition();
    }

    writePosition();
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerout", handlePointerOut);
    window.addEventListener("blur", returnToNeutral);
    reducedMotion.addEventListener("change", handleMotionPreferenceChange);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerout", handlePointerOut);
      window.removeEventListener("blur", returnToNeutral);
      reducedMotion.removeEventListener("change", handleMotionPreferenceChange);

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      artwork.style.setProperty("--iris-x", "0px");
      artwork.style.setProperty("--iris-y", "0px");
      artwork.style.setProperty("--head-x", "0px");
      artwork.style.setProperty("--head-y", "0px");
      artwork.style.setProperty("--head-rotation", "0deg");
      artwork.style.setProperty("--body-x", "0px");
      artwork.style.setProperty("--body-y", "0px");
    };
  }, []);

  return (
    <div
      className="interactive-character"
      role="img"
      aria-label="Stylized interactive portfolio character"
    >
      <div className="interactive-character__artwork" ref={artworkRef}>
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
