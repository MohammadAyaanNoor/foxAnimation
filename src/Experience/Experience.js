import * as THREE from 'three'
import Sizes from '../Experience/Utils/Sizes'
import Time from '../Experience/Utils/Time'
import Camera from '../Experience/Camera'
import Renderer from '../Experience/Renderer'
import World from '../Experience/World/World'
import Resources from '../Experience/Utils/Resources'
import Debug from '../Experience/Utils/Debug'
import sources from '../Experience/sources'




let instance = null;
export default class Experience{
    constructor(canvas){
        if(instance){
            return instance
        }
        instance = this
        //console access
        window.experience = this

        //canvas
        this.canvas = canvas

        //instantiation
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()


        //sizes event
        this.sizes.on('resize',()=>{
            this.resize()
        })
        //tick event
        this.time.on('tick',()=>{
            this.update()
        })
       
    }
    resize(){
        this.camera.resize()
        this.renderer.resize()
     }
    update(){
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }
    destroy(){
        this.sizes.off('resize')
        this.time.off('tick')

        //traversing the scene

        this.scene.traverse((child)=>{
            if(child instanceof THREE.Mesh){
                child.geometry.dispose()
                for(const key in child.material){
                    const value = child.material[key]
                    if(value && typeof value.dispose === 'function'){
                        value.dispose()
                    }
                }
            }
        })
        this.camera.controls.dispose()
        this.renderer.instance.dispose()

        if(this.debug.active){
            this.debug.ui.destroy()
        }
        
    }
}