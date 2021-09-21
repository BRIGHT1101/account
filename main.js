import aa from "./accountlog.js";

let getlogs;

if (localStorage.getItem("logs") == null) {
    getlogs = [];
} else {
    getlogs = JSON.parse(localStorage.getItem("logs"));
}

let selMoney = 0;

moneysubmit.onclick = e => {
    e.preventDefault();
    if (money.value.match(/^[0-9]+$/)) {
        if(ckin.checked) {
            selMoney = +money.value;
        } else if(ckout.checked) {
            selMoney = -money.value;
        }
        getlogs.push({"storagedate" : selDate, "storagemoney" : selMoney})
        localStorage.setItem("logs",JSON.stringify(getlogs));
        money.value = '';
        addcomplete.style.display = "block";
        setTimeout(()=>{
            addcomplete.style.display = "none";
        },2000);
    } else {
        money.value = '';
        money.placeholder = "숫자를 입력해주세요"
        money.style.border = "2px solid red"
        setTimeout(()=> {
            money.style.border = "";
            money.placeholder = "금액을 입력하세요";
        },2000)
    }
}

const currentDateValue = new Date().toISOString().substring(0, 10);
seldate.value = currentDateValue;
seldate.setAttribute("max",currentDateValue);

let selDate = currentDateValue;
seldate.onchange = e => {
    selDate = e.target.value;
}

selmonth.value = new Date().toISOString().substring(0, 7);

chapbutton2.onclick = e=> {
    let total = 0;
    loglist.innerHTML = '';
    JSON.parse(localStorage.getItem("logs")).forEach(element => {
        if (element.storagedate.slice(0,7) == new Date().toISOString().substring(0, 7)) {
            const li = document.createElement("li");
            const sdate = document.createElement("div");
            const smoney = document.createElement("div");
            sdate.innerText = element.storagedate.slice(8,10) + "일";
            total += element.storagemoney;
            if (element.storagemoney > 0) {
                smoney.style.color = "red";
            } else {
                smoney.style.color = "blue";
            }
            smoney.innerText = element.storagemoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+ " ￦";
            li.appendChild(sdate);
            li.appendChild(smoney);
            loglist.appendChild(li);
        }
    });
    const stotal = document.createElement("div");
    stotal.setAttribute("id","stotal");
    stotal.innerText =total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+ " ￦";
    if (loglist.children.length) {
        if (total > 0) {
            stotal.style.color = "red";
        } else {
            stotal.style.color = "blue";
        }
        loglist.appendChild(stotal);
    } else {
        const emptytext = document.createElement("div");
        emptytext.setAttribute("id","emptytext");
        emptytext.innerText= "지출 내역이 없습니다";
        loglist.appendChild(emptytext);
    }
    
}

selmonth.onchange = e => {
    let total = 0;
    loglist.innerHTML = '';
    JSON.parse(localStorage.getItem("logs")).forEach(element => {
        if (element.storagedate.slice(0,7) == e.target.value) {
            const li = document.createElement("li");
            const sdate = document.createElement("div");
            const smoney = document.createElement("div");
            if (element.storagemoney > 0) {
                smoney.style.color = "red";
            } else {
                smoney.style.color = "blue";
            }
            sdate.innerText = element.storagedate.slice(8,10) + "일";
            smoney.innerText = element.storagemoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+ " ￦";
            total += element.storagemoney;
            li.appendChild(sdate);
            li.appendChild(smoney);
            loglist.appendChild(li);
        }
    });
    const stotal = document.createElement("div");
    stotal.setAttribute("id","stotal");
    stotal.innerText =total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+ " ￦";
    if (loglist.children.length) {
        if (total > 0) {
            stotal.style.color = "red";
        } else {
            stotal.style.color = "blue";
        }
        loglist.appendChild(stotal);
    } else {
        const emptytext = document.createElement("div");
        emptytext.setAttribute("id","emptytext");
        emptytext.innerText= "지출 내역이 없습니다";
        loglist.appendChild(emptytext);
    }
}

let slist = "기타";
let premoney = 0;

listsel.onchange = e => {
    slist = e.target.value;
}

predictmoney.onchange = e => {
    premoney = e.target.value;
}

let predictmoneylist;

if (localStorage.getItem("predict")) {
    predictmoneylist = JSON.parse(localStorage.getItem("predict"));
} else {
    predictmoneylist = [];
}


let pretotal = 0;

premoneysub.onclick = e => {
    e.preventDefault();
    predicted.innerHTML = '';
    if (localStorage.getItem("predict")) {
        predictmoneylist = JSON.parse(localStorage.getItem("predict"));
    }

    if (predictmoneylist==[]){
        predictmoneylist.push(JSON.parse(localStorage.getItem("predcit")));
    }
    if (premoney) {
        predictmoneylist.push({"kinds" : slist, "predictedmoney" : premoney});
        localStorage.setItem("predict",JSON.stringify(predictmoneylist));
    }
    predictmoney.value ='';
    premoney=0;

    const a = JSON.parse(localStorage.getItem("predict"));
    pretotal = 0;
    a.map(v => {
        pretotal += +v.predictedmoney;
        prelistfunc(v);
    })
    localStorage.setItem("pretotalmoney",pretotal);
    predicted.innerHTML += `<div>총 ${localStorage.getItem("pretotalmoney").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</div>`;
    
}

const a = JSON.parse(localStorage.getItem("predict"));
if (a != null) {
    a.map(v => {
        prelistfunc(v);
    })
    predicted.innerHTML += `<div>총 ${localStorage.getItem("pretotalmoney").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</div>`
}

function prelistfunc(v) {
        predicted.innerHTML += `<li><div>${v.kinds} :</div><div><div>${v.predictedmoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</div><div class="prelistclose"><img width="21px" height="21px" src="https://cdn-icons-png.flaticon.com/512/660/660252.png"></div></div></li>` ;
}

predicted.onclick = e => {
    if (e.target.tagName == "IMG") {
        const a = JSON.parse(localStorage.getItem("predict"));
        const b = a[[Array.from(e.target.parentNode.parentNode.parentNode.parentNode.children).indexOf(e.target.parentNode.parentNode.parentNode)]].predictedmoney;
        pretotal = +pretotal - +b;
        localStorage.setItem("pretotalmoney",pretotal);
        a.splice([Array.from(e.target.parentNode.parentNode.parentNode.parentNode.children).indexOf(e.target.parentNode.parentNode.parentNode)],1);
        localStorage.setItem("predict",JSON.stringify(a));
        e.target.parentNode.parentNode.parentNode.remove();
        predicted.lastChild.innerHTML = `<div>총 ${localStorage.getItem("pretotalmoney").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</div>`;
    }
}