/* global jest */
import React from 'react'
import { Tokenizer } from '../index'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { injectFilterState } from '../hoc.filterState'
import { withValue } from './util/hoc.withValue'

Enzyme.configure({ adapter: new Adapter() })

const TokenizerFiltered = withValue(injectFilterState()(Tokenizer))

Enzyme.configure({ adapter: new Adapter() })

it('should render tokenizer, display list on focus, add value on click, filter options on input, delete value on click', () => {
  let c = Enzyme.mount(
    <TokenizerFiltered
      initValue={['a', 'c']}
      options={['a', 'b', 'c', 'aa', 'aab']}
    />
  )

  // check for values
  {
    expect(c.find('.tokenizer-values').children().length).toBe(2)
  }

  // focus the input, check for options
  {
    c.find('input').simulate('focus')

    // check for the list

    expect(
      c
        .find('.typeahead-options')
        .children()
        .map(x => x.text())
    ).toEqual(['a', 'b', 'c', 'aa', 'aab'])
  }

  // change input pattern, look for options change
  {
    c.find('input').simulate('change', { target: { value: 'a' } })

    expect(
      c
        .find('.typeahead-options')
        .children()
        .map(x => x.text())
    ).toEqual(['a', 'aa', 'aab'])
  }

  // trigger click on an option, check for value change
  {
    c
      .find('.typeahead-options')
      .children()
      .at(1)
      .simulate('mousedown')

    expect(c.state().value).toEqual(['a', 'c', 'aa'])

    expect(c.find('.tokenizer-values').children().length).toBe(3)
  }

  // delete a value
  {
    const v = c
      .find('.tokenizer-values')
      .children()
      .at(1)
      .children()

    v
      .at(1)
      .props()
      .onClick()

    // force update ?
    c.mount()

    expect(c.state().value).toEqual(['a', 'aa'])

    expect(c.find('.tokenizer-values').children().length).toBe(2)
  }
})

it('should not have duplicated value when uniqueValue=true', () => {
  let c = Enzyme.mount(
    <TokenizerFiltered
      initValue={['a', 'c']}
      options={['a', 'b', 'c', 'aa', 'aab']}
      uniqueValue
    />
  )

  // trigger click on an option, check for value change
  {
    c.find('input').simulate('focus')
    c
      .find('.typeahead-options')
      .children()
      .at(0)
      .simulate('mousedown')

    expect(c.state().value).toEqual(['a', 'c'])

    expect(c.find('.tokenizer-values').children().length).toBe(2)
  }
})
