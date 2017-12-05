import React from 'react'
import type { Component } from 'react'

const defaultRenderOption = ({ option, isHighlighted, ...props }) => (
  <div
    {...props}
    key={option.toString()}
    style={{
      backgroundColor: isHighlighted ? '#ddd' : 'transparent',
      padding: '10px',
    }}
  >
    {option.toString()}
  </div>
)

export type Item = any

export type Props = {
  value: Item | null,
  pattern: string,
  onPatternChange: (pattern: string) => void,
  onChange: (item: Item) => void,

  opened: boolean,
  open: () => void,
  close: () => void,

  indexHighlighted: number | null,
  highligh: (index: number | null) => void,
  onKeyDown: (keyboardEvent: KeyboardEvent) => void,

  options: Item[],

  renderOption: ({ option: Item, isHighlighted: boolean }) => *,
  className?: string,
  style?: Object,
  placeholder?: string,
}

export const Typeahead = ({
  value,
  pattern,
  onPatternChange,
  onChange,

  opened,
  open,
  close,

  indexHighlighted,
  highligh,
  onKeyDown,

  options,
  renderOption,
  className,
  style,
  placeholder,
}: Props) => (
  <div
    className={'typeahead ' + (className || '')}
    style={{ position: 'relative', ...(style || {}) }}
  >
    <input
      type="text"
      className="typeahead-input"
      style={{ ...style_input, ...(style || {}) }}
      value={(opened ? pattern : value) || ''}
      placeholder={placeholder}
      onBlur={close}
      onFocus={open}
      onKeyDown={onKeyDown}
      onChange={e => onPatternChange(e.target.value)}
    />
    {opened && (
      <div className="typeahead-list" style={style_list}>
        {options.map((option, i) =>
          renderOption({
            option,
            isHighlighted: indexHighlighted === i,
            onMouseDown: () => onChange(option),
            onMouseOver: () => highligh(i),
          })
        )}
      </div>
    )}
  </div>
)

Typeahead.defaultProps = {
  renderOption: defaultRenderOption,
}

const style_list = {
  position: 'absolute',
  border: 'solid 1px #eee',
  width: '100%',
  zIndex: 1,
  backgroundColor: '#fff',
  boxShadow: '2px 1px 10px -3px rgba(0, 0, 0, 0.3)',
}

const style_input = {
  width: '100%',
}
