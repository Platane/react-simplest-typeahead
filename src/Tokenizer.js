import React from 'react'
import { Typeahead } from './Typeahead'
import type { Props as TypeaheadProps } from './Typeahead'

const removeDupEqual = equal => arr =>
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
  ...TypeaheadProps,

  value: Item[],
  onChange: (items: Item[]) => void,

  equal: (a: Item, b: Item) => boolean,
  renderItem: ({ item: Item, onDelete: () => void }) => *,

  className?: string,
  style?: Object,
  customClassName: {
    typeahead?: string,
    input?: string,
    options?: string,
    values?: string,
    tokenizer?: string,
  },
  customStyle: {
    typeahead?: Object,
    input?: Object,
    options?: Object,
    values?: Object,
    tokenizer?: Object,
  },
}

export const Tokenizer = ({
  onChange,
  value,

  equal,
  renderItem,

  className,
  style,
  customClassName,
  customStyle,

  ...props
}: Props) => (
  <div
    className={
      'tokenizer ' + (className || ' ') + (customClassName.tokenizer || '')
    }
    style={{
      ...(style || {}),
      ...(customStyle.tokenizer || {}),
    }}
  >
    <div
      className={'tokenizer-values ' + (customClassName.values || '')}
      style={{
        ...(style || {}),
        ...(customStyle.values || {}),
      }}
    >
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
      customStyle={customStyle}
      customClassName={customClassName}
      {...props}
    />
  </div>
)

Tokenizer.defaultProps = {
  renderItem: defaultRenderItem,
  equal: defaultEqual,
  value: [],
  customClassName: {},
  customStyle: {},
}
