img="";
status="";
object=[];
function preload()
{
   img = loadImage('laptop.jpeg');
}

function setup()
{
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    dectector_of_object = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Detecting Objects"
}

function modelLoaded()
{
    console.log("Model Is Loaded");
    status=true;
    
}

function gotResult(error,results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    object=results;
    
}
function draw()
{ 
    image(video,0,0,650,450);
    if(status !="")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        dectector_of_object.detect(video,gotResult);
        for (i=0;i<object.length;i++)
        {
            document.getElementById("status").innerHTML="Object Detected";
            document.getElementById("number_of_objects").innerHTML="Number of Objects detected are"+ object.length;
            fill(r,g,b);
            percent= floor(object[i].confidence*100);
            text(object[i].label+" "+percent+"%",object[i].x+15,object[i].y+15);
            
            noFill();
           
            stroke(r,g,b);
            
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    }
    
}