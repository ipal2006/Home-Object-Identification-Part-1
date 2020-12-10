img="";
status="";
object=[];
function preload()
{
   img = loadImage('fruit_basket.jpeg');
}

function setup()
{
    canvas = createCanvas(650,450);
    canvas.center();
    dectector_of_object = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Detecting Objects"
}

function modelLoaded()
{
    console.log("Model Is Loaded");
    status=true;
    dectector_of_object.detect(img,gotResult);
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
    image(img,0,0,650,450);
    if(status !="")
    {
        for (i=0;i<object.length;i++)
        {
            document.getElementById("status").innerHTML="Object Detected";
            fill("#0a0885");
            percent= floor(object[i].confidence*100);
            text(object[i].label+" "+percent+"%",object[i].x+15,object[i].y+15);
            
            noFill();
           
            stroke("#0a0885");
            
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    }
    
}