

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
        value:[
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
        ]    
    }

    var colorUniform={
        id:"color",
        value:[1,0,0]     
    }

    /* Attributes */
    var positionAttribute ={
        id:"position",
        size:3,
        type:WebGLJs.gl.FLOAT
    }; 

    WebGLJs.registerShaders([vertexShader,pixelShader]);
    WebGLJs.registerAttributes([positionAttribute]);
    WebGLJs.registerUniforms([modelUniform,colorUniform]);
    //cube
    //scutoid
    
});

