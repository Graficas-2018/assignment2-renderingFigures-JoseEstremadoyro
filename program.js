

document.addEventListener("DOMContentLoaded",function(event){

    /* transformation operations */
    function translatePoints(array,x,y){
       
       // modify the different points  
       return array.map((p)=>[p[0]+x,p[1]+y]);
    }

    function scalePoints(array,x,y){

        // Divide the different points
        return array.map((p)=>[p[0]/x,p[1]/y]);
    }

    function flatten(array){

        // We flatten the array by concatenating each element
        return [].concat.apply([],array);
    }

    /* figures */
    function applyTransformations(array,scale,translate){

        // Scale, translate and flatten the vertexes
        array = scalePoints(array,scale.x,scale.y); 
        array = translatePoints(array,translate.x,translate.y); 
        return flatten(array);
    }

    function getCube(scale={x:1,y:1},translate={x:0,y:0}){

        // Creation of the base matrix to be multiplied
        var cube = [
            [-1, -1],
            [ 1, -1],
            [-1,  1],
            [ 1,  1]
        ];
        return applyTransformations(cube,scale,translate)
    }

    function getTriangle(scale={x:1,y:1},translate={x:0,y:0}){
       
        // Creation of the base matrix to be multiplied
        var triangle = [
            [-1, -1],
            [ 0,  1],
            [ 1, -1],
        ];
        return applyTransformations(triangle,scale,translate)
    }

    function getDiamond(scale={x:1,y:1},translate={x:0,y:0}){
       
        // Creation of the base matrix to be multiplied
        var diamond = [
            [ 0,  1],
            [ 1,  0],
            [ 0, -1],
            [-1,  0],
            [ 0,  1],
        ];
        return applyTransformations(diamond,scale,translate)
    }

    function getPacman(start=0,end=360,
            step=1,scale={x:1,y:1},translate={x:0,y:0}){

        // Convert to radians 
        startR= Math.PI/180*start;
        endR= Math.PI/180*end;
        stepR = Math.PI/180*step;
        
        // Creation of the base matrix to be multiplied
        var pacman = [[0,0]];
        for(var i = startR;i<endR;i+=stepR){
            pacman.push([Math.cos(i),Math.sin(i)]) 
        }
        return applyTransformations(pacman,scale,translate)
    }


    /* shaders and buffers */
    var vertexShader = {
        id:"vertexShader",
        type:WebGLJs.gl.VERTEX_SHADER
    };

    var pixelShader = {
        id:"fragmentShader",
        type:WebGLJs.gl.FRAGMENT_SHADER
    };

    var positionBuffer ={
        id:"position",
        size:2,
        type:WebGLJs.gl.FLOAT
    }; 

    //scale to 1/4 and move -.5, and +.5
    let cube = getCube(
        {x:4.0, y:4.0},
        {x:-0.5, y:0.5}
    );
    
    let triangle = getTriangle(
        {x:4.0, y:4.0},
        {x:0.5, y:0.5}
    );

    let diamond = getDiamond(
        {x:4.0, y:4.0},
        {x:-0.5, y:-0.5}
    );
    
    let pacman = getPacman(
        45,315,2,
        {x:4.0, y:4.0},
        {x:0.5, y:-0.5}
    );

    console.log(pacman);
    WebGLJs.registerShaders([vertexShader,pixelShader]);
    WebGLJs.registerBuffers([positionBuffer]);
    WebGLJs.draw("position",new Float32Array(cube),4);
    WebGLJs.draw("position",new Float32Array(triangle),3);
    WebGLJs.draw("position",new Float32Array(diamond),5);
    WebGLJs.draw("position",new Float32Array(pacman),pacman.length/2,WebGLJs.gl.TRIANGLE_FAN);
});

