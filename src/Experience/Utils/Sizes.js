import EventEmitter from '../Utils/EventEmitter'

export default class Sizes extends EventEmitter{
    constructor(){
        super();
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.pixelRatio = Math.min(window.devicePixelRatio,2);
        
        this.eventListener = window.addEventListener('resize',()=>{
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.pixelRatio = Math.min(window.devicePixelRatio,2);
        this.trigger('resize');
        })
    }


}