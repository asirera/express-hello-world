var ContentHeight = 200;
var TimeToSlide = 250.0;

var openAccordion = '';

function show(param)
{
    xmlhttp=new XMLHttpRequest();
    //xmlhttp.open("POST","http://localhost:8080/Ewindow/Servlet?");
    xmlhttp.open("POST","http://localhost:8080/Ewindow/Servlet?name=" + param);
    xmlhttp.send();

    xmlhttp.onreadystatechange=function()
    {
        document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
    } 
}

function runAccordion(index)
{
  var nID = "Accordion" + index + "Content";
  if(openAccordion == nID)
    nID = '';
   
  setTimeout("animate(" + new Date().getTime() + "," + TimeToSlide + ",'"
      + openAccordion + "','" + nID + "')", 33);
 
  openAccordion = nID;
}
function animate(lastTick, timeLeft, closingId, openingId)
{  
  var curTick = new Date().getTime();
  var elapsedTicks = curTick - lastTick;
 
  var opening = (openingId == '') ? null : document.getElementById(openingId);
  var closing = (closingId == '') ? null : document.getElementById(closingId);
 
  if(timeLeft <= elapsedTicks)
  {
    if(opening != null)
      opening.style.height = ContentHeight + 'px';
   
    if(closing != null)
    {
      closing.style.display = 'none';
      closing.style.height = '0px';
    }
    return;
  }
 
  timeLeft -= elapsedTicks;
  var newClosedHeight = Math.round((timeLeft/TimeToSlide) * ContentHeight);

  if(opening != null)
  {
    if(opening.style.display != 'block')
      opening.style.display = 'block';
    opening.style.height = (ContentHeight - newClosedHeight) + 'px';
  }
 
  if(closing != null)
    closing.style.height = newClosedHeight + 'px';

  setTimeout("animate(" + curTick + "," + timeLeft + ",'"
      + closingId + "','" + openingId + "')", 33);
}