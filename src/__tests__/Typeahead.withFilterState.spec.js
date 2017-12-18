/* global jest */
import React from 'react'
import { Typeahead } from '../index'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { withValue } from './util/hoc.withValue'
import { injectFilterState } from '../hoc.filterState'

Enzyme.configure({ adapter: new Adapter() })

const TypeaheadStateful = withValue(injectFilterState()(Typeahead))

it('should render typeahead, display list on focus, and change value on click', () => {
  let c = Enzyme.mount(
    <TypeaheadStateful initValue="a" options={['a', 'b', 'c', 'aa', 'aac']} />
  )

  // focus the input, set the pattern, check for options
  {
    c.find('input').simulate('focus')
    c.find('input').simulate('change', { target: { value: 'aa' } })

    // check for the list

    expect(
      c
        .find('.typeahead-options')
        .children()
        .map(x => x.text())
    ).toEqual(['aa', 'aac'])
  }
})
