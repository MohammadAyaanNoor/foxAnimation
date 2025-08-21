import * as THREE from 'three'
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import EventEmitter from "../Utils/EventEmitter";

export default class Resources extends EventEmitter{

    constructor(sources){
        super();
        //options
        this.sources = sources;

        //setup
        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        this.setLoaders()
        this.startLoading()
    }
    setLoaders(){
        this.gltfLoader = new GLTFLoader()
        this.textureLoader = new THREE.TextureLoader()
        this.cubeTextureLoader = new THREE.CubeTextureLoader()
    }
    startLoading(){
        //loading the resource
        for(const source of this.sources){
            if(source.type === 'gltfModel'){
                this.gltfLoader.load(
                    source.path,
                    (file)=>{
                        this.sourceLoaded(source,file)
                    }
                )
            }
            else if(source.type === 'texture'){
                this.textureLoader.load(
                    source.path,
                    (file)=>{
                        this.sourceLoaded(source,file)
                    }
                )
            }
            else if(source.type === 'cubeTexture'){
                this.cubeTextureLoader.load(
                    source.path,
                    (file)=>{
                        this.sourceLoaded(source,file)

                    }
                )
            }
        }
    }

    sourceLoaded(source,file){
        this.items[source.name] = file
        this.loaded++
        if(this.loaded === this.toLoad){
            this.trigger('ready')
        }
    }
}