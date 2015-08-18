/**
 * Created by ubuntu on 3/4/15.
 */

// tutorial1
//var fetch = require('whatwg-fetch');


var CommentBox = React.createClass({
    loadCommentsFromServer: function() {
        fetch(this.props.url)
            .then(function(response) {
                return response.json();
            })
            .then(function(j) {
                console.log('parsed json', j);
//                this.setState({data: j});
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
                <h1> -- COMMENTS -- </h1>
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
                <Comment author = {comment.author}>
                    {comment.text}
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
        var author = this.refs.author.getDOMNode().value.trim();
        var text = this.refs.text.getDOMNode().value.trim();
        if (!text || !author) {
            return;
        }
        this.props.onCommentSubmit({author: author, text: text});
        this.refs.author.getDOMNode().value = '';
        this.refs.text.getDOMNode().value = '';
    },
    render: function() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input ref = "author" type="text" placeholder="Your name" />
                <input ref = "text" type="text" placeholder="Say something" />
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
                <h2 className="commentAuthor">
                    {this.props.author}
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