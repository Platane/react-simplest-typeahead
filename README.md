# react-simplest-typeahead

yet another typeahead component

[![wercker status](https://app.wercker.com/status/315b74edfe5584956bf25ce9d92109c4/s/master "wercker status")](https://app.wercker.com/project/byKey/315b74edfe5584956bf25ce9d92109c4) [![npm](https://img.shields.io/npm/v/react-simplest-typeahead.svg)](https://www.npmjs.com/package/react-simplest-typeahead)

[storybook](https://platane.github.io/react-simplest-typeahead)

# Motivation

Why this typeahead component?

* build for composability, two small dumb component and two hoc. Use what you
  need, replace the other parts.
* support styling with styled-component ( it delegates the className props )
* tested

# Usage

Out of the box, the component works great with primitive values

```js
import { injectFilterState, Typeahead } from 'react-simplest-typeahead'

// enhance the typeahead with the filter behavior
const TypeaheadWithFilterState = injectFilterState()(Typeahead)

// notice that it act like an html input ( with value / onChange props )
const NameSelector = ({ selectedName, onSelectName }) => (
  <TypeaheadWithFilterState
    value={selectedName}
    onChange={onSelectName}
    options={['tim', 'bill', 'joe']}
  />
)
```

It also works great with complex item structure.

```js
import { injectFilterState, Typeahead } from 'react-simplest-typeahead'

// in order to use the filterState higher order component, let's declare a filter function
// it should tell whever an item in the option list should be displayed according to the pattern inputed
const filterFunction = pattern => user => user.name.includes(pattern)

// enhance the typeahead with the filter behavior
const TypeaheadWithFilterState = injectFilterState({ filter: filterFunction })(
  Typeahead
)

// let's declare a custom renderer for the options
const renderOption = ({ item, isHighlighted }) => (
  <div>
    <img src={item.picture} />
    <span>{item.name}</span>
  </div>
)

// wrap this up in a user selector
const UserSelector = ({ selectedUser, onSelectUser, users }) => (
  <TypeaheadWithFilterState
    value={user}
    onChange={onSelectUser}
    options={users}
    renderOption={renderOption}
    customStyle={{
      input: {
        fontSize: '20px',
      },
    }}
  />
)
```

# API

## Typeahead

* `value : Item` can be anything, it's the currently selected item
* `onChange : ( v: Item ) => void` callback for when the selected Item change
* `options : Item[]` a list of the possible values

**styling**

* `placeholder ?: string` placeholder for the input
* `renderOption ?: ({ option: Item, isHighlighted: boolean }) => Component`
  render the item into the options panel. By default it renders the item as
  string.
* `className ?: string` the className to set on the container element. ( useful
  when using styled-component syntax )
* `style ?: Object` the style to apply on the container element.
* `customClassName ?: { ['typeahead' | 'input' | 'options']: string }` custom
  className for each element
* `customStyle ?: { ['typeahead' | 'input' | 'options']: Obect }` custom style
  object for each element

**filtering state**

This props handles the filtering to options, according to the search pattern
inputed.

* `pattern : string` The filtering pattern
* `onPatternChange : ( pattern : string) => void` callback for when the pattern
  change, the pattern value should reflect this change. Usualy, this should
  trigger a change in the `options` props as well.

**option state**

This props handles the options panel state. By default, they are injected by the
hoc `hoc.optionState`. You can declare custom behavior if you skip the hoc.

* `opened : boolean` true is the options panel is opened
* `open : () => void` callback for when the input is focused
* `close : () => void` callback for when the input is blurred

- `indexHighlighted : number | null` the index of the highlighted option
- `onOptionHover : ( index : number | null ) => void` callback for when a option
  is hovered
- `onKeyDown : ( event: KeyboardEvent ) => void` callback for keydown event in
  input

## Tokenizer

The tokenizer delegate most of the props to the typeahead. The most important
change is that the value is an array of items, instead of the single one:

* `value : Item[]`
* `onChange : ( items: Item[] ) => void`

As the value includes only distinct items, you should pass a custom equal
function if the item are more complexes than primitive.

* `equal: (a: Item, b: Item) => boolean`

**styling**

Also, it take additional props for styling:

* `renderItem: ({ item: Item, onDelete: () => void }) => Component`

And declare another elements that accepts custom styling

* `customClassName ?: { ['tokenizer' | 'value' | 'typeahead' | 'input' |
  'options']: string }` custom className for each element
* `customStyle ?: { ['tokenizer' | 'value' | 'typeahead' | 'input' |
  'options']: Obect }` custom style object for each element
