import aa from "./accountlog.js";

navbarimg.onclick = e => {
    if (navlist.style.left != "0px") {
        navlist.style.left=0;
    } else {
        navlist.style.left="-20vw";
    }
}

let selMoney = 0;
money.onkeyup = e => {
    if (e.keyCode == 13) {
        if (e.target.value.match(/^[0-9]+$/)) {
            if(ckin.checked) {
                selMoney = +e.target.value;
            } else if(ckout.checked) {
                selMoney = -e.target.value;
            }
            e.target.value = '';
        } else {
            e.target.value = "잘못된 금액인데요";
            setTimeout(()=> {
                e.target.value =''
            },2000)
        }
    }
}

const currentDateValue = new Date().toISOString().substring(0, 10);
seldate.value = currentDateValue;
seldate.setAttribute("max",currentDateValue);

let selDate = currentDateValue;
seldate.onchange = e => {
    selDate = e.target.value;
}
