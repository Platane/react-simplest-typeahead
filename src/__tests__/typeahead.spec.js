/* global jest */
import React from 'react'
import { Typeahead } from '../index'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

it('should render typeahead, display list on focus, and change value on click', () => {
  let value = 'x'
  const onChange = x => (value = x)

  let c = Enzyme.mount(
    <Typeahead value={value} onChange={onChange} options={['a', 'b', 'c']} />
  )

  // find input
  const input = c.find('input')

  expect(input.props().value).toBe('x')

  // focus the input
  input.simulate('focus')

  // update (?)
  c.mount()

  // check for the list
  const options = c.find('.typeahead-list').children()

  expect(options.at(0).text()).toBe('a')
  expect(options.at(1).text()).toBe('b')
  expect(options.at(2).text()).toBe('c')

  // trigger click
  options.at(1).simulate('mousedown')

  // update (?)
  c.mount()

  expect(value).toBe('b')
})
