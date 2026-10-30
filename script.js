"use strict";

/*
 * Animal Adoption Board
 *
 * Complete the five TODO sections below, in order.
 *
 * The TODOs depend on each other, so some of them can't be fully tested
 * until a later TODO is complete. Each TODO has a note that tells you
 * what to expect when you test it.
 *
 * EXTRA CREDIT: If you build any extra credit features, list them here
 * (see README.md). Features that are not listed here will not be graded.
 *
 *   -
 *   -
 */

// ------------------------------------
// Animal Data
// ------------------------------------

const animals = [
	{ id: 1, name: "Luna", species: "cat", age: 3, adopted: false },
	{ id: 2, name: "Biscuit", species: "dog", age: 7, adopted: true },
	{ id: 3, name: "Pepper", species: "cat", age: 1, adopted: true },
	{ id: 4, name: "Moose", species: "dog", age: 5, adopted: false },
	{ id: 5, name: "Charly", species: "dog", age: 4, adopted: false },
	{ id: 6, name: "Bill", species: "cat", age: 0.5, adopted: true },
	{ id: 7, name: "Chompers", species: "rabbit", age: 0.5, adopted: false },
	{ id: 8, name: "Beowulf", species: "dog", age: 7, adopted: true },
];

// What the user currently wants to see. The page controls change these.
let activeFilter = "all";
let activeSort = "default";

// ------------------------------------
// Display Animals
// ------------------------------------

function displayAnimals(animalArray) {
	const animalList = document.querySelector("#animal-list");
	animalList.innerHTML = "";

	if (animalArray.length === 0) {
		const emptyMessage = document.createElement("p");
		emptyMessage.textContent = "There are no animals to show.";
		emptyMessage.classList.add("empty-message");
		animalList.appendChild(emptyMessage);
		return;
	}

	/*
	 * TODO #1: Display the animal cards.
	 *
	 * Use forEach() to loop through animalArray. For each animal:
	 *
	 * 1. Create an element for the card and add the "animal-card" class.
	 * 2. If the animal is adopted, also add the "adopted" class.
	 * 3. Create elements showing its name, species, age, and status
	 *    ("Available" or "Adopted").
	 * 4. Create a button labeled "Adopt" or "Return".
	 * 5. Add a click listener to the button. Its callback should call
	 *    toggleAdoption() and pass the animal's id.
	 * 6. Append the completed card to animalList.
	 *
	 * Required comment: above your click listener, explain in your own words
	 * WHEN its callback runs, and HOW it knows which animal to change.
	 *
	 * Note: When this TODO is complete, the eight cards will appear when you
	 * refresh the page. Clicking the buttons won't do anything yet. They
	 * start working after TODOs #2 and #3 are complete.
	 */
	animalArray.forEach((animal) => {
		const card = document.createElement("article");
		card.classList.add("animal-card");
		if (animal.adopted) {
			card.classList.add("adopted");
		}

		const name = document.createElement("h3");
		name.textContent = animal.name;

		const species = document.createElement("p");
		species.textContent = `Species: ${animal.species}`;

		const age = document.createElement("p");
		age.textContent = `Age: ${animal.age}`;

		const status = document.createElement("p");
		status.textContent = animal.adopted ? "Adopted" : "Available";

		const button = document.createElement("button");
		button.type = "button";
		button.textContent = animal.adopted ? "Return" : "Adopt";
		button.addEventListener("click", () => toggleAdoption(animal.id));
		// This is where the callback runs when the button is clicked, 
		// and it knows what animal to change by using the animal.id that is passed to the toggleAdoption function.
		card.append(name, species, age, status, button);
		animalList.appendChild(card);
	});
}

// ------------------------------------
// Adopt or Return an Animal
// ------------------------------------

function toggleAdoption(animalId) {
	/*
	 * TODO #2: Toggle the animal's adoption status.
	 *
	 * 1. Use find() to locate the animal whose id matches animalId.
	 * 2. If there is no matching animal, return from the function.
	 * 3. Change adopted to the opposite of its current value.
	 * 4. Call updateDisplay() to redraw the current view.
	 *
	 * Note: updateDisplay() is empty until you complete TODO #3. Until then,
	 * clicking a button changes the animal's adopted value, but the page
	 * won't redraw, so it will look like nothing happened.
	 */

	const animal = animals.find((animal) => animal.id === animalId);
	if (!animal) return;
	animal.adopted = !animal.adopted;
	updateDisplay();
}
// ------------------------------------
// Filter, Sort, and Update
// ------------------------------------

