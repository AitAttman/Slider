import "./style.scss";
import("./slider").then(({default: Slider}) => {
    Slider('.slider')
})