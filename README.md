# with-fetch

HOC for simple data fetching designed for [fetch api](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

## Installation

`$ yarn add with-fetch`  
 `$ npm install with-fetch`

## How it works

The component exports two HOC's

* withFetch
* displayWhileLoading

### withFetch

This HOC is where the fetching is done. The HOC will fetch, parse and then pass the data to the final component.

#### Basic Usage

```js
import {withFetch} from 'with-fetch'
import {compose} from 'recompose'
import fetch from 'isomorphic-fetch'

export const MyComopnent = compose(
  withFetch(props => fetch(`http://myResource.com/${props.someResourceId}`))
)(({data, loading, error}) => {
  if (error) {
    return <MyErrorComponent error={error} />
  }

  if (loading) return <MySpinner />

  return <div>{data}</div>
})
```

### displayWhileLoading

This HOC displays a spinner, it comes with a somewhat ugly default spinner but accepts a custom spinner. The HOC is designed to take up 100% space of the wrapper component.

#### Basic Usage (Combined with withFetch)

```js
import {withFetch, displayWhileLoading} from 'with-fetch'
import {compose} from 'recompose'
import fetch from 'isomorphic-fetch'

const MyCustomSpinner = () => <div>Spinning into places</div>

const enhance = compose(
  withFetch(props => fetch(`http://myResource.com/${props.someResourceId}`)),

  // Your spinner will be displayed until the data is returned

  // ####################################################################
  // If you dont pass any argument, the HOC will render a default spinner
  // ####################################################################
  displayWhileLoading(MyCustomSpinner)
)

const MyComponent = enhance(({data, loading, error}) => {
  // If you dont want this inside your render, move this functionality into a HOC aswell!
  if (error) return <MyErrorComponent error={error} />
  return <div>{data}</div>
})
```
