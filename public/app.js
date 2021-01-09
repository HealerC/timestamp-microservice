document.addEventListener("DOMContentLoaded", function() {

	const dateInput = document.getElementById("iso-date");	// The input for the date picker
	const textInput = document.getElementById("unix");		// The unix number input
	
	dateInput.addEventListener("input", function() {
		handleInput(this, textInput);
	});
	textInput.addEventListener("input", function() {
		handleInput(this, dateInput);
	});

	/**
	 * @method handleInput This method takes the two input elements and then when
	 * the user types on one of them, it renders the other disabled until the user
	 * deletes his input. This is done so that only one of the input that is posted. 
	 * @param {Object-InputElement} elem The element the user is typing or deleting
	 * @param {Object-InputElement} other The other element which "disabled" property
	 * should change depending on the "elem" 
	 */
	function handleInput(elem, other) {
		// If there is text input in the present element. Disable the other
		if (elem.value) {
			other.disabled = true;
		} else {		// Where the text was just deleted. Reenable the other
			other.disabled = false;
		}
	}

});