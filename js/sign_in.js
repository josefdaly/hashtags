var SignIn = React.createClass({displayName: "SignIn",
  handleClick: function() {
    window.location.replace(
     "https://instagram.com/oauth/authorize/?client_id=2ee58976c7a74d048636a229f797047c&redirect_uri=http://josefdaly.github.io/hashtags/&response_type=token"
    )
  },
  render: function() {
    return (
      React.createElement("div", {id: "log-in"},
        React.createElement("h2", null, "Authenticate with Instagram to continue"),
        React.createElement("img", {onClick: this.handleClick,
          className: "instagram-button center-block",
          src: "http://www.pictacular.co/img/Instagram_normal.png",
          alt: "Instagram login"
        })
      )
    )
  }
})
