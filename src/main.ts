import type Slider from "./slider";
import "./slider.scss";
import "./style.scss";
declare global {
  interface Window {
    Slider: typeof Slider;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const { default: Slider } = await import("./slider");
  const containers: NodeListOf<HTMLDivElement> =
    document.querySelectorAll(".slider");
  containers.forEach((s) => Slider(s));
  window.Slider = Slider;
});
