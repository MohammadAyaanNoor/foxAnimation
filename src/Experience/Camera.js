import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import Experience from '../Experience/Experience';


export default class Camera{
    constructor(){
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.canvas = this.experience.canvas
        this.scene = this.experience.scene

        this.setInstance()
        this.setOrbitControls()
    }

    setInstance(){
        this.instance = new THREE.PerspectiveCamera(75,this.sizes.width/this.sizes.height,0.1,100);
        this.scene.add(this.cameraHelper)
        this.instance.position.set(-6,3,4);
        this.scene.add(this.instance);
    }

    setOrbitControls(){
        this.controls = new OrbitControls(this.instance,this.canvas);
        this.controls.enableDamping = true
    }

    resize(){
        this.instance.aspect = this.sizes.width/this.sizes.height
        this.instance.updateProjectionMatrix();
    }

    update(){
        this.controls.update()
    }
}

