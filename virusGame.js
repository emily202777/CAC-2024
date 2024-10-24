// Select the game container, trash can, virus counter, background image, and button
const gameContainer = document.getElementById('gameContainer');
const trashCan = document.getElementById('trashCan');
const virusCounter = document.getElementById('virusCounter'); // Counter element
const backgroundImage = document.getElementById('instructionImage'); // Background image element
const nextPageButton = document.getElementById('nextPageButton'); // Button element

let virusCountInTrash = 0; // Track viruses in the trash
let virusTotalSpawned = 0; // Track total viruses spawned
const maxViruses = 15;  // Maximum number of viruses to spawn

// Define the spawning area (e.g., bottom half of the screen)
const spawnArea = {
    xMin: 600,  // Left boundary (in pixels)
    xMax: 825,  // Right boundary (width minus virus width)
    yMin: 200,  // Top boundary (middle of the screen)
    yMax: 500   // Bottom boundary (height minus virus height)
};

// Function to update the virus counter
function updateVirusCounter() {
    virusCounter.textContent = `Viruses in trash: ${virusCountInTrash}`;

    // If all viruses are in the trash, change the background image and show the button
    if (virusCountInTrash === maxViruses) {
        backgroundImage.src = 'healedChick.png'; // Change to the healed chick image
        nextPageButton.style.display = 'block'; // Show the button to proceed
    }
}

// Function to spawn a new virus
function spawnVirus() {
    // Check if the total spawned virus limit is reached
    if (virusTotalSpawned >= maxViruses) {
        clearInterval(spawnInterval);  // Stop spawning viruses once the limit is reached
        return;
    }

    const virus = document.createElement('div');
    virus.classList.add('virus');
    
    // Random position within the specified spawn area
    const x = Math.random() * (spawnArea.xMax - spawnArea.xMin) + spawnArea.xMin;
    const y = Math.random() * (spawnArea.yMax - spawnArea.yMin) + spawnArea.yMin;
    
    virus.style.left = `${x}px`;
    virus.style.top = `${y}px`;

    // Make the virus draggable
    virus.setAttribute('draggable', 'true');

    // Drag start event
    virus.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('virusElement', event.target); // Set dragged element
    });

    // Add the virus to the game container
    gameContainer.appendChild(virus);
    
    // Increment the total number of viruses spawned
    virusTotalSpawned++;
}

// Spawn viruses every 2 seconds within the specified area
const spawnInterval = setInterval(spawnVirus, 2000);

// Drag over and drop logic for the trash can
trashCan.addEventListener('dragover', (event) => {
    event.preventDefault(); // Allow drop
});

trashCan.addEventListener('drop', (event) => {
    event.preventDefault(); // Prevent default behavior
    const draggedVirus = document.querySelector('.virus[draggable="true"]');
    if (draggedVirus) {
        // Remove the virus when dropped on the trash can
        draggedVirus.remove();

        // Update the number of viruses in trash
        virusCountInTrash++;
        updateVirusCounter(); // Update the virus counter display
    }
});
