/**
 * Created by ubuntu on 3/4/15.
 */

// tutorial1
var CommentList = React.createClass({
    render: function() {
        return (
            <div className="commentList">
                <Comment author="Thurston Howell">Is it cocktail hour yet Lovey?</Comment>
                <Comment author="Mary Ann">I think I'm cuter than Ginger!</Comment>
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

var Comment = React.createClass({
    render: function() {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                {this.props.children}
            </div>
        );
    }
});

React.render(
    <CommentBox />,
    document.getElementById('content')
);