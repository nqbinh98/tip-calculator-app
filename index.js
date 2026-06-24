const billInput = document.querySelector('.bill-number');
const peopleInput = document.querySelector('.people-number');
const wrapperPeopleInput = document.querySelector('.input-wrapper-people');
const allBtnPercent = document.querySelectorAll('.percent-btn');
const customBtn = document.querySelector('.custom-btn');
const resultTip = document.querySelector('.result-tip');
const resultTotal = document.querySelector('.result-total');
const resetBtn = document.querySelector('.reset-btn');
const container = document.querySelector('.container');
const errorMsg = document.querySelector('.error-msg');

let billValue = 0;
let tipPercentage = 0;
let peopleAccount = 0;

container.addEventListener('click', function (e) {
    if (e.target.classList.contains('percent-btn')) {
        if (e.target.classList.contains('active')) {
            return;
        } else {
            allBtnPercent.forEach(btn => {
                btn.classList.remove('active');
            });
            customBtn.value = ``;
            e.target.classList.add('active');
            tipPercentage = Number(e.target.dataset.percent);
            calculateAndRender();
        }  
    } else if (e.target.classList.contains('people-number')) {
        wrapperPeopleInput.classList.remove('error');
        errorMsg.classList.add('hide');
    }
})

peopleInput.addEventListener('blur', function (e) {
    const peopleAccountTemp = Math.floor(Number(e.target.value));
    if (peopleAccountTemp === Number(e.target.value)) {
        return; 
    } else if (e.target.value === '') {
        e.target.value = 0;
    } else {
        peopleAccount = peopleAccountTemp;
        e.target.value = peopleAccount;
    }
    calculateAndRender();
})

container.addEventListener('input', function (e) {
    if (e.target.classList.contains('bill-number')) {
        billValue = Number(e.target.value);
    } else if (e.target.classList.contains('people-number')) {
        peopleAccount = Math.floor(Number(e.target.value));
    } else if (e.target.classList.contains('custom-btn')) {
        removeActivePercentageBtn();
        tipPercentage = Number(e.target.value);
    }
    calculateAndRender();
})

resetBtn.addEventListener('click', reset);

function calculateAndRender () {
    if (billValue === 0 && tipPercentage === 0 && peopleAccount === 0) {
        resetBtn.disabled = true;
    } else {
        resetBtn.disabled = false;
    }
    let tipAmountPerPerson = 0;
    let totalPerPerson = 0;
    billValue = Math.max(0, billValue);
    tipPercentage = Math.max(0, tipPercentage);
    peopleAccount = Math.max(0, peopleAccount);

    if (peopleAccount <= 0) {
        wrapperPeopleInput.classList.add('error');
        errorMsg.classList.remove('hide');
        return;
    } else {
        wrapperPeopleInput.classList.remove('error');
        errorMsg.classList.add('hide');
        tipAmountPerPerson = ((billValue * tipPercentage / 100) / peopleAccount).toFixed(2);
        totalPerPerson = ((billValue + (billValue * tipPercentage / 100)) / peopleAccount).toFixed(2);
        resultTip.innerHTML = `$${tipAmountPerPerson}`;
        resultTotal.innerHTML = `$${totalPerPerson}`;
    }
}

function removeActivePercentageBtn () {
    allBtnPercent.forEach(btn => {
        btn.classList.remove('active')
    })
}

function reset() {
    resultTip.innerHTML = `$0.00`;
    resultTotal.innerHTML = `$0.00`;
    billValue = 0;
    tipPercentage = 0;
    peopleAccount = 0;
    billInput.value = ``;
    peopleInput.value = ``;
    customBtn.value = ``;
    wrapperPeopleInput.classList.remove('error');
    errorMsg.classList.add('hide');
    resetBtn.disabled = true;
    removeActivePercentageBtn();
}