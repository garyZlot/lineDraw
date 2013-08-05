if (!titleDiv) {
    titleDiv = $('<div>' + this.config.title + '</div>');
    $(container).append(titleDiv);
}
titleDiv.css({
    position:"absolute",
    width:60,
    left:x+10,
    top:y + 85
});
titleDiv.css("text-align", "center");