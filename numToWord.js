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

  const intString = (num) => {
    const parsedInt = parseInt(num)
    // Checks if input is NaN (NaN is only primitive object not equal to itself)
    return parsedInt === parsedInt ? String(parsedInt) : ''
  }

  /*
   * Melroy: mentally frame the word output like this:
   * "fourteen thousand two hundred and fifteen"
   * [fn(a,b)] thousand [c] hundred and [fn(d,e)]
   * [a, b, c, d, e]
   * [1, 4, 2, 1, 5]
   */
  const dblDigitToWord = (numStr, multiplierType = '') => {
    let num = parseInt(numStr)
    let tensIndex = numStr[0]
    let singlesIndex = (
      num < 10
        ? num
        : numStr[1]
    )
    if (num === 0) { return '' }
    if (num < 10 && num > 0) {
      return singlesWords[singlesIndex] + multiplierType
    }
    if (num > 9 && num < 20) {
      return uniqueTensWords[singlesIndex] + multiplierType
    }
    if(singlesIndex === '0') { return wholeTensWords[tensIndex] }
    if (num > 19) {
      return (
        `${wholeTensWords[tensIndex]}-${singlesWords[singlesIndex]}${multiplierType}`
      )
    }
    return ''
  }

  const intToWord = (num) => {
    const numArr = intString(num)
      .split('')
      .reverse()
    // Known bounds: 0 - 99999
    // For v1, input string will never have more than 5 digits
    const onesInput = numArr[0] ||'0'
    const tensInput = numArr[1] ||'0'
    const hundredsInput = numArr[2] ||'0'
    const thousandsInput = numArr[3] ||'0'
    const tenThousandsInput = numArr[4] ||'0'
    let numWord = ''

    if (num === 0) { return "zero" }
    if (num > 999) {
      numWord += dblDigitToWord(tenThousandsInput + thousandsInput, ' thousand ')
    }
    if (num > 99) {
      numWord += dblDigitToWord(hundredsInput, ' hundred ')
      numWord += (
        dblDigitToWord(tensInput + onesInput).length > 0
          ? 'and '
          : ''
      )
    }
    if (num > 0) {
      numWord += dblDigitToWord(tensInput + onesInput)
    }
    return numWord.trim()
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

// Silently fail on bad input data types
// Passing tests are `true`
HumanReadableNumber.intToWord('dog') === ''
HumanReadableNumber.intToWord(-1) === ''
HumanReadableNumber.intToWord({}) === ''
HumanReadableNumber.intToWord([]) === ''
HumanReadableNumber.intToWord() === ''
HumanReadableNumber.intToWord(null) === ''
HumanReadableNumber.intToWord(undefined) === ''
HumanReadableNumber.intToWord(NaN) === ''
