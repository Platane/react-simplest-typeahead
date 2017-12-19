export { injectOptionState } from './hoc.optionState'
export { injectFilterState } from './hoc.filterState'
import { injectOptionState } from './hoc.optionState'
import { injectFilterState } from './hoc.filterState'
import { Typeahead as TypeaheadDumb_ } from './Typeahead'
export { Tokenizer } from './Tokenizer'

export const TypeaheadDumb = TypeaheadDumb_
export const Typeahead = injectOptionState(TypeaheadDumb)
