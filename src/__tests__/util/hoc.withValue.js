import React from 'react'
import type { ComponentType } from 'react'

export const withValue = (C: ComponentType<*>) =>
  class ValueState extends React.Component<*, { value: * }> {
    constructor(props: *) {
      super(props)
      this.state = { value: this.props.initValue }
    }

    onChange = (value: *) => this.setState({ value })

    render() {
      return <C {...this.props} {...this.state} onChange={this.onChange} />
    }
  }
