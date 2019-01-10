import React from 'react'

const defaultRenderOption = ({
  option,
  isHighlighted,
  onMouseDown,
  onMouseOver,
}) => (
  <div
    onMouseDown={onMouseDown}
    onMouseOver={onMouseOver}
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
  onOptionHover: (index: number) => void,
  onKeyDown: (keyboardEvent: KeyboardEvent) => void,

  options: Item[],

  placeholder?: string,
  renderOption: ({
    option: Item,
    isHighlighted: boolean,
    onMouseDown: (e: MouseEvent) => void,
    onMouseOver: (e: MouseEvent) => void,
  }) => *,
  className?: string,
  style?: Object,
  customClassName: {
    typeahead?: string,
    input?: string,
    options?: string,
  },
  customStyle: {
    typeahead?: Object,
    input?: Object,
    options?: Object,
  },
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
  onOptionHover,
  onKeyDown,

  options,
  renderOption,
  placeholder,

  className,
  style,
  customClassName,
  customStyle,

  ...props
}: Props) => (
  <div
    className={
      'typeahead ' + (className || ' ') + (customClassName.typeahead || '')
    }
    style={{
      position: 'relative',
      ...(style || {}),
      ...(customStyle.typeahead || {}),
    }}
  >
    <input
      type="text"
      className={'typeahead-input ' + (customClassName.input || '')}
      style={{ ...style_input, ...(customStyle.input || {}) }}
      value={(opened ? pattern : value) || ''}
      placeholder={placeholder}
      onBlur={close}
      onFocus={open}
      onKeyDown={onKeyDown}
      onChange={e => onPatternChange(e.target.value)}
    />
    {opened && (
      <div
        className={'typeahead-options ' + (customClassName.options || '')}
        style={{ ...style_options, ...(customStyle.options || {}) }}
      >
        {options.map((option, i) =>
          renderOption({
            ...props,
            i,
            pattern,
            option,
            isHighlighted: indexHighlighted === i,
            onMouseDown: () => onChange(option),
            onMouseOver: () => onOptionHover(i),
          })
        )}
      </div>
    )}
  </div>
)

Typeahead.defaultProps = {
  renderOption: defaultRenderOption,
  customClassName: {},
  customStyle: {},
}

const style_options = {
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
