import React from 'react'
import { Typeahead } from './Typeahead'
import { injectOptionState } from './hoc.optionState'
import type { Props as TypeaheadProps } from './Typeahead'

const TypeaheadWithOptionState = injectOptionState(Typeahead)

const removeDup = arr => {
  const m = new Map()
  return arr.filter(x => {
    const accept = m.has(x)
    m.set(x, true)
    return accept
  })
}

const identity = x => x

const defaultRenderItem = ({ i, item, onDelete }) => (
  <div
    key={i}
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

export type Item = any

export type Props = {
  ...TypeaheadProps,

  value: Item[],
  uniqueValue: boolean,
  onChange: (items: Item[]) => void,

  renderItem: ({ item: Item, onDelete: () => void, i: number }) => *,

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
  uniqueValue,

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
      {value.map((item, i) =>
        renderItem({
          ...props,
          i,
          item,
          onDelete: () => onChange(value.filter((_, j) => i != j)),
        })
      )}
    </div>
    <TypeaheadWithOptionState
      {...props}
      onChange={x =>
        onChange((uniqueValue ? removeDup : identity)([...value, x]))
      }
      value=""
      customStyle={customStyle}
      customClassName={customClassName}
    />
  </div>
)

Tokenizer.defaultProps = {
  uniqueValue: false,
  renderItem: defaultRenderItem,
  value: [],
  customClassName: {},
  customStyle: {},
}
