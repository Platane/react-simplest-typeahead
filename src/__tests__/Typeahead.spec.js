/* global jest */
import React from 'react'
import { Typeahead } from '../index'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { withValue } from './util/hoc.withValue'

Enzyme.configure({ adapter: new Adapter() })

const TypeaheadStateful = withValue(Typeahead)

it('should render typeahead, display list on focus, and change value on click', () => {
  let c = Enzyme.mount(
    <TypeaheadStateful initValue="a" options={['a', 'b', 'c']} />
  )

  //check for value
  {
    expect(c.find('input').props().value).toBe('a')
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
    ).toEqual(['a', 'b', 'c'])
  }

  // trigger click on an option, check for value change
  {
    c
      .find('.typeahead-options')
      .children()
      .at(1)
      .simulate('mousedown')

    expect(c.state().value).toBe('b')
  }
})
