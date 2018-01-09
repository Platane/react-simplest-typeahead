import React from 'react'
import type { Component } from 'react'

export type Item = any

const defaultFilter = (pattern: string, _: Object) => (x: Item): boolean =>
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
  filter?: (pattern: string, props: Object) => (x: Item) => boolean,
  sort?: (pattern: string, props: Object) => (a: Item, b: Item) => 1 | -1 | 0,
  maxDisplayed?: number,
} | void

export const injectFilterState = (options: Options = {}) => {
  const sort = options && options.sort
  const filter = (options && options.filter) || defaultFilter
  const maxDisplayed = (options && options.maxDisplayed) || Infinity

  return C =>
    class FilterState extends React.Component<Props, State> {
      state: State = { pattern: '' }

      onChange = (value: Item) => {
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
          .filter(filter(this.state.pattern, this.props))
          .slice(0, maxDisplayed)

        if (sort) options.sort(sort(this.state.pattern, this.props))

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
