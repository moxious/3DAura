import React from 'react';

class AuraForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { uri: 'neo4j+s://84c3fa04.databases.neo4j.io', username: 'neo4j', password: 'secret' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(field, event) {
    this.setState({[field]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.props.onConnect) {
      return this.props.onConnect(this.state);
    }
  }

  render() {
    return (
      <div>
        <h3>Set your Neo4j Aura Connection Details</h3>
        <form onSubmit={this.handleSubmit}>
          <label>
            URI:
            <input type="text" value={this.state.uri} onChange={e => this.handleChange('uri', e)} />
          </label>

          <label>
            Username:
            <input type="text" value={this.state.username} onChange={e => this.handleChange('username', e)} />
          </label>

          <label>
            Password:
            <input type="text" value={this.state.password} onChange={e => this.handleChange('password', e)} />
          </label>

          <input type="submit" value="Connect" />
        </form>
      </div>
    );
  }
}

export default AuraForm;