import * as THREE from "three";
import Experience from "../Experience";
import { Sky } from "three/examples/jsm/Addons.js";

export default class SkyEnvironment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.camera = this.experience.camera.instance;
    this.resources = this.experience.resources;
    this.renderer = this.experience.renderer;
    this.debug = this.experience.debug;
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Sky");
    }

    this.setSky();
    this.updateSky();
    this.setDebug();
  }
  setSky() {
    this.sky = new Sky();
    this.sky.scale.setScalar(450000);
    this.scene.add(this.sky);

    this.sun = new THREE.Vector3();

    this.skyParameters = {
      turbidity: 3,
      rayleigh: 2.869,
      mieCoefficient: 0.029,
      mieDirectionalG: 0.828,
      elevation: -1.99,
      azimuth: 113.6,
      exposure: 1.75,
    };
  }
  updateSky() {
    this.uniforms = this.sky.material.uniforms;
    this.uniforms["turbidity"].value = this.skyParameters.turbidity;
    this.uniforms["rayleigh"].value = this.skyParameters.rayleigh;
    this.uniforms["mieCoefficient"].value = this.skyParameters.mieCoefficient;
    this.uniforms["mieDirectionalG"].value = this.skyParameters.mieDirectionalG;

    this.phi = THREE.MathUtils.degToRad(90 - this.skyParameters.elevation);
    this.theta = THREE.MathUtils.degToRad(this.skyParameters.azimuth);

    this.sun.setFromSphericalCoords(1, this.phi, this.theta);

    this.uniforms["sunPosition"].value.copy(this.sun);

    this.renderer.instance.toneMappingExposure = this.skyParameters.exposure;
    this.renderer.instance.render(this.scene, this.camera);
  }
  setDebug() {
    if (this.debug.active) {
      this.debugFolder
        .add(this.skyParameters, "turbidity")
        .min(0.0)
        .max(20.0)
        .step(0.1)
        .name("turbidity")
        .onChange(this.updateSky.bind(this));
      this.debugFolder
        .add(this.skyParameters, "rayleigh")
        .min(0.0)
        .max(4)
        .step(0.001)
        .name("rayleigh")
        .onChange(this.updateSky.bind(this));
      this.debugFolder
        .add(this.skyParameters, "mieCoefficient")
        .min(0.0)
        .max(0.1)
        .step(0.001)
        .name("minCoefficient")
        .onChange(this.updateSky.bind(this));
      this.debugFolder
        .add(this.skyParameters, "mieDirectionalG")
        .min(0.0)
        .max(1)
        .step(0.001)
        .name("minDirectionalG")
        .onChange(this.updateSky.bind(this));
      this.debugFolder
        .add(this.skyParameters, "elevation")
        .min(-3)
        .max(10)
        .step(0.01)
        .name("elevation")
        .onChange(this.updateSky.bind(this));
      this.debugFolder
        .add(this.skyParameters, "azimuth")
        .min(-180)
        .max(180)
        .step(0.1)
        .name("azimuth")
        .onChange(this.updateSky.bind(this));
      this.debugFolder
        .add(this.skyParameters, "exposure")
        .min(0)
        .max(2)
        .step(0.0001)
        .name("exposure")
        .onChange(this.updateSky.bind(this));

      this.updateSky();
    }
  }
}
