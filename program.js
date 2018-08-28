
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

    /* Uniforms */
    var modelUniform = {
        id:"model",
        size:4,
        value:new Float32Array([
            0.04621901591600671, 
            0, 
            0.49785921962715113, 
            0, 
            -0.4970914856058723, 
            -0.0277568146622999, 
            0.04614774293450941, 
            0, 
            0.02763797217421619, 
            -0.4992289647444374, 
            -0.002565785317308975, 
            0, 
            0, 
            -0.1, 
            0, 
            1
        ])    
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
    cubeVertexes = cubeVertexes.map((x)=>x.map((y)=>y*.5));

    /* Translate (+.5,0,0) */
    cubeVertexes = cubeVertexes.map((x)=>[x[0],x[1]+.5,x[2]]);

    /* Each Line represents a face */
    var cubeIndices = [
        0,1,3,6,
        0,2,3,4,
        0,1,2,5
    ];

    /* We fill in the cube,using the appropiate vertexes */
    cube = cubeIndices.map((x)=>cubeVertexes[x]);

    /* Flatten array */
    cube = [].concat.apply([],cube);


    colors = [[1,0,0],[0,1,0],[0,0,1]];
    
    console.log(cube);

    for(let color of colors){

        /* Change Color */
        colorUniform.value = new Float32Array(color);
        WebGLJs.setUniforms([colorUniform]);

        /* Draw Face */
        WebGLJs.draw([{
            bufferId:"position",
            typedArray:new Float32Array(cube.splice(0,12))
        }],4);
        console.log(cube);
    }

    //scutoid
});

