// assign elements from html page for uppercase, lowercase, numbers, special characters
const uppercaseLetters = document.querySelector("#uppercase");
const lowercaseLetters = document.querySelector("#lowercase");
const numbersBox = document.querySelector("#numberbox");
const specialCharacters = document.querySelector("#special");

//  password length slider bar
const pwLengthSlider = document.querySelector("#pwlengthslider");

// assign password length slider bar
const pwLengthResult = document.querySelector("#pwlenthresultbox");

// generate password button
const generateBtn = document.querySelector("#generate-btn");

// password field
const finalPassword = document.querySelector("#password");

// copy button
const copyPassword = document.querySelector("#copy-btn");

// setting some global variables
const copy = (text) => navigator.clipboard.writeText(text);
let useUppercase;
let useLowercase;
let useNumbers;
let useSymbols;
let passwordLength;

// basic function to shuffle an array
function shuffleArray(array) {
  array.sort(() => Math.random() - 0.5);
}

// prompt for how long the password will be
function promptLengthInput() {
  let lengthInput = parseInt(
    window.prompt("Enter password length between 8 and 128:")
  );
  if (lengthInput >= 8 && lengthInput <= 128) {
    passwordLength = lengthInput;
  } else {
    alert(
      "Invalid length. Password length must be between 8 and 128 characters."
    );
    promptLengthInput();
  }
}

// set options array with window prompts to confirm / true/false with user input on which values to use in the password
// using Object.values on the options array to get the length of the boolean values (how many have been chosen/which have been chosen)
function promptPwConfigInput() {
  const options = {
    useUppercase: window.confirm(
      "Do you want to include uppercase letters?\nClick OK for yes or Cancel for no."
    ),
    useLowercase: window.confirm(
      "Do you want to include lowercase letters?\nClick OK for yes or Cancel for no."
    ),
    useNumbers: window.confirm(
      "Do you want to include numbers?\nClick OK for yes or Cancel for no."
    ),
    useSymbols: window.confirm(
      "Do you want to include symbols?\nClick OK for yes or Cancel for no."
    ),
  };

  // calculates the number of true results in the previous options statement
  const optionCount = Object.values(options).filter(Boolean).length;

  // forces the user to pick at least two options
  if (optionCount <= 1) {
    alert("Please choose at least two options.");
    return promptPwConfigInput();
  }

  // forces the user to pick uppercase or lowercase letters and not just numbers or symbols
  if (!options.useUppercase && !options.useLowercase) {
    alert("You must use uppercase or lowercase letters.");
    return promptPwConfigInput();
  }

  return options;
}

// generate the new password
function generatePassword(options) {
  let finalPassword = "";

  // converting characters from unicode using String.fromCharCode
  const getRandomUpper = () =>
    String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  const getRandomLower = () =>
    String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  const getRandomNumber = () =>
    String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  const getRandomSymbol = () =>
    "!@#$%^&*()_+-=[]{}|;':\",.<>?/".charAt(Math.floor(Math.random() * 28));

  // declaring the selectedOptions array and the push of random characters if selected
  let selectedOptions = [];
  if (options.useUppercase) selectedOptions.push(getRandomUpper);
  if (options.useLowercase) selectedOptions.push(getRandomLower);
  if (options.useNumbers) selectedOptions.push(getRandomNumber);
  if (options.useSymbols) selectedOptions.push(getRandomSymbol);

  // shuffles the initial selectedOptions array of characters, or they would come out in the same order each time
  shuffleArray(selectedOptions);

  // ensures that for each of the true selected options it gets added to the finalPassword, e.g. if upper, numbers,
  // symbols were selected, only upper and numbers may come out if this were not configured
  for (const option of selectedOptions) {
    finalPassword += option();
  }

  // iterates through all of the selected options and randomly chooses one to add to the end of the finalPassword until the length of the password is reached
  for (let i = selectedOptions.length; i < passwordLength; i++) {
    const randomFunc =
      selectedOptions[
        Math.floor(
          (crypto.getRandomValues(new Uint32Array(1))[0] / 0x100000000) *
            selectedOptions.length
        )
      ];
    finalPassword += randomFunc();
  }

  // returns the finalPassword
  return finalPassword;
}

// copy password to the clipboard
copyPassword.addEventListener("click", () => {
  copy(finalPassword.value);
  alert("Copied to clipboard.");
});

// generate button to start process
generateBtn.addEventListener("click", () => {
  // prompts for lengthInput
  promptLengthInput();
  // prompts for pwConfigInput which guides the user through option selection
  const options = promptPwConfigInput();
  // calls the generatePassword function with the chosen final options
  const generatedPassword = generatePassword(options);
  // sets the final password value
  password.value = generatedPassword;
});
