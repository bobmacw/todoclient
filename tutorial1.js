/**
 * Created by ubuntu on 3/4/15.
 */

// tutorial1.js
var CommentBox = React.createClass({
    render: function() {
        return (
            <div className="commentBox">
                Hello, world! I am a CommentBox.
            </div>
        );
    }
});
React.render(
    <CommentBox />,
    document.getElementById('content')
);