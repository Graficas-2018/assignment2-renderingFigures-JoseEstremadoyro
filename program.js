
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
        value:new Float32Array([1,0,0])
    }

    /* Attributes */
    var positionAttribute ={
        id:"position",
        size:3,
        type:WebGLJs.gl.FLOAT
    }; 

    // Registering of all webgl elements
    WebGLJs.registerShaders([vertexShader,pixelShader]);
    WebGLJs.registerUniforms([modelUniform,colorUniform]);
    WebGLJs.registerAttributes([positionAttribute]);

    //cube
    var cube = [
        /* first face */
        [0,0,0],
        [0,0,1],
        [0,1,0],
        [0,1,1],

        /* second face */
        [1,0,0],
        [1,1,0],
        [1,0,1],
        [1,1,1],
    ];
    cube = [].concat.apply([],cube);
    cube = cube.map((x)=>x*0.5);

    WebGLJs.draw([{
        bufferId:"position",
        typedArray:new Float32Array(cube)
    }],4);
    
    // Change Color
    colorUniform.value = [0,1,0];
    WebGLJs.setUniforms([colorUniform]);
    /*WebGLJs.draw([{
        bufferId:"position",
        typedArray:new Float32Array([1,1,1,0,0,0,-1,-1,-1])
    }],3);*/
    //scutoid
    
});

