var content = document.getElementsByClassName("content");

for (let i=0; i<content.length; i++)
{
    if (content[i].style.height > "250px")
    {
        content[i].style.overflowY = "scroll";
    }
    else 
    {
        content[i].style.overflowY = "hidden";
    }
}