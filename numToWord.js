const HumanReadableNumber = (() => {
// Melroy: write out all the unique kinds of words you will need
const singlesWords = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine"
}

const uniqueTensWords = {
  0: "ten",
  1: "eleven",
  2: "twelve",
  3: "thirteen",
  4: "fourteen",
  5: "fifteen",
  6: "sixteen",
  7: "seventeen",
  8: "eighteen",
  9: "nineteen"
}

const wholeTensWords = {
  2: "twenty",
  3: "thirty",
  4: "forty",
  5: "fifty",
  6: "sixty",
  7: "seventy",
  8: "eighty",
  9: "ninety"
}

const intToWord = (num) => {
  const numArr = String(num)
    .split('')
    .reverse()
  // Known bounds: 0 - 99999
  // For v1, input string will never have more than 5 digits
  const onesInput = numArr[0]
  const tensInput = numArr[1]
  const hundredsInput = numArr[2]
  const thousandsInput = numArr[3]
  const tenThousandsInput = numArr[4]
  let numWord = ''
  /*
   * Melroy: mentally frame the word output like this:
   * "fourteen thousand two hundred and fifteen"
   * [fn(a,b)] thousand [c] hundred and [fn(d,e)]
   * [a, b, c, d, e]
   * [1, 4, 2, 1, 5]
   */
  if (num === 0) { return "zero" }
  if (num > 9999) {
    let factorThousand = dblDigitToWord(tenThousandsInput+thousandsInput)
    numWord +=  factorThousand ? factorThousand + ' thousand ' : ''
  }
  if (num > 999 && num <= 9999) {
    let factorThousand = dblDigitToWord(thousandsInput)
    numWord +=  factorThousand ? factorThousand + ' thousand ' : ''
  }
  if (num > 99) {
    let factorHundred = dblDigitToWord(hundredsInput)
    let factorTens = dblDigitToWord(tensInput + onesInput)
    numWord += factorHundred.length > 0 ? factorHundred + ' hundred' : ''
    numWord += factorTens.length > 0 ? ' and ' : ''
  }
  if (num > 9) { numWord += dblDigitToWord(tensInput + onesInput) }
  if (num <= 9) { numWord += dblDigitToWord(onesInput) }
  return numWord.trim()
}

const dblDigitToWord = (numStr) => {
    let num = parseInt(numStr)
    let tensIndex = numStr[0]
    let singlesIndex = (
      num < 10
        ? num
        : numStr[1]
    )
    if (num < 10 && num > 0) { return singlesWords[singlesIndex] }
    if (num > 9 && num < 20) { return uniqueTensWords[singlesIndex] }
    if(singlesIndex === '0') { return wholeTensWords[tensIndex] }
    if (num > 19) {
      return (
        `${wholeTensWords[tensIndex]}-${singlesWords[singlesIndex]}`
      )
    }
    return ''
}
// Explicitly reveal public pointers to the private functions we want to expose
  return {
    intToWord: intToWord
  }
})()

// TESTS BELOW
// Passing tests are `true`
HumanReadableNumber.intToWord(-0) === 'zero'
HumanReadableNumber.intToWord(0) === 'zero'
HumanReadableNumber.intToWord(1) === 'one'
HumanReadableNumber.intToWord(11) === 'eleven'
HumanReadableNumber.intToWord(24) === 'twenty-four'
HumanReadableNumber.intToWord(40) === 'forty'
HumanReadableNumber.intToWord(300) === 'three hundred'
HumanReadableNumber.intToWord(301) === 'three hundred and one'
HumanReadableNumber.intToWord(321) === 'three hundred and twenty-one'
HumanReadableNumber.intToWord(5000) === 'five thousand'
HumanReadableNumber.intToWord(5001) === 'five thousand and one'
HumanReadableNumber.intToWord(5100) === 'five thousand one hundred'
HumanReadableNumber.intToWord(14215) === 'fourteen thousand two hundred and fifteen'
