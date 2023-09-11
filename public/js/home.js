var searchbar = document.getElementsByTagName("input")[0];
var search = document.getElementsByClassName("search")[0];

searchbar.onfocus = () => {
    search.style.borderColor = "blue";
}

searchbar.onblur = () => {
    search.style.borderColor = "rgba(114, 114, 114, 0.5)";
}

var pc_opt = document.getElementsByClassName("pc_opt");
var text = document.querySelectorAll(".pc_opt p");

for (let i=0; i<pc_opt.length; i++)
{
    pc_opt[i].addEventListener("mouseover", () => {
        text[i].style.color = "rgb(255,95,51)";
    })

    pc_opt[i].addEventListener("mouseout", () => {
        text[i].style.color = "#3A3A3A";
    })
}