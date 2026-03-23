# Infinite javascript Carousel/Slider 
![Infinite javascript responsive carousel with breakpoints support](carousel-real-example_compressed.webp)
**Demo:** You can see example of this slider in action here:\
[https://aitattman.github.io/Slider](https://aitattman.github.io/Slider)

Meet one the powerful carousels for the modern web. Built entirely with vanilla JavaScript and CSS, this engine delivers a premium experience without the overhead of heavy external libraries.

## Characteristics 
* **JS and css only, independent of any library**
* **Right-To-Left layout support**
* **Supports touch and drag on touch screens**
* **Works for any content like photos, texts...**
* **Captions on top of images**
* **Infinite loop**
* **Autoplay**
* **Navigation buttons**
* **Move with keyboard actions (Arrow left & Arrow right)**
* **Responsive breakpoints: control number of visible slides based on container width**
### 1. Include slider style (slider.min.css) at top of you document:
```
<link rel="stylesheet" crossorigin href="./docs/slider.min.css">
```
### 2. Build Html:
Basic html structure must be like this:
```
<div class="slider">
    <div class="slides">
        <div class="slide">content of slide 1</div>
        <div class="slide">content of slide 2</div>
        .
        .
        .
    </div>
</div>
```
Example of html markup from demo:
```
<div
      class="slider"
      data-visible-slides="1"
      data-breakpoints="false"
    >
    <div class="slides">
        <div class="slide">
          <img
            src="https://images.pexels.com/photos/4906931/pexels-photo-4906931.jpeg?auto=compress&cs=tinysrgb&w=800"
          />
          <p class="caption">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores
            necessitatibus ullam fugiat
          </p>
        </div>
        <div class="slide">your content here</div>
        <div class="slide">your content here</div>
        <div class="slide">your content here</div>
      </div>
</div>
```
### 3. Initiate the slider by importing "slider.min.js":
```
import("./slider.min.js").then(({default: Slider}) => {
    Slider('.slider')
})
```

### Slider arguments:
**Slider( element, options )**
* **element**: css selector or html element, default: '.slider'
* **options**: configuration object

***Example***
```
Slider('#my-slider-container', {autoplay:true, interval: 2000 })
// Or use html element instance 
const container = document.querySelector(".my-slider")
if( container )
Slider(container)
```
### 4. Configuration
You can configure the Slider by passing object of paramters as second parameter to the Slider function:
```
Slider('.slider',{
    navDots: true,
    interval: 5000,
    autoplay: false,
    navButtons: true,
    visibleSlides: 1,
    breakpoints: {
      520: 1,
      768: 3,
      1024: 4
    }
  })
```
You can also configure the slider by data-* attributes on slider container:
1. **data-nav-dots**: true|false
3. **data-interval**: number
3. **data-autoplay**: true|false
3. **data-nav-buttons**: true|false
3. **data-visible-slides**: number
3. **data-breakpoints**: json|false

example:
```
<div class="slider my-slider" data-nav-dots="true" data-autoplay="false" data-interval="3000" data-nav-buttons="true" data-breakpoints='{"520": 1,"640": 2, "768": 3, "1024": 4, "1200": 5}' data-visible-slides="3">
.
.
.
</div>
```
**Available config**
1. **navDots** : show or hide navigation dots
3. **autoplay**: Autoplay the slider
4. **interval**: time in miliseconds, works only if *autoplay* is set to true
5. **navButtons**: show/hide right/left navigation buttons 
5. **visibleSlides**: number of slides to show per navigation
6. **breakpoints**: defines how many slides to display (visibleSlides) per width, eg: {520: 1, 768: 3} , to disable this feature and keep same number of visible slides regardless of slider width, put it to false;