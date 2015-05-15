/**
 * Created by ubuntu on 3/4/15.
 */

// tutorial1
var CommentList = React.createClass({
    render: function() {
        return (
            <div className="commentList">
                Hello, React world - I am a CommentList!
            </div>
        );
    }
})

var CommentForm = React.createClass({
    render: function() {
        return (
            <div className="commentForm">
                Hello, React world - I am a CommentForm!
            </div>
        );
    }
})


var CommentBox = React.createClass({
    render: function() {
        return (
            <div className="commentBox">
                <h1> -- COMMENTS -- </h1>
                <CommentList />
                <CommentForm />
            </div>
        );
    }
});
React.render(
    <CommentBox />,
    document.getElementById('content')
);