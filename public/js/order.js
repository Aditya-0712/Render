var date = document.getElementsByTagName("input")[5];
const d = new Date();
date.value = d; 

var sub = document.getElementsByTagName('input')[4];
var input = document.getElementsByTagName('input');
var text = document.getElementsByTagName('textarea')[0];

for (let i=0; i<3; i++)
{
    input[i].addEventListener('input', () => {
        if(input[0].value!="" && input[1].value!="" && input[2].value.length==10 && text.value!="")
        {
            sub.style.backgroundColor = 'blue';
            sub.style.pointerEvents = 'all';
        }
        else
        {
            sub.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
            sub.style.pointerEvents = 'none';
        }
    })
}

text.oninput = () => {
    if(input[0].value!="" && input[1].value!="" && input[2].value.length==10 && text.value!="")
    {
        sub.style.backgroundColor = 'blue';
        sub.style.pointerEvents = 'all';
    }
    else
    {
        sub.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
        sub.style.pointerEvents = 'none';
    }
}

var nullDown = document.querySelectorAll(".pay img");
for (let j=1; j<10; j=j+2)
{
    nullDown[j].style.visibility = 'hidden';
}

var pay = document.getElementsByClassName("pay")[0];
pay.style.backgroundColor = 'rgba(255, 127, 80, 0.1)';

var mode = document.getElementsByClassName("mode")[0];
var down = document.getElementsByClassName("down")[0];

pay.onclick = () => {
    if (mode.style.maxHeight != 'fit-content')
    {
        mode.style.maxHeight = 'fit-content';
        mode.style.overflowY = 'default';
        down.style.transform = 'rotate(180deg)';
    }
    else 
    {
        mode.style.maxHeight = '53.67px';
        mode.style.overflowY = 'hidden';
        down.style.transform = 'none';
    }
}

var allPay = document.getElementsByClassName("pay");
var val = document.getElementsByClassName("val");
var payInp = document.getElementsByTagName("input")[3];

for (let i=1; i<allPay.length; i++)
{
    allPay[i].addEventListener("click", () => {
        if (val[i].innerHTML == 'Cash On Delivery') {payInp.value = 'cash_on_delivery'}
        else if (val[i].innerHTML == 'Netbanking') {payInp.value = 'netbanking'}
        else if (val[i].innerHTML == 'UPI Payment') {payInp.value = 'upi'}
        else if (val[i].innerHTML == 'Credit Card') {payInp.value = 'credit_card'}
        else if (val[i].innerHTML == 'Debit Card') {payInp.value = 'debit_card'}

        let temp = allPay[0].innerHTML;
        allPay[0].innerHTML = allPay[i].innerHTML;
        allPay[i].innerHTML = temp;

        mode.style.maxHeight = '53.67px';
        mode.style.overflowY = 'hidden';
        down.style.transform = 'none';
    })
}

input[2].oninput = () => {
    if (input[2].value.length >10)
    {
        let temp = (input[2].value).substring(0,10);
        input[2].value = temp;
    }
}