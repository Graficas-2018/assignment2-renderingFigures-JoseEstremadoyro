
// Everything is run when the DOM's content has loaded
document.addEventListener("DOMContentLoaded",function(event){

    /* shaders and buffers */
    var vertexShader = {
        id:"vertexShader",
        type:WebGLJs.gl.VERTEX_SHADER
    };

    var pixelShader = {
        id:"fragmentShader",
        type:WebGLJs.gl.FRAGMENT_SHADER
    };

    /* The model uniform,created from this model array,
     * is used by our vertex Shader to move the camera 
     * and allow the objects to be seen from an isometric 
     * perspective. We start with an identity matrix. 
     * We move it to the top corner and tilt it towards the center */

    
    // Translate (0,0,-.5) camera out, .2z, from the origin
    var translate= vec3.fromValues(-.5,0,.2);    

    /* Rotate -45 degrees over x and y, and 90 over z
     * We use quaternions, instead of vectors, as they make 
     * accomulating rotations easier, due to their different mathematical
     * properties */
    var rotate = quat.create()
    quat.rotateZ(rotate,rotate,-Math.PI/2);
    quat.rotateY(rotate,rotate,-Math.PI/4);
    quat.rotateX(rotate,rotate,-Math.PI/4);

    var model = mat4.create();
    mat4.fromRotationTranslation(model,rotate,translate);

    /* We end transforming the model matrix */

    /* Uniforms */
    var modelUniform = {
        id:"model",
        size:4,
        value:model
    }

    var colorUniform={
        id:"color",
        size:1,
    }

    /* Attributes */
    var positionAttribute ={
        id:"position",
        size:3,
        type:WebGLJs.gl.FLOAT
    }; 

    /* Registering of all webgl elements 
     * Note: The color Uniform will be changed after each face, 
     * so we register it later */
    WebGLJs.registerShaders([vertexShader,pixelShader]);
    WebGLJs.registerUniforms([modelUniform]);
    WebGLJs.registerAttributes([positionAttribute]);

    /* Cube is made of vertexes and indices to generate faces */
    var cubeVertexes = [
        [-1,-1,-1],
        [-1,-1, 1],
        [-1, 1,-1],
        [ 1,-1,-1],
        [ 1, 1,-1],
        [-1, 1, 1],
        [ 1,-1, 1],
        [ 1, 1, 1],
    ];

    /* Scale Down */
    cubeVertexes = cubeVertexes.map((x)=>x.map((y)=>y*.25));

    /* Translate (+.5,0,0) */
    cubeVertexes = cubeVertexes.map((x)=>[x[0],x[1]+.5,x[2]]);

    /* Each Line represents a face */
    var cubeIndices = [
        2,4,5,7,
        0,2,3,4,
        0,1,2,5
    ];

    /* We fill in the cube,using the appropiate vertexes */
    cube = cubeIndices.map((x)=>cubeVertexes[x]);

    /* Flatten array */
    cube = [].concat.apply([],cube);


    colors = [[1,0,0],[0,1,0],[0,0,1]];

    for(let color of colors){

        /* Change Color */
        colorUniform.value = new Float32Array(color);
        WebGLJs.setUniforms([colorUniform]);

        /* Draw Face */
        WebGLJs.draw([{
            bufferId:"position",
            typedArray:new Float32Array(cube.splice(0,12))
        }],4);
    }

    //scutoid
});

