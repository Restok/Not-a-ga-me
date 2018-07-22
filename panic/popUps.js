var popup;
var close;
function newPopUp(source){
  document.getElementById("setting").src = source;
}

function createPopUp(source, alt){
	close = document.createElement("button");
	close.setAttribute("class", "closeButton");
	close.setAttribute("id", "close");
	popup = document.createElement("IMG");
    popup.setAttribute("src", source);
    popup.setAttribute("width", 800);
    popup.setAttribute("height", 500);
    popup.setAttribute("alt", alt);
    popup.setAttribute("class", "scenes");
    popup.setAttribute("id", "setting");
    document.getElementById("popUpParent").appendChild(popup);
    document.getElementById("popUpParent").appendChild(close);
}

