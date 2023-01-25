const datas = [];

window.onload = function() {
    $.ajax({
        type: "GET",
        url: "./get_all_rays.php",
        data: ($(this)).serialize(),
        dataType: "json",
        success: function(data)
        {
            for (const ray in data) {
                addRay(data[ray]);
            }
        }
    })
};

$("#form").submit(function(e) {
    e.preventDefault();

    console.log("form");
    
    var form = document.forms[0];
    var error_message = document.createElement("div");
    error_message.className = "error";
    error_message.id = "error";
    var cur_error = document.getElementById("error");
    if (cur_error != null) {
        cur_error.parentNode.removeChild(cur_error);
    }
    if (!form["x"].value) {
        console.log("x invalid");
        error_message.innerHTML = "Invalid X value";
        document.getElementById("x_input").appendChild(error_message);
    }
    else if (!form["y"].value || isNaN(form["y"].value) || (-5 >= parseInt(form["y"].value) || parseInt(form["y"].value) >= 5)) {
        console.log("y invalid");
        error_message.innerHTML = "Invalid Y value";
        document.getElementById("y_input").appendChild(error_message);
    }
    else if (!form["r"].value) {
        console.log("r invalid");
        error_message.innerHTML = "Invalid R value";
        document.getElementById("r_input").appendChild(error_message);
    }
    else {
        console.log("else");
        $.ajax({
            type: "POST",
            url: "./raycast.php",
            data: ($(this)).serialize(),
            dataType: "json",
            timeout: 2000,
            success: function(data)
            {
                addRay(data);
            },
            error: function(obj, textStatus, errorThrown) {
                console.log(errorThrown);
                console.log(obj);
                alert(obj);

            }
        });
    }
});

function addRay(data) {
    
    datas.push(data);
    var table = document.querySelector("#tableBody");
    var tr = table.appendChild(document.createElement("tr"));
    var dataX = document.createElement("td");
    dataX.innerHTML = data.x;
    var dataY = document.createElement("td");
    dataY.innerHTML = data.y;
    var dataR = document.createElement("td");
    dataR.innerHTML = data.r;
    var dataHitResult = document.createElement("td");
    dataHitResult.innerHTML = data.hitResult;
    var dataCurrentTime = document.createElement("td");
    dataCurrentTime.innerHTML = data.currentTime;
    var dataExecutionTime = document.createElement("td");
    dataExecutionTime.innerHTML = data.executionTime;
    tr.appendChild(dataX);
    tr.appendChild(dataY);
    tr.appendChild(dataR);
    tr.appendChild(dataHitResult);
    tr.appendChild(dataCurrentTime);
    tr.appendChild(dataExecutionTime);
}