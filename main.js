Status = ""
objects = []

function setup(){
canvas = createCanvas(380, 360)
canvas.center()
video = createCapture(VIDEO)
video.hide()
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Status: Detecting Objects"
    object_name = document.getElementById("object_name").value 
}

function modelLoaded(){
    console.log('model is loaded :D')
    Status = true;
}

function gotResult(error, results){
    if(error){
        console.log("there is an error")
        console.log(error)
    }
    console.log(results)
    objects = results
}

function draw(){
    image(video, 20, 20, 340, 320)
    if(Status != ""){
        objectDetector.detect(video, gotResult)
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected"  

            fill("white");
            text(objects[i].label, objects[i].x, objects[i].y)
            noFill()
            stroke("white")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)

            if(objects[i].label == object_name){
                video.stop()
                objectDetector.detect(gotResult)
                document.getElementById("location").innerHTML = object_name + "found"
            }
            else{
                document.getElementById("location").innerHTML = object_name + "not found"
            }
        }
    }

    }