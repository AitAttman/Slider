import "./slider.scss";
import "./style.scss"
document.addEventListener('DOMContentLoaded', ()=>{
   import("./slider").then(({default: Slider}) => {
    Slider('.slider')
}) 
})