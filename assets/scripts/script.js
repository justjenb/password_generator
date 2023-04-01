// GIVEN I need a new, secure password
// WHEN I click the button to generate a password
// THEN I am presented with a series of prompts for password criteria
// WHEN prompted for password criteria
// THEN I select which criteria to include in the password
// WHEN prompted for the length of the password
// THEN I choose a length of at least 8 characters and no more than 128 characters
// WHEN asked for character types to include in the password
// THEN I confirm whether or not to include lowercase, uppercase, numeric, and/or special characters
// WHEN I answer each prompt
// THEN my input should be validated and at least one character type should be selected
// WHEN all prompts are answered
// THEN a password is generated that matches the selected criteria
// WHEN the password is generated
// THEN the password is either displayed in an alert or written to the page

// Assignment code here

const uppercaseLetters = document.querySelector("#uppercase");
// "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = document.querySelector("#lowercase");
// uppercaseLetters.toLowerCase();
const numbers = document.querySelector("#numbers");
// "1234567890";
const specialCharacters = document.querySelector("#special");
// "!#$%&()*+,-./:;<=>?@[\]^_`{|}~";
const pwMinMaxBar = document.querySelector("#pwminmaxbar");
// "8", "132" / range
const pwLength = document.querySelector("#pwlenthresultbox");
// Selected
const passwordText = document.querySelector("#password");
// final password 

pwMinMaxBar.addEventListener("change", (event) => {
  pwLength.innerText = event.target.value;
});

function getRandomUppercase() {
  const upperL = "!@#$%^&*()[]=<>.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function getRandomSymbols {
  const symbols = "!#$%&()*+,-./:;<=>?@[\]^_`{|}~";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

console.log(uppercaseLetters);
console.log(lowercaseLetters);
console.log(numbers);
console.log(specialCharacters);

function generatePassword() {

}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
