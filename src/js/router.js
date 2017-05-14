function CommandRouter(app) {
	this.app = app;
}

CommandRouter.prototype.route = function (commandText) {
	/**
	 * Iteration #1
	 * Using include and split function
	 */
	// var t0 = performance.now();
	// if (commandText.includes(" note ")) {
	// 	var res = commandText.split("note ");
	// 	var item = new TodoItem(res[1], false);
	// 	app.selectedProject.todos.push(item);
	// 	toastr["success"]("Note added.", "Success");
	// } else {
	// 	toastr["error"]("Did not understand command.", "Oops..");
	// }
	// var t1 = performance.now();
	// console.log("Time taken: " + (t1 - t0) + " milliseconds.")


	/**
	 * Iteration #2
	 * Using RegEx and split function
	 */
	// var t0 = performance.now();
	// var pattern = /(add|make|create|write)[\s*\w*\s*]*note /i;
	// if (pattern.test(commandText)) {
	// 	var res = commandText.split("note ");
	// 	if(res[1].indexOf("with"))
	// 	var item = new TodoItem(res[1], false);
	// 	app.selectedProject.todos.push(item);
	// 	toastr["success"]("Note added.", "Success");
	// } else {
	// 	toastr["error"]("Did not understand command.", "Oops..");
	// }
	// var t1 = performance.now();
	// console.log("Time taken: " + (t1 - t0) + " milliseconds.");


	/**
	 * Iteration #3
	 * Using RegEx and replace function
	 */
	// var commandTextCheck = commandText;
	// var pattern = /(add|make|create|write)[\s*\w*\s*]*note (with text |to )?/i;
	// commandText = commandText.replace(pattern, "");
	// if (commandText == commandTextCheck || /(with text|to)/i.test(commandText) || commandText == "") {
	// 	toastr["error"]("Did not understand command.", "Oops..");
	// } else {
	// 	var item = new TodoItem(capitalizeFirstChar(commandText), false);
	// 	app.selectedProject.todos.push(item);
	// 	toastr["success"]("Note added.", "Success");
	// }


	/**
	 * Iteration #4
	 * Using both RegEx test and replace function
	 */
	//Pattern: "<words|white spaces>*<add|make|create|write><words|white spaces>*note <with text |to >?"
	//Eg:"Add a note with text",
	//   "Add a note with text call me",
	//   "Add a note",
	//   "Add a note call akshay",
	//   "Add a note to call purva",
	//   "Add a note to",
	//   "Please Add a note with text calling
	var patternAddNote = /[\w*|\s*]*(add|make|create|write)[\w*|\s*]*note (with text |to )?/i;
	var patternDeleteNote = /[\w*|\s*]*(delete|remove|erase|clear)[\w*|\s*]*note (with text |to )?/i;

	//Check if add note pattern present in commandText
	if (patternAddNote.test(commandText)) {

		//Replace the found pattern with "" to extract the todo note
		var txt = commandText.replace(patternAddNote, "");

		//Handle edge case where user speaks "Add a note with text" but doesn't actualy speak the note itself.
		if (/[^(with text|to)]/i.test(txt)) {

			//Create a new TodoItem object and push it in the array.
			var item = new TodoItem(capitalizeFirstChar(txt), false);
			app.selectedProject.todos.push(item);
			toastr["success"]("Note added.", "Success");
		} else {
			toastr["error"]("You forgot to say the note.", "Oops..");
		}
	}
	//Check if delete note pattern present in commandText
	else if (patternDeleteNote.test(commandText)) {

		//Replace the found pattern with "" to extract the todo note
		var txt = commandText.replace(patternDeleteNote, "");

		//get project array length for comparision to see if note has been deleted or not.
		var selectedProjectInitialLength = app.selectedProject.todos.length;

		//Handle edge case where user speaks "Add a note with text" but doesn't actualy speak the note itself.
		if (/[^(with text|to)]/i.test(txt)) {
			for (i = 0; i < selectedProjectInitialLength; i++) {
				if (app.selectedProject.todos[i].text.toLowerCase() == txt.toLowerCase()) {

					//Deletes one note from/at position "i"
					app.selectedProject.todos.splice(i, 1);
					toastr["success"]("Note deleted.", "Success");
				}
			}

			//Compare array with initial length to see if any note has been deleted or not.
			if (app.selectedProject.todos.length == selectedProjectInitialLength) {
				toastr["error"]("I couldn't find the note.", "Oops..");
			}
		} else {
			toastr["error"]("You forgot to say the note.", "Oops..");
		}
	}
	//Default Handler.
	else {
		toastr["error"]("I didn't get that.", "Sorry");
	}

	//Empty the inputfield from the spoken final_transcript.
	app.newTodoText = '';
};

function capitalizeFirstChar(s) {
	var first_char = /\S/;
	return s.replace(first_char, function (m) {
		return m.toUpperCase();
	});
}