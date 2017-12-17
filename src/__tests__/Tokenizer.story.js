import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Tokenizer } from '../index'
import { withValue } from './hoc.withValue'

const TokenizerStateful = withValue(Tokenizer)

storiesOf('Tokenizer', module)
  .add('default (without filter logic)', () => (
    <div style={{ margin: '20px' }}>
      <Tokenizer
        value={['cc', 'ac', 'aa']}
        onChange={action('change')}
        pattern="a"
        onPatternChange={action('change pattern')}
        options={['aa', 'ab', 'bb', 'aaa', 'bbb']}
      />
    </div>
  ))
  .add('arbitrary object value', () => (
    <div style={{ margin: '20px' }}>
      <Tokenizer
        value={[{ label: 'cc' }, { label: 'ac' }, { label: 'aa' }]}
        onChange={action('change')}
        pattern="a"
        onPatternChange={action('change pattern')}
        options={[{ label: 'aaa' }, { label: 'abb' }, { label: 'bbb' }]}
        renderOption={({ option, isHighlighted, ...props }) => (
          <div
            {...props}
            key={option.label}
            style={{ padding: '10px', color: isHighlighted ? '#333' : '#aaa' }}
          >
            {option.label}
          </div>
        )}
        renderItem={({ item, onDelete }) => (
          <div key={item.label} style={{ padding: '10px' }} onClick={onDelete}>
            {item.label}
          </div>
        )}
      />
    </div>
  ))
  .add('hold value', () => (
    <div style={{ margin: '20px' }}>
      <TokenizerStateful
        initValue={['cc', 'ac', 'aa']}
        pattern=""
        options={['aa', 'ab', 'bb', 'aaa', 'bbb']}
      />
    </div>
  ))
  .add('custom style', () => (
    <div style={{ margin: '20px' }}>
      <TokenizerStateful
        customStyle={{
          tokenizer: { backgroundColor: 'yellow', padding: '10px' },
          values: { backgroundColor: 'green' },
          input: { backgroundColor: 'blue' },
          typeahead: { backgroundColor: 'orange', padding: '10px' },
          options: { backgroundColor: 'purple' },
        }}
        initValue={['cc', 'ac', 'aa']}
        pattern=""
        options={['aa', 'ab', 'bb', 'aaa', 'bbb']}
      />
    </div>
  ))
