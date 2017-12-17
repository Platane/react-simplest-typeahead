# Usage

## Typeahead

* `value : Item` can be anything, it's the currently selected item
* `onChange : ( v: Item ) => void` callback for when the selected Item change
* `options : Item[]` a list of the possible values


__styling__

* `placeholder ?: string` placeholder for the input
* `renderOption ?: ({ option: Item, isHighlighted: boolean }) => Component` render the item into the options panel. By default it renders the item as string.
* `className ?: string` the className to set on the container element. ( useful when using styled-component syntax )
* `style ?: Object` the style to apply on the container element.
* `cusmtomClassName ?: { ['typeahead' | 'input' | 'options']: string }` custom className for each element
* `cusmtomStyle ?: { ['typeahead' | 'input' | 'options']: Obect }` custom style object for each element


__filtering state__

This props handles the filtering to options, according to the search pattern inputed. 

* `pattern : string` The filtering pattern
* `onPatternChange : ( pattern : string) => void` callback for when the pattern change, the pattern value should reflect this change. Usualy, this should trigger a change in the `options` props as well.

__option state__

This props handles the options panel state.
By default, they are injected by the hoc `hoc.optionState`.
You can declare custom behavior if you skip the hoc.

* `opened : boolean` true is the options panel is opened
* `open : () => void` callback for when the input is focused
* `close : () => void` callback for when the input is blurred


* `indexHighlighted : number | null` the index of the highlighted option
* `onOptionHover : ( index : number | null ) => void` callback for when a option is hovered
* `onKeyDown : ( event: KeyboardEvent ) => void` callback for keydown event in input

## Tokenizer

The tokenizer delegate most of the props to the typeahead. The most important change is that the value is an array of items, instead of the single one:

* `value : Item[]`
* `onChange : ( items: Item[] ) => void`

As the value includes only distinct items, you should pass a custom equal function if the item are more complexes than primitive.

* `equal: (a: Item, b: Item) => boolean`


__styling__

Also, it take additional props for styling:

* `renderItem: ({ item: Item, onDelete: () => void }) => Component`

And declare another elements that accepts custom styling

* `cusmtomClassName ?: { ['tokenizer' | 'value' | 'typeahead' | 'input' | 'options']: string }` custom className for each element
* `cusmtomStyle ?: { ['tokenizer' | 'value' | 'typeahead' | 'input' | 'options']: Obect }` custom style object for each element

