import React from 'react'
import type { Component } from 'react'

export type Item = any

const defaultFilter = (pattern: string) => (x: Item): boolean =>
  x
    .toString()
    .toLowerCase()
    .includes(pattern.toLowerCase())

type State = {
  pattern: string,
}

type Props = {
  onChange?: Item => void,
  onOpen?: Item => void,
  onClose?: Item => void,
  options: Item[],
}

type Options = {
  filter?: (pattern: string) => (x: string) => boolean,
  maxDisplayed?: number,
}

export const injectFilterState = (options: Options) => {
  const filter = (options && options.filter) || defaultFilter
  const maxDisplayed = (options && options.maxDisplayed) || Infinity

  return C =>
    class FilterState extends React.Component<Props, State> {
      state: State = { pattern: '' }

      onChange = (value: string) => {
        this.setState({ pattern: '' })
        if (this.props.onChange) this.props.onChange(value)
      }

      onOpen = () => {
        this.setState({ pattern: '' })
        if (this.props.onOpen) this.props.onOpen()
      }

      onPatternChange = (pattern: string) => this.setState({ pattern })

      render() {
        const options = this.props.options
          .filter(filter(this.state.pattern))
          .slice(0, maxDisplayed)

        return (
          <C
            {...this.props}
            {...this.state}
            options={options}
            onChange={this.onChange}
            onPatternChange={this.onPatternChange}
          />
        )
      }
    }
}
