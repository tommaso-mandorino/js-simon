// #region Constants declaration section

    // region Manual parameters constants

        // Minumum random number to generate
        const MIN_RANDOM_NUMBER = 1;

        // Maximum random number to generate
        const MAX_RANDOM_NUMBER = 50;

        // Total of random numbers
        const TOTAL_NUMBERS = 5;

        // Available seconds to the user for memorizing random numbers
        const AVAILABLE_SECONDS = 30

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

    // Initialize countdown number to available seconds
    countdownElement.innerText = String(AVAILABLE_SECONDS);

    // Start timer
    const timer = setInterval( () => {

        // IF available seconds are ended
        if (Number(countdownElement.innerHTML) === 1) {

            // Stop timer
            clearInterval(timer);

            // Hide countdown by adding display none class
            countdownElement.classList.add('d-none');

            // Remove display flex class
            numberListElement.classList.remove('d-flex');

            // Hide numbers list by adding display none class
            numberListElement.classList.add('d-none');

            // Show answers form by removing display none class
            answersFormElement.classList.remove('d-none');

            // Change instructions text
            instructionsElement.innerText = 'Tempo scaduto! Adesso indovina i numeri:';

        }
        // ELSE
        else {

            // Update countdown text by subtracting 1 second
            countdownElement.innerText = Number(countdownElement.innerText) - 1;

        }

    }, 1000);

    // On form submit event
    answersFormElement.addEventListener('submit', (event) => {

        // Prevent defautl behaviour
        event.preventDefault();

        // Initialize an array of inputNumbers numbers
        const inputNumbers = [];

        // Initialize remembered numbers variable
        let rememberedNumbers = 0;

        // Initialize not remembered numbers variable
        let notRememberedNumbers = 0;

        // Loop for each input element inside answers form
        for (let i = 0; i < TOTAL_NUMBERS; i++) {

            // Get current input DOM element to examine dinamically
            const inputElement = document.querySelectorAll('#answers-form input')[i];

            // Get its value
            const inputElementValue = Number(inputElement.value);

            // Remove text bg danger class from input DOM element to reset previous output validation colors
            inputElement.classList.remove('text-bg-danger');

            // Remove text danger class from message DOM element to reset previous output validation colors
            inputElement.classList.remove('text-danger');

            // IF value is valid
            if (isValidInput(inputElementValue) === true) {

                // IF input numbers array includes inserted number being examinated
                if ( inputNumbers.includes(inputElementValue) ) {

                    // Change number input text color to red
                    inputElement.classList.add('text-bg-danger');

                    // Change message output
                    changeMessage('text-danger', 'Questo numero è già stato inserito!')

                    // Stop parsing inputs
                    break;

                }
                // ELSE (it's a new number)
                else {

                    inputNumbers.push(inputElementValue);

                    // IF generated numbers array includes inserted number being examinated
                    if ( generatedNumbers.includes(inputElementValue) ) {

                        // Change remembered number input text color to green
                        inputElement.classList.add('text-success');

                        // Increment remembered number count
                        rememberedNumbers++;

                    }
                    // ELSE (value not included)
                    else {
                        
                        // Change not remembered number input text color to yellow
                        inputElement.classList.add('text-danger');

                        // Increment not remembered number count
                        notRememberedNumbers++;

                    }

                }
            
            }
            // ELSE (value is not valid)
            else {

                // Change wrong input text color to red
                inputElement.classList.add('text-bg-danger');

                // Stop parsing inputs
                break;

            }
            
        }

        /*
            IF remembered numbers + not remembered numbers sum is equal to total numbers
            then all numbers are valid and classified, so we are ready to show results
        */
        if (rememberedNumbers + notRememberedNumbers === TOTAL_NUMBERS) {

            // IF user remembered all numbers
            if (rememberedNumbers === TOTAL_NUMBERS) {
            
                // Change message output
                changeMessage('text-success', 'Hai ricordato TUTTI i numeri!');

            }
            // ELSE IF user remembered just 1 number
            else if (rememberedNumbers === 1) {

                // Change message output
                changeMessage('text-warning', 'Hai ricordato SOLO 1 numero!');

            }
            // ELSE IF user didn't remember a single number
            else if (rememberedNumbers === 0) {


                // Change message output
                changeMessage('text-danger', 'Non hai ricordato NESSUN numero!');

            }
            // ELSE (user remembered just some numbers)
            else {

                // Change message output
                changeMessage('text-info', `Hai ricordato ${rememberedNumbers} numeri.`);

            }

        }

    });

    // #endregion Script logic section