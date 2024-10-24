// JavaScript file: Eggscript.js

let clickCount = 0; // To track the number of clicks

// Select the image by its ID
const eggImage = document.getElementById('eggImage');

// Add an event listener to track clicks on the image
eggImage.addEventListener('click', function () {
    clickCount++; // Increment the click count

    // First transition: After 3 clicks, change the image to crackingEgg.png
    if (clickCount === 3) {
        eggImage.src = 'crackingEgg.png'; // Change the image to the cracking egg
    }

    // Second transition: After 8 total clicks, change the image to fullyCracked.png and remove other elements
    if (clickCount === 8) {
        eggImage.src = 'fullyCracked.png'; // Change the image to the fully cracked egg

        // Hide the existing button (if present)
        const buttonContainer = document.querySelector('.button-container');
        if (buttonContainer) {
            buttonContainer.style.display = 'none'; // Hide the previous button
        }

        // Add a new button on top of the fully cracked image
        addFullyCrackedButton(); // Call function to add the new button
    }
});

// Function to add the new button after the image changes to fully cracked
function addFullyCrackedButton() {
    const newButtonContainer = document.createElement('div');
    newButtonContainer.classList.add('button-container');

    // Create the button element
    const newButton = document.createElement('button');
    newButton.classList.add('btn');
    newButton.textContent = 'Continue to Next Module'; // Button text
    newButton.onclick = function () {
        location.href = 'twoModulesUnlocked.html'; // Redirect to the next page
    };

    // Add the button to the button container
    newButtonContainer.appendChild(newButton);

    // Append the button container to the main header or body
    const header = document.querySelector('header');
    header.appendChild(newButtonContainer);
}
