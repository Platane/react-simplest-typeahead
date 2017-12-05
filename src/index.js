export { injectOptionState } from './hoc.optionState'
export { injectFilterState } from './hoc.filterState'
import { injectOptionState } from './hoc.optionState'
import { injectFilterState } from './hoc.filterState'
import { Typeahead as TypeaheadDumb_ } from './Typeahead'
import { Tokenizer as TokenizerDumb_ } from './Tokenizer'

export const TypeaheadDumb = TypeaheadDumb_
export const TokenizerDumb = TokenizerDumb_
export const Typeahead = injectOptionState(TypeaheadDumb)
export const Tokenizer = injectOptionState(TokenizerDumb)
