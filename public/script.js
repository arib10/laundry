const navClose = document.getElementById("navclose");
const navOpen = document.getElementById("navopen");
const nav = document.querySelector("nav");
const content = document.querySelector("div.content");
const printBtn = document.querySelector(".print-btn");


navClose.onclick = () => {
    nav.style.width = "0px";
    content.style.marginLeft = "20px"
}
navOpen.onclick = () => {
    if (window.innerWidth <= 650) {
        nav.style.width = "250px";
        content.style.marginLeft = "20px"
    } else {
        nav.style.width = "250px";
        content.style.marginLeft = "250px";
    }
}
printBtn.onclick = () => {
    window.print();
}
window.onresize = () => {
    console.log(screen.width, "screen width");
    console.log(window.innerWidth, "window inner width");
    console.log(screen.availWidth, "screen avail width");
}