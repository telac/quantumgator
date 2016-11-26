var headlength = 0.1,
headheight = 0.5, 
bodylength = 0.3,
bodyheight = 0.5;

var renderer = new p2.WebGLRenderer(function(){
	 var OTHER =     Math.pow(2,1),
                BODYPARTS = Math.pow(2,2),
                GROUND =    Math.pow(2,3),
                OTHER =     Math.pow(2,4),
                bodyPartShapes = [];



                var head = new p2.square({ width: headlength, height: headheight }),
                body = new p2.square({width: bodylength, height: bodyheight});

                 bodyPartShapes.push(
                 	head, 
                 	body);
                
                 for(var i=0; i<bodyPartShapes.length; i++){
                var s = bodyPartShapes[i];
                s.collisionGroup = BODYPARTS;
                s.collisionMask = GROUND|OTHER;
            }
            var world = new p2.World({
                gravity : [0,0]
            });
            this.setWorld(world);
            world.solver.iterations = 100;
            world.solver.tolerance = 0.002;


                 var head = new p2.Body({
                 	mass = 1,
                 	position: [headlength /2],
                 });

});
