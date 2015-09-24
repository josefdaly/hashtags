var HashTagForm = React.createClass({
  displayName: "HashTagForm",
  handleClick: function() {
    var input = $('#hashtag-input').val();
    var startDate = $('#start-date').val();
    var endDate = $('#end-date').val();
    if (input == "" || startDate == "" || endDate == "" ||
      new Date(endDate) < new Date(startDate) || input.split(" ").length > 1) {
      alert('Invalid Input!')
    } else {
      React.unmountComponentAtNode(document.getElementById('content'));
      React.render(
        React.createElement(MediaIndex, {authToken: this.props.token,
          tag: input.toLowerCase(), start: startDate, end: endDate}),
          document.getElementById('content')
      )
    }
  },
  render: function() {
    return (
      React.createElement("div", {className: "hashtag-form form-inline center-block"},
        React.createElement("div", {className: "form-group"},
          React.createElement("span", {clssName: "control-label"}, "Hashtag: "),
          React.createElement("input", {className: "form-control", id: "hashtag-input", type: "text"})
        ),
        React.createElement("div", {className: "form-group"},
          React.createElement("span", null, "Start Date: "),
          React.createElement("input", {className: "form-control", id: "start-date", type: "date"})
        ),
        React.createElement("div", {className: "form-group"},
          React.createElement("span", null, "End Date: "),
          React.createElement("input", {className: "form-control", id: "end-date", type: "date"})
        ),
        React.createElement("button", {onClick: this.handleClick,
          className: "btn btn-default pull-right load-btn"}, "Load Content!")
      )
    )
  }
});
