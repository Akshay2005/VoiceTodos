

function TodoItem(text, completed) {
    this.id = TodoItem.idCounter++;
    this.text = text;
    this.createdOn = new Date();
    this.completed = completed;
    this.editing = false;
}
TodoItem.idCounter = 1;



function Project(name, todos) {
    this.id = Project.idCounter++;
    this.name = name || '';
    this.todos = todos || [];
    this.createdOn = new Date();
}
Project.idCounter = 1;
