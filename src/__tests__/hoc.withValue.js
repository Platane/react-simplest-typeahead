import React from 'react'

export const withValue = C =>
  class ValueState extends React.Component {
    constructor(props) {
      super(props)
      this.state = { value: this.props.initValue }
    }

    onChange = value => this.setState({ value })

    render() {
      return <C {...this.props} {...this.state} onChange={this.onChange} />
    }
  }
