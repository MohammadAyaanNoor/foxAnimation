export default [
    {
        name:'environmentMapTexture',
        type:'cubeTexture',
        path: [
            '../public/static/textures/environmentMap/px.jpg',
            '../public/static/textures/environmentMap/nx.jpg',
            '../public/static/textures/environmentMap/py.jpg',
            '../public/static/textures/environmentMap/ny.jpg',
            '../public/static/textures/environmentMap/pz.jpg',
            '../public/static/textures/environmentMap/nz.jpg',
        ] 
    },
    {
        name:'grassColorTexture',
        type:'texture',
        path: [
            '../public/static/textures/dirt/color.jpg'
        ] 
    },
    {
        name:'grassNormalTexture',
        type:'texture',
        path: [
            '../public/static/textures/dirt/normal.jpg'
        ] 
    },
    {
        name:'foxModel',
        type:'gltfModel',
        path:'../public/static/models/Fox/glTF/Fox.gltf'
    }
]