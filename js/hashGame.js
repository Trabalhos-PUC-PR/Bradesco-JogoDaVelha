function toggleColor(element) {
    color = element.style.background;
    if (color == "red") {
        element.style.background = "";
    } else { 
        element.style.background = "red";
    }
}