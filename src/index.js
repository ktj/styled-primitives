// https://github.com/styled-components/styled-components/blob/master/src/primitives/index.js
import reactPrimitives from 'react-brimitives'

import _InlineStyle from 'styled-components/lib/models/InlineStyle'
import _StyledNativeComponent from 'styled-components/lib/models/StyledNativeComponent'
import _constructWithOptions from 'styled-components/lib/constructors/constructWithOptions'

import css from 'styled-components/lib/constructors/css'
import ThemeProvider from 'styled-components/lib/models/ThemeProvider'
import withTheme from 'styled-components/lib/hoc/withTheme'

const constructWithOptions = _constructWithOptions(css)
const InlineStyle = _InlineStyle(reactPrimitives.StyleSheet)
const StyledNativeComponent = _StyledNativeComponent(
  constructWithOptions,
  InlineStyle,
)
const styled = (tag) => constructWithOptions(StyledNativeComponent, tag)

/* React native lazy-requires each of these modules for some reason, so let's
*  assume it's for a good reason and not eagerly load them all */
const aliases = 'Image Text Touchable View '

/* Define a getter for each alias which simply gets the reactNative component
 * and passes it to styled */
aliases.split(/\s+/m).forEach(alias => Object.defineProperty(styled, alias, {
  enumerable: true,
  configurable: false,
  get() {
    return styled(reactPrimitives[alias])
  },
}))

export { css, ThemeProvider, withTheme }
export default styled
