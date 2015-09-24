var ImageItem = React.createClass({
  displayName: "ImageItem",
  handleClick: function() {
    $('.media-display').html("<img src='" + this.props.url + "' class='display-item'>");
    $('#username').html('<strong>' + this.props.username + '</strong>');
    $('#native-url').html("<a href='" + this.props.nativeUrl + "'>View At Instagram</a>");
    var date = new Date(this.props.createdAt);
    var formattedDate = date.toString();
    $('#created-time').html(formattedDate);
  },
  render: function() {
    var date = new Date(this.props.createdAt);
    var formattedDate = date.toString();
    return (
      React.createElement("li", {onMouseEnter: this.mouseIn, onClick: this.handleClick},
        React.createElement("img", {className: "list-media", src: this.props.url, alt: ""})
      )
    )
  }
})
