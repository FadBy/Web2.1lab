

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const unitCanvas = canvas.width / 100;

const rLength = unitCanvas * 33;
const axisLength = unitCanvas * 90;
const arrowTipLength = unitCanvas * 5;
const arrowAngle = Math.PI / 12;  // in radian
const markLength = unitCanvas * 2;
const textDist = unitCanvas * 2;
const vertTextPos = 1;
const horTextPos = -1;
const textOffset = canvas.style.fontSize.length * 0.5;

const oX = canvas.height / 2; 
const oY = canvas.width / 2;

ctx.fillStyle = "blue";
//drawing rectangle
ctx.fillRect(oX, oY, rLength, rLength / 2);
//drawing triangle
ctx.beginPath();
ctx.moveTo(oX, oY);
ctx.lineTo(oX, oY - rLength / 2);
ctx.lineTo(oX - rLength, oY);
ctx.lineTo(oX, oY);
ctx.fill();

//drawing circle
ctx.moveTo(oX - rLength / 2, oY);
ctx.lineTo(oX, oY);
ctx.lineTo(oX, oY + rLength / 2);
ctx.arc(oX, oY, rLength / 2, Math.PI / 2, Math.PI);
ctx.fill();

ctx.beginPath();
//drawing vertical arrow
ctx.moveTo(oX, oY + axisLength / 2);
ctx.lineTo(oX, oY - axisLength / 2);
ctx.lineTo(oX - arrowTipLength * Math.tan(arrowAngle), oY - axisLength / 2 + arrowTipLength);
ctx.moveTo(oX + arrowTipLength * Math.tan(arrowAngle), oY - axisLength / 2 + arrowTipLength);
ctx.lineTo(oX, oY - axisLength / 2);

//drawing horizontal arrow
ctx.moveTo(oX - axisLength / 2, oY);
ctx.lineTo(oX + axisLength / 2, oY);
ctx.lineTo(oX + axisLength / 2 - arrowTipLength, oY - arrowTipLength * Math.tan(arrowAngle));
ctx.moveTo(oX + axisLength / 2 - arrowTipLength, oY + arrowTipLength * Math.sin(arrowAngle));
ctx.lineTo(oX + axisLength / 2, oY);

//drawing marks on vertical
//-R
ctx.moveTo(oX - markLength / 2, oY + rLength);
ctx.lineTo(oX + markLength / 2, oY + rLength);
ctx.strokeText("-R", oX + vertTextPos * (markLength / 2 + textDist), oY + rLength + textOffset);
//-R/2
ctx.moveTo(oX - markLength / 2, oY + rLength / 2);
ctx.lineTo(oX + markLength / 2, oY + rLength / 2);
ctx.strokeText("-R/2", oX + vertTextPos * (markLength / 2 + textDist), oY + rLength / 2 + textOffset);
//R/2
ctx.moveTo(oX - markLength / 2, oY - rLength / 2);
ctx.lineTo(oX + markLength / 2, oY - rLength / 2);
ctx.strokeText("R/2", oX + vertTextPos * (markLength / 2 + textDist), oY - rLength / 2 + textOffset);

//R
ctx.moveTo(oX - markLength / 2, oY - rLength);
ctx.lineTo(oX + markLength / 2, oY - rLength);
ctx.strokeText("R", oX + vertTextPos * (markLength / 2 + textDist), oY - rLength + textOffset);
ctx.strokeText("y", oX + vertTextPos * (markLength / 2 + textDist), oY - axisLength / 2 + textOffset);

//drawing marks on horizontal
//-R
ctx.moveTo(oX - rLength, oY - markLength / 2);
ctx.lineTo(oX - rLength, oY + markLength / 2);
ctx.strokeText("-R", oX - rLength - textOffset, oY + horTextPos * (markLength / 2 + textDist));
//-R/2
ctx.moveTo(oX - rLength / 2, oY - markLength / 2);
ctx.lineTo(oX - rLength / 2, oY + markLength / 2);
ctx.strokeText("-R/2", oX - rLength / 2 - textOffset, oY + horTextPos * (markLength / 2 + textDist));

//R/2
ctx.moveTo(oX + rLength / 2, oY - markLength / 2);
ctx.lineTo(oX + rLength / 2, oY + markLength / 2);
ctx.strokeText("R/2", oX + rLength / 2 - textOffset, oY + horTextPos * (markLength / 2 + textDist));

//R
ctx.moveTo(oX + rLength, oY - markLength / 2);
ctx.lineTo(oX + rLength, oY + markLength / 2);
ctx.strokeText("R", oX + rLength - textOffset, oY + horTextPos * (markLength / 2 + textDist));
ctx.strokeText("x", oX + axisLength / 2 - textOffset, oY + horTextPos * (markLength / 2 + textDist));

ctx.stroke();
$(document).ready(function() {
    $("#canvas").click(function (event) {
        console.log("yes-yes-yes")
        const x = event.pageX - $(this).position().left - 27,
            y = event.pageY - $(this).position().top - 27;
        console.log(document.forms[0]["r"].value);
        if (x < 5 * unitCanvas || x > 95 * unitCanvas || y < 5 * unitCanvas || y > 95 * unitCanvas) {
            return;
        }
        if (document.forms[0]["r"].value !== undefined) {
            $.ajax({
                type: "POST",
                url: "raycast.php",
                data: {"x": (x - canvas.width / 2) / rLength * document.forms[0]["r"].value, "y": -(y - canvas.height / 2) / rLength * document.forms[0]["r"].value, "r": document.forms[0]["r"].value},

                dataType: "json",
                timeout: 2000,
                success: addRay,
                error: function(obj, textStatus, errorThrown) {
                    console.log(errorThrown);
                    console.log(obj);
                    alert(textStatus)
                }
            });
        }
    });
})

