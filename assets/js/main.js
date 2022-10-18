// Arrays containing all possible characters from each type of character
const letters = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '012356789';
const specialChars = '!@#$%^&*()-_=+~';
const LENGTH_PROMPT = "Enter a number between 8 and 128";


// Password object to be used to store the password data for generation
const password = {
  length: 8, // default length set to 8 in case validation fails somehow
  lower: true, // should password allow lowercase letters?
  upper: true, // should password allow uppercase letters?
  numeric: true, // should password allow numbers?
  special: true, // should password allow special characters?
  result: ''
}

// will return a random number between min (inclusive) and max (exclusive)
const rng = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
}

document.getElementById('generate').addEventListener('click', (e) => {
  let pass = getCriteria(password);
  generatePassword(pass);

});
// Send prompts and confirm windows to the user to set the criteria for password to be generated
const getCriteria = (pass) => {
  // returns the length of the password if the data is valid, otherwise recursively calls itself to keep prompting until the valid data is entered.
  let length = 0;
  let validateLength = () => {
    length = prompt(LENGTH_PROMPT);
    console.log(length);
    // checks if the prompt value is a number
    if (length !== null) {

      if (!isNaN(length)) {
        if (length < 8 || length > 128) {
          // Ternary statement to determine the error message
          let message = length < 8 ? 'Please enter a number above 8.' : 'Please enter a number below 128.';
          alert(message);
          validateLength();
        }
      } else if (isNaN) { // if the prompt value is not a number
        alert('Please enter a numerical value')
        validateLength();
      }
    } else {
      return null;
    }
    return length;
  }

  // Prompt user for the password length between 8 and 128
  let passLength = validateLength();
  if (passLength != null) {
    pass.length = passLength;
    // prompt other criteria
    pass.lower = confirm('Should we use lowercase?');
    pass.upper = confirm('Should we use uppercase?');
    pass.numeric = confirm('Should we use numbers?');
    pass.special = confirm('Should we use special characters?');
    console.log(pass);
    return pass;
  } else {
    return;
  }
}
// Generates a password from the data passed from the pass (Object) parameter
const generatePassword = (pass) => {
  let length = pass.length;
  let acceptedChars = ''
  let lower = pass.lower;
  let upper = pass.upper;
  let numeric = pass.numeric;
  let special = pass.special;
  let result = '' // the variable the final password will be in

  if (lower || upper) {
    acceptedChars += letters;
  }
  if (numeric) {
    acceptedChars += numbers;
  }
  if (special) {
    acceptedChars += specialChars;
  }
  acceptedChars = acceptedChars.split(''); // converts to array
  console.log(acceptedChars);

  // Password generation step 
  for(let i = 0; i < length; i++) {
    let char = acceptedChars[rng(0, acceptedChars.length)];
    if(isNaN) {
      if(letters.includes(char)) {
        let randNum = rng(0, 2);
        if((randNum === 1 && upper) || !lower) // makes letter uppercase if the random num is 1, or if lowercase letters aren't included 
        {
          char = char.toUpperCase();
        } 
      }
    }
    result+= char;
  }

  pass.result = result;
  displayPassword(pass);
}

const displayPassword = (pass) => {
  //alert(`Your generated password is \n\n ${pass.result}`);
  document.querySelector('#password-text').textContent = pass.result;
}