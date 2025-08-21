import Experience from '../Experience';
import Environment from '../World/Environment'
import Floor from '../World/Floor';
import Fox from '../World/Fox';
import SkyEnvironment from './SkyEnvironment';


export default class World{

    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.sky = new SkyEnvironment()


        this.resources.on('ready',()=>{
            //instancing the assets
            this.floor = new Floor()
            this.fox = new Fox()
            this.environment = new Environment()
            
        })
    }
    update(){
        if(this.fox){
            this.fox.update()
        }
    }
}