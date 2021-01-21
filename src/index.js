// ATM-money withdraw
// 10 * 1000 + 2 * 2000 + 2 * 500 + 5 * 100 = 15,500
let currencyStack = {
  thousand: 10,
  twothousand: 2,
  fivehundred: 3,
  hundred: 5
};
let note = {
  1000: "thousand",
  2000: "twothousand",
  500: "fivehundred",
  100: "hundred"
};
let atm = {};
let total_amount = 0;
function getNoteText(number) {
  return note[number];
}
function money_split(money) {
  let currencyStack_dup = {};
  Object.assign(currencyStack_dup, currencyStack);
  let money_count = 0;
  var s_note = Object.keys(note).sort(function (a, b) {
    return b - a;
  });
  s_note.forEach((element) => {
    let count = parseInt(money / element);
    if (count >= 1) {
      if (currencyStack_dup[getNoteText(element)] >= count) {
        currencyStack_dup[getNoteText(element)] -= count;
        atm[note[element]] = count;
        money -= element * count;
        money_count += element * count;
      } else {
        if (currencyStack_dup[getNoteText(element)] > 0) {
          atm[note[element]] = currencyStack_dup[getNoteText(element)];
          money -= element * currencyStack_dup[getNoteText(element)];
          money_count += element * currencyStack_dup[getNoteText(element)];
          currencyStack_dup[getNoteText(element)] = 0;
        }
      }
    }
  });
  if (money_count === total_amount) {
    currencyStack = currencyStack_dup;
    return atm;
  } else return {};
}

function withdraw(money) {
  total_amount = money;
  atm = {};
  return money_split(money);
}

console.log(withdraw(900)); // expected return { fivehundred: 1, hundred: 4 }
console.log(withdraw(200)); // expected return {}
console.log(withdraw(10000)); // expected return {twothousand: 2, thousand: 6}

//  1500

// 500 x 3  = 3
// 500 x 1  + 1000 x 1 = 2
// 100 x 15  = 15
// output the minimum denomiation= 2 is less than 3

// 500 x 3  = 3
// output the minimum denomiation 3
