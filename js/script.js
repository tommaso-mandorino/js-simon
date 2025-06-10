// #region Constants declaration section

    // region Manual parameters constants

        // Minumum random number to generate
        const MIN_RANDOM_NUMBER = 1;

        // Maximum random number to generate
        const MAX_RANDOM_NUMBER = 50;

        // Total of random numbers
        const TOTAL_NUMBERS = 5;

        // Available seconds to the user for memorizing random numbers
        const AVAILABLE_SECONDS = 3

    // endregion Manual parameters constants

    // #region DOM elements

        // Countdown DOM element
        const countdownElement = document.getElementById('countdown');

        // Instructions DOM element
        const instructionsElement = document.getElementById('instructions');

        // Numbers list DOM element
        const numberListElement = document.getElementById('numbers-list');

        // Answers form DOM element
        const answersFormElement = document.getElementById('answers-form');

        // Message DOM element
        const messageElement = document.getElementById('message');

    // #endregion DOM elements

// #endregion Constants declaration section



// #region Function declaration section

    /**
     * Generate a random number between min and max
     * @param {number} min Minimum number value to generate
     * @param {number} max Maximum number value to generate
     * @returns {number} Random generated number
     */
    function random(min, max) {

        return Math.floor(Math.random() * (max - min + 1) ) + min;

    }

    /**
     * Change message output
     * @param {string} cssClass CSS class to add to message
     * @param {string} messageText Text to add to message
     */
    function changeMessage(cssClass, messageText) {

        // Remove default text danger class from message DOM element (not touching HTML file)
        messageElement.classList.remove('text-danger');

        // Add message DOM element text color class
        messageElement.classList.add(cssClass);

        // Change message DOM element text
        messageElement.innerText = messageText;

    }

    /**
     * Check if an input number is valid
     * @param {number} number Number to validate
     * @returns {boolean} Validation result
     */
    function isValidInput(number) {

        // IF number is equal to 0 (which means the input is empty and been converted to 0)
        if (number === 0) {

            // Change message output
            changeMessage('text-danger', 'Riempi tutti i campi!');
            
            // Return input is not valid
            return false;
            
        }
        // ELSE (number is filled)
        else {

            // IF inserted number is not a valid number
            if (isNaN(number) === true) {

                // Change message output
                changeMessage('text-danger', 'Inserisci solo numeri!');
                
                // Return input is not valid
                return false;

            }
            // ELSE (is a valid number)
            else {

                // IF input number is out of range
                if (number < MIN_RANDOM_NUMBER || number > MAX_RANDOM_NUMBER) {

                    // Change message output
                    changeMessage('text-danger', `I numeri devono essere tra ${MIN_RANDOM_NUMBER} e ${MAX_RANDOM_NUMBER}`);

                    // Return input is not valid
                    return false;
                    
                }
                // ELSE (is in range)
                else {

                    // Return input is valid
                    return true;

                }

            }
            
        }

    }

// #endregion Function declaration section



// #region Script logic section

    // Initialize an array of generated numbers
    const generatedNumbers = [];

    // Loop for each number to generate
    for (let i = 0; i < TOTAL_NUMBERS; i++) {

        // Initialize random number variable
        let randomNumber;

        do {

            // Generate a new random number
            randomNumber = random(MIN_RANDOM_NUMBER, MAX_RANDOM_NUMBER);

            // IF the new random number is not included in the array (avoid repeating numbers)
            if(generatedNumbers.includes(randomNumber) === false) {

                // Exit the loop
                break;
            }

        } while (true);

        // Push generated number in its array
        generatedNumbers.push(randomNumber);
        
        // Create a new list item
        const newListItemElement = document.createElement('li');

        // Fill it with a random number
        newListItemElement.append(randomNumber);

        // Append it to the list
        numberListElement.appendChild(newListItemElement);

    }
    
    // #endregion Script logic section