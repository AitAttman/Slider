# Simple slider
**Demo:** You can see example of this slider in action here:\
[https://aitattman.github.io/Slider/](https://aitattman.github.io/Slider)
## Characteristics 
* **JS and css only, independent of any library**
* **Supports touch and drag on touch screens**
* **Works for any content like photos or texts**
* **Captions on top of images**
* **loop**
* **autoplay**
* **navigation buttons**
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
<div class="slider" data-nav-dots="true">
      <div class="slides">
        <div class="slide">
          <img src="/images/group1/image1.jpg">
          <p class="caption">Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
        </div>
        <div class="slide"><img src="/images/group1/image5.jpg"></div>
        <div class="slide"><img src="/images/group1/image6.jpg"></div>
        <div class="slide">
          <div class="text-container bg-color-1">
            <p class="text-xl">This is large text</p>
            <div><button>click button</button></div>
          </div>
          <p class="caption">This is caption text example</p>
        </div>
        <div class="slide">
          <div class="text-container bg-color-2 text-md">
            <p class="p-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et repudiandae laboriosam consequatur quam obcaecati consectetur in suscipit iusto quidem quae dicta, sed dolore libero perferendis modi facere quo porro facilis</p>
          </div>
        </div>
      </div>
    </div>
```
### 3. Initiate the slider by importing "slider.min.js":
```
import("./slider.min.js").then(({default: Slider}) => {
    Slider('.slider')
})
```
or include **slider.min.js** at top of your html document:
```
<script type="module" crossorigin src="./slider.min.js"></script>
```
And then use **window.Slider** function:
```
window.Slider('.slider')
```
***Slider arguments:***
* first argument: css selector or html element
* second argument object of configuration

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
    rtl: false,
    interval: 3000,
    autoplay: false,
    navButtons: true,
  })
```
You can also configure the slider by data-* attributes on slider container:
1. **data-nav-dots**: true|false
2. **data-rtl**: true|false
3. **data-interval**: number
3. **data-autoplay**: true|false
3. **data-nav-buttons**: true|false

example:
```
<div class="slider my-slider" data-nav-dots="true" data-rtl="false" data-autoplay="false" data-interval="3000" data-nav-buttons="true">
.
.
.
</div>
```
**Available config**
1. **navDots** : show or hide navigation dots
2. **rtl** : whether the colument is rtl or not
3. **autoplay**: Autoplay the slider
4. **interval**: time in miliseconds, works only if *autoplay* is enabled
5. **navButtons**: show/hide right/left navigation buttons 