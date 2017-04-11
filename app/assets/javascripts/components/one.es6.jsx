class One extends React.Component {
  componentDidMount() {
    fetch('/pages/three', { method: "GET" }).then((response) => {
      return response.json();
    }).then((data) => {
      this.setState({ data })
    });
  }

  render () {
    return <div>Hello, {this.props.name}!</div>;
  }
}
