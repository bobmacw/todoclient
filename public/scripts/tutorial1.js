/**
 * Created by ubuntu on 3/4/15.
 */

// tutorial1
//var fetch = require('whatwg-fetch');


var CommentBox = React.createClass({
    loadCommentsFromServer: function() {
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

/*
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
 */
    },
    handleCommentSubmit: function(comment) {
        var comments = this.state.data;
        var newComments = comments.concat([comment]);
        this.setState({data: newComments});

        console.log('posting new comment: ', comment);
        fetch(this.props.url, {
            method: 'post',
            body: JSON.stringify({comment})
        });
/*
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
*/
    },
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        this.loadCommentsFromServer();
//        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function() {
        return (
            <div className="commentBox">
                <h1> -- Things To Do -- </h1>
                <CommentList data = {this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
});

var CommentList = React.createClass({
    render: function() {
        var commentNodes = this.props.data.map(function(comment) {
            return (
//                <Comment summary = {comment.summary}>
                <Comment >
                    {comment.summary}
                    {comment.detail}
                    {comment.status}
                 </Comment>
            );
        });

        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});

var CommentForm = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        var summary = this.refs.summary.getDOMNode().value.trim();
        var detail = this.refs.detail.getDOMNode().value.trim();
        var status = this.refs.status.getDOMNode().value.trim();
        if (!detail || !summary) {
            return;
        }
        this.props.onCommentSubmit({summary: summary, detail: detail, status: status});
        this.refs.summary.getDOMNode().value = '';
        this.refs.detail.getDOMNode().value = '';
        this.refs.status.getDOMNode().value = '';
    },
    render: function() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input ref = "summary" type="text" placeholder="Task summary" />
                <input ref = "detail" type="text" placeholder="Task details" />
                <input ref = "status" type="text" placeholder="Task status" />
                <input type="submit" value="Post" />
            </form>
        );
    }
});


var Comment = React.createClass({
    render: function() {
        var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
        return (
            <div className="comment">
                <h2 className="commentSummary">
                    {this.props.summary}
                </h2>
                <h2 className="commentDetail">
                    {this.props.detail}
                </h2>
                <h2 className="commentStatus">
                    {this.props.status}
                </h2>
                <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
            </div>
        );
    }
});

React.render(
//    <CommentBox url='comments.json' pollInterval={2000} />,
    <CommentBox url='http://playground.com:8080/api/items'  />,
//    <CommentBox data={data} />,poll
    document.getElementById('content')
);