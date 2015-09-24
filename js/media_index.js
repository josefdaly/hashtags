var MediaIndex = React.createClass({
  displayName: "MediaIndex",
  save: function() {
    $.ajax({
      url: 'http://polar-bayou-2162.herokuapp.com/tags',
      contentType: 'application/json',
      crossDomain: true,
      type: 'post',
      data: JSON.stringify({"tag":{"name":this.props.tag, "data":this.state.data}}),
      success: function(response) {
        alert('Material Saved!')
      },
      error: function(response) {
        alert('Something went wrong')
      }
    })
  },
  parseResponse: function(response) {
    var dataToReturn = []
    response.data.forEach(function(datum) {
      var createdTime = this.getCreatedTime(datum);
      if ((new Date(this.props.start) < createdTime) &&
        (new Date(this.props.end) > createdTime)) {
        if (datum.type == "image") {
          var path = datum.images.low_resolution.url
        } else {
          var path = datum.videos.low_bandwidth.url
        }
        dataToReturn.push({
          username: datum.user.username,
          type: datum.type,
          createdAt: createdTime,
          url: path,
          nativeUrl: datum.link
        })
      }
    }.bind(this))
    return dataToReturn;
  },
  getCreatedTime: function(datum) {
    if (datum.caption && datum.caption.text.toLowerCase().indexOf(this.props.tag) > -1) {
      var createdTime = datum.caption.created_time * 1000;
    } else {
      for(var i = 0; i < datum.comments.data.length; i++) {
        if (datum.comments.data[i].text.toLowerCase().indexOf(this.props.tag) > -1) {
          var createdTime = datum.comments.data[i].created_time * 1000;
          break
        }
      }
    }
    return createdTime;
  },
  nestedAjax: function(url) {
    $.ajax({
      url: url,
      dataType: 'JSONP',
      crossDomain: true,
      success: function(response) {
        var i = 0
        var dataMostRecent;
        while (!dataMostRecent && i < response.data.length) {
          dataMostRecent = this.getCreatedTime(response.data[i])
          i++;
        }
        i = response.data.length - 1
        var dataOldest;
        while (!dataOldest && i >= 0) {
          dataOldest = this.getCreatedTime(response.data[i]);
          i--;
        }

        var nextUrl = response.pagination.next_url
        if (new Date(this.props.start) < dataMostRecent) {
          var newData = this.parseResponse(response)
          this.setState({ data: this.state.data.concat(newData) })
        }
        if (nextUrl && dataOldest > new Date(this.props.start)) {
          this.nestedAjax(nextUrl);
        } else {
          this.setState({ over: true })
        }
      }.bind(this),
      error: function(response) {
        console.log(response)
      }.bind(this)
    })
  },
  componentDidMount: function() {
    var url = "https://api.instagram.com/v1/tags/" + this.props.tag +
      "/media/recent?access_token=" + this.props.authToken + "&count=200";
    this.nestedAjax(url);
  },
  getInitialState: function() {
    return ({data: [], over: false, idx: 0});
  },
  render: function() {
    if (this.state.data.length > 0) {
      var Media = []
      this.state.data.forEach(function(datum) {
        if (datum.type == "image") {
          Media.push(
            React.createElement(
              ImageItem, {
                username: datum.username,
                createdAt: datum.createdAt,
                nativeUrl: datum.nativeUrl,
                url: datum.url
              }
            )
          )
        } else if (datum.type == "video") {
          Media.push(
            React.createElement(
              VideoItem, {
                username: datum.username,
                createdAt: datum.createdAt,
                nativeUrl: datum.nativeUrl,
                url: datum.url
              }
            )
          )
        }
      });
      return (
        React.createElement("div", {id: "ul-wrapper"},
          React.createElement("div", {className: "info"},
            React.createElement(
              "span",
              {className: "status"},
              React.createElement("span", {id: "username"})
            ),
            React.createElement("span", {className: "status", id: "native-url"}),
            React.createElement(
              "span",
              {className: "status"},
              React.createElement("span", {id: "created-time"})
            ),
            React.createElement("br", null)
          ),
          React.createElement("div", {className: "media-display"}),
          React.createElement(
            "button",
            {
              className: "save-btn btn btn-default",
              onClick: this.save,
              type: "button"
            },
            "Save Collected Content!"
          ),
          React.createElement(
            "div",
            {className: "carousel-arrow left", onClick: this.clickLeft}, '‹'
          ),
          React.createElement("ul", {className: "content-container"},
            Media.slice(this.state.idx, this.state.idx + 6)
          ),
          React.createElement(
            "span",
            {className: "page-status"},
            "Viewing: ",
            this.state.idx + 1,
            " through ",
            this.state.idx + 6,
            " of ",
            this.state.data.length,
            React.createElement("br", null),
            React.createElement(
              "button",
              {
                onClick: this.jumpClick,
                className: "btn btn-xs btn-default",
                type: "button"
              },
              "Jump to"
            ),
            " ",
            React.createElement(
              "input",
              {
                type: "text",
                placeholder: "Item Number",
                className: "current-page"
              }
            )
          ),
          React.createElement(
            "div",
            {className: "carousel-arrow right", onClick: this.clickRight},
            '›'
          )
        )
      )
    } else {
      if (this.state.over == true) {
        return (
          React.createElement("span", null, "No Data for the selected period.")
        )
      } else {
        return (
          React.createElement(
            "img",
            {
              className: "loading-gif center-block",
              src: "images/ajax-loader.gif",
              alt: "loading"
            }
          )
        )
      }
    }
  },
  jumpClick: function() {
    var jumpTo = parseInt($('.current-page').val())
    if (jumpTo > 0 && jumpTo <= this.state.data.length) {
      this.setState({ idx: jumpTo - 1 })
      $('.current-page').val("")
    } else {
      alert('Choose a number in the range!')
    }
  },
  clickLeft: function() {
    if (this.state.idx > 0) {
      this.setState({ idx: this.state.idx - 1 })
    }
  },
  clickRight: function() {
    if (this.state.idx < this.state.data.length - 6) {
      this.setState({ idx: this.state.idx + 1 })
    }
  }
});
