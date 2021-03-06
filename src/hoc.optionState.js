import React from 'react'
import type { ComponentType } from 'react'

type Item = any

type State = {
  opened: boolean,
  indexHighlighted: number,
}

type Props = {
  onChange?: Item => void,
  onOpen?: Item => void,
  onClose?: Item => void,
  options: Item[],
}

export const injectOptionState = (C: ComponentType<*>) =>
  class OptionListState extends React.Component<*, State> {
    state: State = { opened: false, indexHighlighted: 0 }

    open = () => {
      if (this.props.onOpen) this.props.onOpen()
      this.setState({ opened: true, indexHighlighted: 0 })
    }
    close = () => {
      if (this.props.onClose) this.props.onClose()
      this.setState({ opened: false, indexHighlighted: -1 })
    }

    onOptionHover = (indexHighlighted: number) =>
      this.setState({ indexHighlighted })

    onChange = (value: Item) => {
      if (this.props.onChange) this.props.onChange(value)
      this.close()
    }

    onKeyDown = (e: KeyboardEvent) => {
      const n = this.props.options.length

      switch (e.which) {
        // <arrow up>
        case 38: {
          const indexHighlighted =
            (n + Math.max(0, this.state.indexHighlighted) - 1) % n

          return this.setState({
            indexHighlighted,
            opened: true,
          })
        }

        // <arrow down>
        case 40: {
          const indexHighlighted = (this.state.indexHighlighted + 1) % n

          return this.setState({
            indexHighlighted,
            opened: true,
          })
        }

        // <enter>
        case 9:
        // <tab>
        case 13: {
          const value = this.props.options[this.state.indexHighlighted]
          return value && this.onChange(value)
        }
      }

      if (!this.state.opened)
        this.setState({ opened: true, indexHighlighted: 0 })
    }

    componentWillReceiveProps(nextProps: Props) {
      if (
        nextProps.options.length <= this.state.indexHighlighted &&
        this.state.opened
      )
        this.setState({ indexHighlighted: nextProps.options.length - 1 })
    }

    render() {
      return (
        <C
          {...this.props}
          {...this.state}
          open={this.open}
          close={this.close}
          onChange={this.onChange}
          onOptionHover={this.onOptionHover}
          onKeyDown={this.onKeyDown}
        />
      )
    }
  }
