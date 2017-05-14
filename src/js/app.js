final_transcript = '';

var app = new Vue({
    el: '#app',
    data: {
        projects: [],
        commandRouter: null,
        recognized: null,
        selectedProject: null,
        listening: false,
        showProjectMenu: false,
        newTodoText: ''
    },
    methods: {
        startListening: function () {
            this.listening = true;
            recognizer.start();
        },
        addTodo: function () {
            var todo = new TodoItem(
                this.newTodoText,
                false
            );
            this.selectedProject.todos.push(todo);
            this.newTodoText = '';
        },
        selectProject: function (project) {
            this.selectedProject = project;
            this.showProjectMenu = false;
        },
        deleteTodo: function (removeTodo) {
            var project = this.selectedProject;
            project.todos = project.todos.filter(function (todo) {
                return removeTodo !== todo;
            });
        },
        hideModals: function ($event) {
            if (this.showProjectMenu) {
                if ($event.type == 'keyup' ||
                    ($event.type == 'click' && $event.target.id == 'app')) {
                    this.showProjectMenu = false;
                }
            }
        },
        toggleVoiceListening: function () {
            if (this.listening) {
                this.recognizer.stop();
                this.listening = false;
            } else {
                this.recognizer.start();
                this.listening = true;
            }
        },
        formatDate(date) {
            var monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return monthList[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
        }
    },
    created: function () {

        var project = new Project('Default Project');
        var todo = new TodoItem('Add more todos', false);

        project.todos.push(todo);
        this.newTodoText = '';

        this.projects.push(project);
        this.selectedProject = this.projects[0];

        this.projects.push(new Project('Other Project'));

        this.commandRouter = new CommandRouter(this);
        this.recognizer = new SpeechRecognizer();
        this.recognizer.setErrorHandler(function (error) {
            alert('Error: ' + error);
        });

        /**
         * Added functionality to view the spoken words on the fly.
         */
        this.recognizer.setResultHandler(function (results) {
            var message;
            var confidence;
            var interim_transcript = '';

            for (var i = 0; i < results.length; i++) {
                if (results[i].isFinal) {
                    final_transcript += event.results[i][0].transcript;
                } else {
                    interim_transcript += event.results[i][0].transcript;
                }
            }

            this.newTodoText = interim_transcript;
            message = final_transcript;
            if (message) {
                this.newTodoText = final_transcript;
                this.commandRouter.route(message);
                this.recognizer.stop();
                this.listening = false;

                //Empty out so that does not use the stale value for next todo.
                final_transcript = '';
            }
        }.bind(this));
    }
})