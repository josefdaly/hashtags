var HashTagForm = React.createClass({
  handleClick: function() {
    var input = $('#hashtag-input').val();
    var startDate = $('#start-date').val();
    var endDate = $('#end-date').val();
    if (input == "" || startDate == "" || endDate == "") {
      alert('Must complete all feilds!')
    } else {
      React.unmountComponentAtNode(document.getElementById('content'));
      React.render(
        <MediaIndex authToken={this.props.token}
          tag={input} start={startDate} end={endDate} />,
        document.getElementById('content')
      )
    }
  },
  render: function() {
    return (
      <div className="hashtag-form center-block">
        <span>Hashtag: </span>
        <input className="total-width" id="hashtag-input" type="text" />
        <br/>
        <span>Start Date: </span>
        <input className="total-width" id="start-date" type="date" />
        <br/>
        <span>End Date: </span>
        <input className="total-width" id="end-date" type="date" />
        <br/>
        <button onClick={this.handleClick}
          className="btn btn-default center-block">Load Content!</button>
      </div>
    )
  }
});
