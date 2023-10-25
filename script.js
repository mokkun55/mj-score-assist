defaultpoint = 250;
sumpoint = defaultpoint * 400;
returnpoint = 300;

yakitori1 = 0;
yakitori2 = 0;
yakitori3 = 0;
yakitori4 = 0;
emptybox = -1;
let emptyBoxes = [];

karisum = 0;
firstpoint = 0;
first = -1;

toppoint = 20; //top賞

let Y1p = document.getElementById('Y1p');
let Y2p = document.getElementById('Y2p');
let Y3p = document.getElementById('Y3p');
let Y4p = document.getElementById('Y4p');

let type = document.getElementById('type');

let num1p = document.getElementById('1p');
let num2p = document.getElementById('2p');
let num3p = document.getElementById('3p');
let num4p = document.getElementById('4p');

type.addEventListener('change', function () {
    console.log('モード変更');
    if (type.checked) {
        //サンマ
        defaultpoint = 350;
        sumpoint = defaultpoint * 300;
        returnpoint = 400; //４万点返し

    } else {
        //ヨンマ
        defaultpoint = 250;
        sumpoint = defaultpoint * 400;
        returnpoint = 300;
    }
});

Y1p.addEventListener('change', function () {
    yakitori1 = -8;
    refresh();
});
Y2p.addEventListener('change', function () {
    yakitori2 = -8;
    refresh();
});
Y3p.addEventListener('change', function () {
    yakitori3 = -8;
    refresh();
});
Y4p.addEventListener('change', function () {
    yakitori4 = -8;
    refresh();
});

num1p.addEventListener('input', refresh); //数字入力されると更新
num2p.addEventListener('input', refresh);
num3p.addEventListener('input', refresh);
num4p.addEventListener('input', refresh);

function refresh() {
    // 配列を使って数値を取得
    const values = [
        Number(num1p.value) || 0,
        Number(num2p.value) || 0,
        Number(num3p.value) || 0,
        Number(num4p.value) || 0
    ];

    // 合計計算
    const sum = values.reduce((acc, value) => acc + value * 100, 0);
    const rest_point = sumpoint - sum;
    document.getElementById('rest_point').innerHTML = '残り' + rest_point + '点';

    const yakitori = [yakitori1, yakitori2, yakitori3, yakitori4];
    const results = [];

    for (let i = 0; i < values.length; i++) {
        results[i] = hantei(values[i] - returnpoint + yakitori[i]);
    }

    if (first != -1) {
        console.log('一位が存在');
        results[first] = hantei(firstpoint + toppoint);
    }

    document.getElementById('res1p').innerHTML = results[0];
    document.getElementById('res2p').innerHTML = results[1];
    document.getElementById('res3p').innerHTML = results[2];
    document.getElementById('res4p').innerHTML = results[3];
}


function totall() {
    let textboxes = [
        document.getElementById('1p').value,
        document.getElementById('2p').value,
        document.getElementById('3p').value,
        document.getElementById('4p').value
    ];



    for (let i = 0; i < textboxes.length; i++) {
        if (textboxes[i].trim() === "") {
            emptyBoxes.push(i);
        }
    }

    if (emptyBoxes.length >= 2) {
        alert("2つ以上空白を作らないでください");
    } else {
        console.log(Number(emptyBoxes));
        first = Number(emptyBoxes);
    }
    //ここから 点数処理 ーーー
    console.log(textboxes);
    //配列合計足し算する
    for (let j = 0; j < textboxes.length; j++) {
        karisum = karisum + Number(textboxes[j]);
    }



    firstpoint = (sumpoint - karisum*100)/100 ;

    textboxes[Number(emptyBoxes)] = firstpoint;
    console.log(firstpoint);

    refresh();
}

function hantei(number) {
    if (number > 0) {
        return '+' + number;
    } else if (number == 0) {
        return '±0';
    } else {
        return '-' + Math.abs(number);
    }
}