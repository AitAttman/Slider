import type Slider from "./slider";
import "./slider.css";
import "./style.css";
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
});
