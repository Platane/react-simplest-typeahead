import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Typeahead } from '../index'
import { Tokenizer } from '../index'
import { withValue } from './util/hoc.withValue'
import { injectFilterState } from '../hoc.filterState'

const TypeaheadStateful = withValue(injectFilterState()(Typeahead))
const TokenizerStateful = withValue(injectFilterState()(Tokenizer))

storiesOf('withFilterState', module)
  .add('typeahead with hoc filter state', () => (
    <div style={{ margin: '20px' }}>
      <TypeaheadStateful
        initValue="aa"
        options={['aa', 'ab', 'bb', 'aaa', 'bbb']}
      />
    </div>
  ))
  .add('tokenizer with hoc filter state', () => (
    <div style={{ margin: '20px' }}>
      <TokenizerStateful
        initValue={['aa', 'bb']}
        options={['aa', 'ab', 'bb', 'aaa', 'bbb']}
      />
    </div>
  ))
