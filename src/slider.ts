type SliderConfig = {
  navDots?: boolean;
  interval?: number;
  autoplay?: boolean;
  navButtons?: boolean;
  visibleSlides?: number;
  [key: string]: any;
};
export default function Slider(
  container: HTMLDivElement | string = ".slider",
  config: SliderConfig = {},
): { destroy: () => void } | null {
  const slider: HTMLDivElement | null =
    typeof container === "string"
      ? document.querySelector(container)
      : container;
  if (!slider) {
    console.error("slider container does not exist");
    return null;
  }

  const slidesContainer: HTMLDivElement | null =
    slider.querySelector(".slides");
  let slides = slider.querySelectorAll(".slide");
  let prevBtn: HTMLButtonElement | null = null;
  let nextBtn: HTMLButtonElement | null = null;
  let dots: HTMLDivElement | null = null;
  let currentIndex = 0;
  let currentPosition = 0;
  const originalSlidesCount = slides.length;
  let totalSlides = originalSlidesCount;
  let touchStartX = 0;
  let touchEndX = 0;
  let autoplayInterval: number | null;
  let isMovingByTouch = false;
  let isMoving = false;
  // track mouse to move slider with left and right arrows on desktop:
  let mouseInside = false;
  const currentConfig: SliderConfig = {
    navDots: true,
    interval: 3000,
    autoplay: false,
    navButtons: true,
    visibleSlides: 1,
  };
  // load configuration from slider dataset
  for (const [k, v] of Object.entries(slider.dataset)) {
    if (k === "navDots") currentConfig.navDots = v !== "false";
    if (k === "autoplay") currentConfig.autoplay = v === "true";
    if (k === "navButtons") currentConfig.navButtons = v !== "false";
    if (k === "interval") currentConfig.interval = Number(v || 3000);
    if (k === "visibleSlides") currentConfig.visibleSlides = Number(v || 1);
  }
  const direction =
    slider.getAttribute("dir") || getComputedStyle(slider).direction;
  const rtlFactor = direction === "rtl" ? -1 : 1;
  // if config parameter is not empty, override currentConfing
  if (Object.keys(config).length > 0) {
    for (const [k, v] of Object.entries(config)) {
      currentConfig[k] = v;
    }
  }
  let visibleSlides =
    currentConfig.visibleSlides && currentConfig.visibleSlides > 1
      ? currentConfig.visibleSlides
      : 1;
  const cloneSlides = () => {
    if (originalSlidesCount <= 1) return;
    //prepend last slides
    for (let i = 0; i < visibleSlides; i++) {
      if (originalSlidesCount - i > 0) {
        const slide: HTMLDivElement = slides[
          originalSlidesCount - i - 1
        ]?.cloneNode(true) as HTMLDivElement;
        slide?.classList.add("clone");
        if (slide) slidesContainer?.prepend(slide);
      }
    }
    // prepend slides
    for (let i = 0; i <= visibleSlides; i++) {
      const slide: HTMLDivElement = slides[i]?.cloneNode(
        true,
      ) as HTMLDivElement;
      slide?.classList.add("clone");
      if (slide) slidesContainer?.append(slide);
    }
    totalSlides = slidesContainer?.querySelectorAll(".slide").length || 0;
  };
  const updateDotState = (index: number) => {
    if (!currentConfig.navDots) return;
    dots?.querySelector(".current")?.classList.remove("current");
    dots?.querySelector(`[data-index="${index}"]`)?.classList.add("current");
  };

  const createDots = () => {
    if (!currentConfig.navDots) return;
    // remove old
    slider?.querySelector(".dots")?.remove();
    let c = document.createElement("div");
    c.classList.add("dots");
    for (let i = 0; i < Math.ceil(originalSlidesCount / visibleSlides); i++) {
      let dot = document.createElement("span");
      // i === 1 not 0 because 1 is the index of real first slide not cloned one
      if (i === 1) dot.classList.add("current");
      dot.setAttribute("data-index", i.toString());
      c.appendChild(dot);
    }
    slider.appendChild(c);
    dots = c;
    if (originalSlidesCount >= 2)
      dots.addEventListener("click", (ev) => {
        let target: HTMLElement | null = ev.target as HTMLElement;
        if (!target || target.tagName.toLowerCase() !== "span") return;
        let index = Number(target.dataset.index);
        // currentIndex = index
        if (currentIndex !== index) {
          updateDotState(index);
          currentIndex = index;
          moveSlider(true);
        }
      });
  };
  const createNavBtns = () => {
    if (!currentConfig.navButtons || originalSlidesCount < 2) return;
    const createBtn = (className: string) => {
      let btn = document.createElement("button");
      btn.classList.add(className);
      slider.appendChild(btn);
      return btn;
    };
    if (!(prevBtn = slider.querySelector(".prev"))) prevBtn = createBtn("prev");
    if (!(nextBtn = slider.querySelector(".next"))) nextBtn = createBtn("next");
    prevBtn?.addEventListener("click", () => {
      movePrev();
    });
    nextBtn?.addEventListener("click", () => {
      moveNext();
    });
  };
  const startAutoPlay = () => {
    if (autoplayInterval) return;
    autoplayInterval = setInterval(() => {
      currentIndex = currentIndex + visibleSlides;
      if (currentIndex > totalSlides) currentIndex = visibleSlides;
      moveNext();
    }, currentConfig.interval);
  };
  const stopAutoPlay = () => {
    if (autoplayInterval) clearInterval(autoplayInterval);
    autoplayInterval = null;
  };
  const onTransitionend = () => {
    if (currentIndex < visibleSlides) {
      currentIndex = currentIndex + originalSlidesCount;
      moveSlider(false);
    } else if (currentIndex >= originalSlidesCount + 1) {
      // If we landed on the "Start Clones" at the end
      currentIndex = currentIndex - originalSlidesCount;
      moveSlider(false);
    }
    isMoving = false;
  };
  const onTouchstart = (ev: TouchEvent) => {
    touchStartX = ev.touches[0].clientX;
    touchEndX = touchStartX;
  };
  const onTouchmove = (ev: TouchEvent) => {
    // if (isMoving) return;
    if (!slidesContainer || totalSlides < 2) return;
    touchEndX = ev.touches[0].clientX;
    const swipDistance = touchStartX - touchEndX;
    const percentage = (swipDistance / slider.offsetWidth) * 100;
    const move = currentPosition - percentage;

    slidesContainer.style.transition = `none`;
    slidesContainer.style.transform = `translateX(${move}%)`;
  };
  const onTouchend = () => {
    if (isMovingByTouch) return;
    const swipDistance = touchStartX - touchEndX;
    console.log(swipDistance);
    if (Math.abs(swipDistance) < 50) {
      slidesContainer!.style.transform = `translateX(${currentPosition}%)`;
      // moveSlider();
      // currentIndex = currentIndex - visibleSlides;
      // moveSlider();
    } else {
      if (swipDistance > 0) moveNext();
      else movePrev();
    }
  };
  const moveNext = () => {
    currentIndex += visibleSlides;
    moveSlider();
  };
  const movePrev = () => {
    currentIndex -= visibleSlides;
    moveSlider();
  };
  const moveSlider = (transition: boolean = true) => {
    if (!slidesContainer) return;
    isMoving = true;
    if (currentIndex < 0) currentIndex = visibleSlides;
    else if (currentIndex > totalSlides - 1)
      currentIndex = originalSlidesCount + visibleSlides - 1;

    slidesContainer.style.transition = transition ? "" : "none";
    console.log(currentIndex);
    updateDotState(
      Math.ceil(currentIndex / originalSlidesCount) * visibleSlides,
    );
    currentPosition = -currentIndex * rtlFactor * (100 / (visibleSlides || 1));
    slidesContainer.style.transform = `translateX(${currentPosition}%)`;
  };
  const enableKeyboardActions = () => {
    mouseInside = true;
  };
  const disableKeyboardActions = () => {
    mouseInside = false;
  };

  const onKeydown = (ev: KeyboardEvent) => {
    if (!mouseInside) return;
    if (ev.code === "ArrowLeft") {
      moveNext();
    } else if (ev.code === "ArrowRight") {
      movePrev();
    }
  };
  const removeImageLazyProps = (image: HTMLImageElement | null) => {
    if (!image || !image.dataset.src) return;
    image.classList.remove("lazy");
    image.src = image.dataset.src;
    image.removeAttribute("data-src");
  };
  // update slide widths:
  if (currentConfig.visibleSlides && currentConfig.visibleSlides > 1)
    slider.style.setProperty(
      "--slide-width",
      `calc(100% / ${currentConfig.visibleSlides})`,
    );
  cloneSlides();
  createDots();
  createNavBtns();
  if (originalSlidesCount > 1) {
    /*
    const firstElement: HTMLDivElement = slides[0].cloneNode(
      true,
    ) as HTMLDivElement;
    const firstImage: HTMLImageElement | null =
      firstElement.querySelector("img.lazy");
    removeImageLazyProps(firstImage);
    slidesContainer?.appendChild(firstElement);
    // last element
    const lastElement: HTMLDivElement = slides[originalSlidesCount - 1].cloneNode(
      true,
    ) as HTMLDivElement;
    const lastImage: HTMLImageElement | null =
      lastElement.querySelector("img.lazy");
    removeImageLazyProps(lastImage);
    slidesContainer?.prepend(lastElement);
    */
    currentIndex = visibleSlides;
    moveSlider(false);

    slidesContainer?.addEventListener("transitionend", onTransitionend);
    slidesContainer?.addEventListener("touchstart", onTouchstart);
    slidesContainer?.addEventListener("touchmove", onTouchmove);
    slidesContainer?.addEventListener("touchend", onTouchend);
  }
  if (currentConfig.autoplay && originalSlidesCount > 1) {
    startAutoPlay();
    slider.addEventListener("touchstart", stopAutoPlay);
    slider.addEventListener("mouseenter", stopAutoPlay);
    slider.addEventListener("touchend", startAutoPlay);
    slider.addEventListener("mouseleave", startAutoPlay);
  }
  slider.addEventListener("mouseenter", enableKeyboardActions);
  slider.addEventListener("mouseleave", disableKeyboardActions);
  window.addEventListener("keydown", onKeydown);
  const destroy = () => {
    if (nextBtn) nextBtn.remove();
    if (prevBtn) prevBtn.remove();
    if (dots) dots.remove();
    if (currentConfig.autoplay && originalSlidesCount > 1) {
      stopAutoPlay();
      slider.removeEventListener("touchstart", stopAutoPlay);
      slider.removeEventListener("mouseenter", stopAutoPlay);
      slider.removeEventListener("touchend", startAutoPlay);
      slider.removeEventListener("mouseleave", startAutoPlay);
    }
    slidesContainer?.removeEventListener("transitionend", onTransitionend);
    slidesContainer?.removeEventListener("touchstart", onTouchstart);
    slidesContainer?.removeEventListener("touchmove", onTouchmove);
    slidesContainer?.removeEventListener("touchend", onTouchend);

    //remove keyboard events
    slider.removeEventListener("mouseenter", enableKeyboardActions);
    slider.removeEventListener("mouseleave", disableKeyboardActions);
    window.removeEventListener("keydown", onKeydown);
    // remove cloned
    if (originalSlidesCount > 1) {
      slidesContainer
        ?.querySelectorAll(".slide.cloned")
        .forEach((el) => el.remove());
    }
    // remove dots
    let prevDots = slider.querySelector(".dots");
    if (prevDots) prevDots.remove();
  };
  return {
    destroy: destroy,
  };
}
declare global {
  interface Window {
    Slider: typeof Slider;
  }
}
window.Slider = Slider;
