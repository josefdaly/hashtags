var VideoItem = React.createClass({
  displayName: "VideoItem",
  handleClick: function() {
    $('.media-display').html("<video class='display-item' controls><source src='" +
      this.props.url + "' type='video/mp4' /> </video>")
    $('#username').html(this.props.username);
    $('#native-url').html("<a href='" + this.props.nativeUrl + "'>View At Instagram</a>")
    var date = new Date(this.props.createdAt)
    var formattedDate = date.toString();
    $('#created-time').html(formattedDate);
  },
  render: function() {
    return (
      React.createElement("li", {onMouseEnter: this.mouseIn, onClick: this.handleClick},
        React.createElement("video", {className: "list-media", controls: true},
          React.createElement("source", {src: this.props.url, type: "video/mp4"})
        )
      )
    )
  }
})
