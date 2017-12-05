import React from 'react'
import { Typeahead } from './index'

export const removeDupEqual = equal => arr =>
  arr.filter((x, i, arr) => arr.findIndex(u => equal(u, x)) === i)

const defaultRenderItem = ({ item, onDelete, ...props }) => (
  <div
    {...props}
    key={item.toString()}
    style={{
      padding: '10px',
    }}
  >
    <span>{item.toString()}</span>
    <span
      onClick={onDelete}
      style={{
        cursor: 'pointer',
        padding: '10px',
      }}
    >
      ×
    </span>
  </div>
)

const defaultEqual = (a: Item, b: Item): boolean => a === b

export type Item = any

export type Props = {
  value: Item[],
  onChange: (items: Item[]) => void,

  pattern: string,
  onPatternChange: (pattern: string) => void,

  options: Item[],

  equal?: (a: Item, b: Item) => boolean,
  renderItem?: ({ item: Item, onDelete: () => void }) => *,
  renderOption?: ({ option: Item, isHighlighted: boolean }) => *,

  placeholder?: string,
  className?: string,
  style?: Object,
  typeaheadClassName?: string,
  typeaheadStyle?: Object,
}

export const Tokenizer = ({
  onChange,
  value,

  pattern,
  onPatternChange,

  options,

  equal,
  renderItem,
  renderOption,

  placeholder,
  className,
  style,
  typeaheadClassName,
  typeaheadStyle,
}: Props) => (
  <div
    className={'tokenizer ' + (className || '')}
    style={{ position: 'relative', ...(style || {}) }}
  >
    <div className="tokenizer-list">
      {value.map(item =>
        renderItem({
          item,
          onDelete: () => onChange(value.filter(u => !equal(u, item))),
        })
      )}
    </div>
    <Typeahead
      onChange={x => onChange(removeDupEqual(equal)([...value, x]))}
      value=""
      pattern={pattern}
      onPatternChange={onPatternChange}
      options={options}
      renderOption={renderOption}
      placeholder={placeholder}
      className={typeaheadClassName}
      style={typeaheadStyle}
    />
  </div>
)

Tokenizer.defaultProps = {
  renderItem: defaultRenderItem,
  equal: defaultEqual,
  value: [],
}
