/**
 * Created by ubuntu on 3/4/15.
 */

// tutorial1
//var fetch = require('whatwg-fetch');


var TaskBox = React.createClass({
    loadTasksFromServer: function() {
        var me = this;
        fetch(this.props.url)
            .then(function(response) {
                return response.json();
            })
            .then(function(j) {
//                console.log('parsed json', j)
                me.setState({data: j})
            }).catch(function(ex) {
                console.log('parsing failed', ex)
            })
    },
    handleTaskSubmit: function(task) {
        var tasks = this.state.data;
        var newTasks = tasks.concat([task]);
        this.setState({data: newTasks});

        console.log('posting new task: ', task);
        var jTask = JSON.stringify({
            summary: task.summary,
            detail: task.detail,
            status: task.status
        });
        console.log('modified task: ' + jTask)
        fetch(this.props.url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: jTask
        });
    },
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        this.loadTasksFromServer();
//        setInterval(this.loadTasksFromServer, this.props.pollInterval);
    },
    render: function() {
        return (
            <div className="taskBox">
                <h1> -- Things To Do -- </h1>
                <TaskList data = {this.state.data} />
                <TaskForm onTaskSubmit={this.handleTaskSubmit} />
            </div>
        );
    }
});

var TaskList = React.createClass({
    render: function() {
        var taskNodes = this.props.data.map(function(task) {
            return (
                <Task >
                    {task.summary}
                    {task.detail}
                    {task.status}
                 </Task>
            );
        });

        return (
            <div className="taskList">
                {taskNodes}
            </div>
        );
    }
});

var TaskForm = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        var summary = this.refs.summary.getDOMNode().value.trim();
        var detail = this.refs.detail.getDOMNode().value.trim();
        var status = this.refs.status.getDOMNode().value.trim();
        if (!detail || !summary) {
            return;
        }
        this.props.onTaskSubmit({summary: summary, detail: detail, state: status});
        this.refs.summary.getDOMNode().value = '';
        this.refs.detail.getDOMNode().value = '';
        this.refs.status.getDOMNode().value = '';
    },
    render: function() {
        return (
            <form className="taskForm" onSubmit={this.handleSubmit}>
                <input ref = "summary" type="text" placeholder="Task summary" />
                <input ref = "detail" type="text" placeholder="Task details" />
                <input ref = "status" type="text" placeholder="Task status" />
                <input type="submit" value="Post" />
            </form>
        );
    }
});


var Task = React.createClass({
    render: function() {
        var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
        return (
            <div className="task">
                <h2 className="taskSummary">
                    {this.props.summary}
                </h2>
                <h2 className="taskDetail">
                    {this.props.detail}
                </h2>
                <h2 className="taskStatus">
                    {this.props.status}
                </h2>
                <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
            </div>
        );
    }
});

React.render(
//    <TaskBox url='comments.json' pollInterval={2000} />,
    <TaskBox url='http://playground.com:8080/api/items'  />,
//    <TaskBox data={data} />,poll
    document.getElementById('content')
);