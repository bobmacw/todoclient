/**
 * Created by ubuntu on 3/4/15.
 */

// tutorial1

var data = [
    {author: "Pete Hunt", text: "This is one comment"},
    {author: "Jordan Walke", text: "This is *another* comment"}
];

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
                <CommentList data = {this.props.data} />
                <CommentForm />
            </div>
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
    <CommentBox url = "~/src/react-tutorial/comments.json" />,
//    <CommentBox data={data} />,
    document.getElementById('content')
);