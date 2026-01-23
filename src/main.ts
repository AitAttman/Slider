import "./slider.scss";
import "./style.scss"
document.addEventListener('DOMContentLoaded', async ()=>{
    const {default: Slider} = await  import("./slider")
    const containers: NodeListOf<HTMLDivElement> = document.querySelectorAll('.slider')
    containers.forEach( s => Slider(s))
})