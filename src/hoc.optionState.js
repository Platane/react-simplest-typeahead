import React from 'react'

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

export const injectOptionState = C =>
  class OptionListState extends React.Component<Props, State> {
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
        case 38: {
          const indexHighlighted =
            (n + Math.max(0, this.state.indexHighlighted) - 1) % n

          return this.setState({
            indexHighlighted,
            opened: true,
          })
        }
        case 40: {
          const indexHighlighted = (this.state.indexHighlighted + 1) % n

          return this.setState({
            indexHighlighted,
            opened: true,
          })
        }
        case 13: {
          const value = this.props.options[this.state.indexHighlighted]
          return value && this.onChange(value)
        }
      }

      if (!this.state.opened)
        this.setState({ opened: true, indexHighlighted: 0 })
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
