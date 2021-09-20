import aa from "./accountlog.js";

navbarimg.onclick = e => {
    if (navlist.style.left != "0px") {
        navlist.style.left=0;
    } else {
        navlist.style.left="-20vw";
    }
}



money.onkeyup = e => {
    if (e.keyCode == 13) {
        if (e.target.value.match(/^[0-9]+$/)) {
            if(ckin.checked) {
                console.log(+e.target.value);
            } else if(ckout.checked) {
                console.log(-e.target.value);
            }
            e.target.value = '';
        } else {
            e.target.style.border = "red 2px solid";
            e.target.value = '';
            setTimeout(() => {
                e.target.style.border = "";
            }, 2000);
        }
    }
}
