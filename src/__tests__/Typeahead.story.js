import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Typeahead } from '../index'
import { withValue } from './hoc.withValue'

const TypeaheadStateful = withValue(Typeahead)

storiesOf('Typeahead', module)
  .add('default (with filter logic)', () => (
    <div style={{ margin: '20px' }}>
      <Typeahead
        pattern="a"
        onPatternChange={action('change pattern')}
        onChange={action('change')}
        options={['aa', 'ab', 'bb', 'aaa', 'bbb']}
      />
    </div>
  ))
  .add('arbitrary object value', () => (
    <div style={{ margin: '20px' }}>
      <Typeahead
        pattern="a"
        renderOption={({ option, isHighlighted, ...props }) => (
          <div
            {...props}
            key={option.label}
            style={{ padding: '10px', color: isHighlighted ? '#333' : '#aaa' }}
          >
            {option.label}
          </div>
        )}
        onPatternChange={action('change pattern')}
        onChange={action('change')}
        options={[{ label: 'aaa' }, { label: 'abb' }, { label: 'bbb' }]}
      />
    </div>
  ))

  .add('hold value', () => (
    <div style={{ margin: '20px' }}>
      <TypeaheadStateful
        initValue="aa"
        pattern=""
        options={['aa', 'ab', 'bb', 'aaa', 'bbb']}
      />
    </div>
  ))
