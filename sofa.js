status = "";
objects = [];

function preload()
{
    img = loadImage("Sofa.jpg");
}

function setup()
{
    canvas = createCanvas(640 ,420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded()
{
    console.log("Model Loaded");
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function back()
{
    window.location("index.html");
}

function draw()
{
    image(img, 0, 0, 640, 420);

    if (status != "")
    {
        for (i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("object_name").innerHTML = "Number of objects detected are " + objects.length + " out of 2";

            fill("#ff0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 20, objects[i].y + 20);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
