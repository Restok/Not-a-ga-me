var popup;
var close;
var ia;
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

function itemAcquired(){
	ia = document.createElement("IMG");
  ia.setAttribute("src", "assets/itemAcquired.png");
  ia.setAttribute("width", 800);
  ia.setAttribute("height", 245);
  ia.setAttribute("alt", " ");
  ia.setAttribute("class", "scenes");
  ia.setAttribute("id", "itemScreen");
  document.getElementById("popUpParent").appendChild(ia);
  $("#itemScreen").hide();
}