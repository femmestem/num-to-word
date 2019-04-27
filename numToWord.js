// Melroy: write out all the unique kinds of words you will need
const singlesWords = {
  0: "zero",
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
   *
   * Melroy:
   * First, solve for the smallest input (singles).
   * Second, solve for two-digits when the 'tens' input is 1.
   * Third, solve for two-digits when the 'tens' input is not 1.
   * Last, form the string.
  */
  numWord += dblDigitToWord(tensInput, onesInput)

  return numWord
}

const dblDigitToWord = (tens, ones) => {
  return singlesWords[ones]
}
