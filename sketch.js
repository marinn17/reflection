var sketch1 = function( p ){
	var canvasSize, gemX, gemY, gemSize, angle, center;
	
	p.setup = function() {
		canvasSize = 600;
		gemY = canvasSize/4;
		gemX = canvasSize-(canvasSize/4);
		center = p.createVector(canvasSize/2, canvasSize/2);
		gemSize = 15;
		angle = 0;
		p.createCanvas(canvasSize,canvasSize);
		p.angleMode(p.DEGREES);
	};

	p.draw = function() {
		p.background('white');

		//mirror middle line
		p.stroke('blue');
		p.line(0, p.height/2 , p.width, p.height/2);

		//mirrored line to reflected gem
		p.drawingContext.setLineDash([10,7]);
		p.line(center.x, center.y, gemX, canvasSize-gemY);

		//normal line
		p.drawingContext.setLineDash([5,5]);
		p.stroke('black');
		p.line(p.width/2, p.height/2,p.width/2, 0);

		//line to mirror from gem, line from mirror to eye
		p.drawingContext.setLineDash([]);
		p.stroke('red');
		p.line(gemX, gemY, center.x, center.y);
		p.stroke('black');
		p.line(p.width-gemX,gemY, center.x, center.y);
		
		//eye
		p.stroke('black');
		p.fill('black');
		p.eye(p.width-gemX,gemY,gemSize);

		//gem
		p.stroke('red')
		p.fill('red');
		p.gem(gemX,gemY,gemSize);
		
		//reflected gem
		p.stroke('blue');
		p.fill('white');
		p.gem(gemX, canvasSize-gemY, gemSize*-1);

		//calculating angle of incidence and reflection
		p.noFill();
		var hyp = p.dist(gemX, gemY, center.x, center.y);
		var adj = p.dist(center.x, center.y, center.y, gemY);
		angle = p.acos(adj/hyp);

		//drawing angle of incidence and reflection
		p.stroke('black');
		p.arc(center.x, center.y, gemSize*2, gemSize*2,270-angle, 270);	
		p.text(parseInt(angle)+"\xB0",center.x-25, center.y-30);

		p.stroke('red');
		p.arc(center.x, center.y, gemSize*2, gemSize*2,270, 270+angle);
		p.text(parseInt(angle)+"\xB0",center.x+10, center.y-30);

		//when the user moves the gem
	 	if (p.mouseIsPressed){
			if (p.dist(p.mouseX, p.mouseY, gemX, gemY) <= gemSize*1.5){
				p.eyeBlink(p.width-gemX,gemY,gemSize);
				if (p.mouseX > (p.width/2+gemSize)){
					gemX = p.mouseX;
				}
				
				if (p.mouseY<=(p.height/2)){
					gemY = p.mouseY;
				}
			}
		};
	};
	p.gem = function(x,y,size){
		p.beginShape();
		p.vertex(x,y);
		p.vertex(x+size,y-size);
		p.vertex(x+size/2,y-size*1.5);
		p.vertex(x-size/2,y-size*1.5);
		p.vertex(x-size,y-size);
		p.vertex(x,y);
		p.endShape();
	};
	p.eye = function(x,y,size){
		p.stroke('black');
		p.fill('white');
		p.ellipse(x,y,size*2,size);
		p.fill('black');
		p.ellipse(x, y, size, size);
	};
	p.eyeBlink = function(x,y,size) {
		p.stroke('black');
		p.fill('black');
		p.ellipse(x,y,size*2,size);
	};
};
var myp5_1 = new p5(sketch1, 'c1');