function updateDisplay() {
	/*
	 * TODO #3: Prepare the animals the user wants to see.
	 *
	 * 1. Begin with a copy of the animals array (use slice()).
	 * 2. If activeFilter is "available", use filter() to keep animals
	 *    whose adopted value is false.
	 * 3. If activeFilter is "adopted", use filter() to keep animals
	 *    whose adopted value is true.
	 * 4. If activeSort is "name", sort the result alphabetically by name.
	 * 5. If activeSort is "age", sort the result from youngest to oldest.
	 * 6. Pass the finished array to displayAnimals().
	 * 7. Call updateCount().
	 *
	 * Required comment: explain in your own words why you sort a copy
	 * instead of sorting the animals array itself.
	 *
	 * Note: When this TODO is complete, the Adopt and Return buttons will
	 * work. The filter buttons and sort menu won't do anything until TODO #5
	 * is complete, because nothing changes activeFilter or activeSort yet.
	 */
		let displayedAnimals = animals.slice();
	
	if (activeFilter === "available") {
		displayedAnimals = displayedAnimals.filter((animal) => !animal.adopted);
	}
	
	if (activeFilter === "adopted") {
		displayedAnimals = displayedAnimals.filter((animal) => animal.adopted);
	}
	
	// Sorting a copy keeps the original animals array in its original order so the array is not permanently changed,
	// which is important for keeping the original data orde for later displays or code that is expacting the original order.

	if (activeSort === "name") {
		displayedAnimals.sort((a, b) => a.name.localeCompare(b.name));
	}
	
	if (activeSort === "age") {
		displayedAnimals.sort((a, b) => a.age - b.age);
	}
	
	displayAnimals(displayedAnimals);
	updateCount();
}

// ------------------------------------
// Available Count
// ------------------------------------

function updateCount() {
	/*
	 * TODO #4: Show how many animals are still available.
	 *
	 * 1. Select the #animal-count paragraph.
	 * 2. Use filter() on the full animals array (not just the visible
	 *    cards) to find the animals that are not adopted.
	 * 3. Set the paragraph's textContent to a message like:
	 *
	 *      4 of 8 animals are available for adoption.
	 *
	 *    Calculate both numbers. Do not type 4 or 8 directly.
	 *
	 * Note: When this TODO is complete, the message appears when the page
	 * opens and changes every time an animal is adopted or returned.
	 */
	const countParagraph = document.querySelector("#animal-count");
	const availableAnimals = animals.filter((animal) => !animal.adopted);
	
	countParagraph.textContent = `${availableAnimals.length} of ${animals.length} animals are available for adoption.`;
}

// ------------------------------------
// Page Controls
// ------------------------------------


const allButton = document.querySelector("#show-all");
const availableButton = document.querySelector("#show-available");
const adoptedButton = document.querySelector("#show-adopted");
const sortSelect = document.querySelector("#sort-animals");

/*
 * TODO #5: Connect the controls to updateDisplay().
 *
 * Add click listeners to the three filter buttons. Each callback should set
 * activeFilter to "all", "available", or "adopted", then call
 * updateDisplay().
 *
 * Add a change listener to sortSelect. Its callback should copy
 * sortSelect.value into activeSort, then call updateDisplay().
 *
 * Note: When this TODO is complete, every part of the app should work.
 * Go back and test the filter and sort code you wrote in TODO #3.
 */
allButton.addEventListener("click", () => {
	activeFilter = "all";
	updateDisplay();
});

availableButton.addEventListener("click", () => {
	activeFilter = "available";
	updateDisplay();
}); 

adoptedButton.addEventListener("click", () => {
	activeFilter = "adopted";
	updateDisplay();
});

sortSelect.addEventListener("change", () => {
	activeSort = sortSelect.value;
	updateDisplay();
});

// Display the original list and the count when the page first opens.
displayAnimals(animals);
updateCount();
