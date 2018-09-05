/*
 * Original Author
 * Jose Enrique Estremadoyro Fort
 * 06-2018
 * A simple web gl library for simple drawing
 * Learning Comments Edition
 */

// WebGL Object to wrap the library, works as a namespace 
    WebGLJs = {
    canvas:null,
    gl:null,
    shaders:{},
    buffers:{},
    uniforms:{},
    program:null,

    // Initializer, used to fill in the variables and initialize webGl
    init:function(canvas="webGLCanvas"){

        /* We obtain the canvas wether it is the default one, 
         * or a string passed */
        let defaultSettings = { alpha:false }
        this.canvas = document.getElementById(canvas); 
        this.gl = this.canvas.getContext("webgl",defaultSettings);

        // We check if webGl is working, if not we tell the user 
        if(!this.gl)
            alert("This application requires WebGL. \n \
                    This browser does not support it!");
        else{
            this.program = this.gl.createProgram();
        }
    },

    /* We separate this function so we can alter it easily, 
    *  Default color is black */
    setBackground:function(bg={r:0,g:0,b:0,a:0}){
        this.gl.clearColor(bg.r,bg.g,bg.b,bg.a);
    },

    /* We register each shader by the id of the script 
     * As of the moment the script must have its source as text
     * This will be changed for something more flexible */
    registerShaders:function(array){

        for(let obj of array){

            // Compile and save shader 
            let shader = this.gl.createShader(obj.type);
            this.gl.shaderSource(shader,
                    document.getElementById(obj.id).text);
            this.gl.compileShader(shader);

            // Store the shader with the shaders
            this.shaders[obj.id]=shader;

            // Attach the shaders to the program
            this.gl.attachShader(this.program,shader);
        } 
        // Run all prgram related procedures
        this.gl.linkProgram(this.program);
        this.gl.validateProgram(this.program);
        this.gl.useProgram(this.program);
    },

    /* We register, initialize, compile all buffers to be used, 
     * equivalent to each property of the compiler */
    registerAttributes:function(array){

        for(let obj of array){

            // We get the attribute with the tag id
            var attributeLocation = this.gl.getAttribLocation(
                this.program, obj.id);

            /* We create the buffer and bind it, so we can point it
             * to the attribute */ 
            let buffer = this.gl.createBuffer();
            this.buffers[obj.id] = buffer;
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER,buffer);

            /* We enable the attribute and connect it with the tags
             * of the obj */
            this.gl.enableVertexAttribArray(attributeLocation);
            this.gl.vertexAttribPointer(attributeLocation,
                    obj.size,obj.type,false,0,0);
        }
    },

    // We register Uniforms and set their values
    registerUniforms:function(array){

        // We get the location from the id and set the value 
        for( let obj of array ) {
            let uniform = this.gl.getUniformLocation(this.program,obj.id); 
            
            // Requires modification, to adjust for every case: to do
            switch(obj.size){
                case 4: 
                    this.gl.uniformMatrix4fv(uniform,false,obj.value);
                    break;
                case 1:
                    this.gl.uniform3fv(uniform,obj.value);
                    break;
            }
        }
    },

    // We receive the buffer to send, as well as the array
    draw:function(data,num,drawType=this.gl.TRIANGLE_STRIP){

        /* Requires the buffer system, which is registered 
         * apart, which are created, 
         * binded and then the data is buffered through */ 
        for(let obj of data){
            let buffer = this.buffers[obj.bufferId];
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER,buffer);
            this.gl.bufferData(this.gl.ARRAY_BUFFER,obj.typedArray,
                    this.gl.STATIC_DRAW);
        }

        // After putting the data into the buffers we draw
        this.gl.drawArrays(drawType,0,num);

    }
}

/* Set Alias */
WebGLJs.setUniforms = WebGLJs.registerUniforms;

// We wait for the content to be loaded before we initialize everything 
document.addEventListener("DOMContentLoaded",function(event){
    WebGLJs.init();
});
