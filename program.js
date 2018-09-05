
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
    var translate= vec3.fromValues(-1,0,.2);    

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
    var pwidth = WebGLJs.canvas.width;
    var pheight = WebGLJs.canvas.height;
    var perspective = mat4.create();
    mat4.perspective(
        perspective,
        Math.PI/2,
        Math.max(pwidth,pheight),
        1,
        2
    );
    // Multiply the model times the perspective
    // mat4.multiply(model,model,perspective);

    /* We end transforming the model matrix */

    /* Uniforms */
    var modelPerspectiveUniform = {
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
    WebGLJs.registerUniforms([modelPerspectiveUniform]);
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

    /* Translate (0,.75,0) */
    cubeVertexes = cubeVertexes.map((x)=>[x[0],x[1]+.75,x[2]]);

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
    var scutoidVertexes =[
        // pentagon
        [0,0,1],
        [.95,0,.309],
        [.5877,0,-.809],
        [-.5877,0,-.809],
        [-.95,0,.309],

        // hexagon
        [0,1,1],
        [.866,1,.5],
        [.866,1,-.5],
        [0,1,-1],
        [-.866,1,-.5],
        [-.866,1,.5],

        // body
        [.5877,.5,-.809],
    ];

    /* Scale Down */
    scutoidVertexes = scutoidVertexes.map((x)=>x.map((y)=>y*.5));

    /* Translate (0,-.75,0) */
    scutoidVertexes = scutoidVertexes.map((x)=>[x[0]-.75,x[1]+.75,x[2]+.75]);
    var scutoidIndices = [

        //pentagon
        1,0,2,4,3,

        //hexagon
        6,5,7,10,8,9,

        // special faces
        7,8,11,
        11,8,2,3,9,8,

        // side faces
        3,4,9,10,
        4,0,10,5,
        0,1,5,6

    ];

    /* We fill in the scutoid,using the appropiate vertexes */
    scutoid = scutoidIndices.map((x)=>scutoidVertexes[x]);

    /* Flatten array */
    scutoid = [].concat.apply([],scutoid);
    console.log(scutoid.length);

    function faceObj(color,vertexes){
        this.color = color;
        this.vertexes = vertexes;
    }
    faces = [
        new faceObj([.5,0,0],5),
        new faceObj([0,.5,0],6),

        new faceObj([1,0,0],3),
        new faceObj([0,1,0],6),
        /*new faceObj([0,0,1],5),*/

        new faceObj([1,0,1],4),
        /*new faceObj([1,1,0],4),
        new faceObj([0,1,1],4) */
    ];

    for(let face of faces){

        /* Change Color */
        colorUniform.value = new Float32Array(face.color);
        WebGLJs.setUniforms([colorUniform]);

        /* Draw Face */
        WebGLJs.draw([{
            bufferId:"position",
            typedArray:new Float32Array(scutoid.splice(0,face.vertexes*3))
        }],face.vertexes);
        console.log(scutoid.length);
    }

});

