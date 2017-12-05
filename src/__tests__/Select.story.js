import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Typeahead } from '../index'
import { withValue } from './hoc.withValue'

const TypeaheadStateful = withValue(Typeahead)

storiesOf('Select', module)
  .add('default', () => (
    <div style={{ margin: '20px' }}>
      <Typeahead
        pattern=""
        value={'aa'}
        onChange={action('change')}
        options={['aa', 'ab', 'bb', 'aaa', 'bbb']}
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
