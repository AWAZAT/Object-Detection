img="";
status = "";
objects = [];

function preload()
{
    img = loadImage('bottles.png');
}

function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();

}

function bottles()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object(s).";   
}

function modelLoaded()
{
    console.log("Model Loaded!")
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error,results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw()
{
    image(img,0, 0, 380, 380);

    if(status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(img, gotResult);

        for (i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object   Detected."
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : " + objects.length;
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 10);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
