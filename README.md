# with-fetch

HOC for fetching data!

## Get started

  `yarn add with-fetch`

  `npm install with-fetch`

# Usage
The HOC will always pass along a `data` prop and a `error` prop the the enhanced component. The error prop will be null if no error was detected during the request and the data prop will also be null.

If you choose to use the default spinner. The spinner container will be sized 100% (width & height) of the parent container, if you do not approve of this behavior, it is possible to pass in a custom Spinner component with the Spinner property (Look in examples how this is done).

The HOC expects a single object that takes a set of different properties. Required properties are in **bold**.

| Name          | Description                                                                                                                                                                                                                            |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **request**       | The function that will make the request. In this function you can access props and for example generate an URL. The HOC expects Promise as return value from the 'request' property.                                                   |
| wantIsLoading | The component comes with functionality for rendering a spinner while the request is waiting. If this is set to true, the wrapped component will be rendered with this property and you can handle the wait for a response on your own. |
| Spinner       | The component comes with a default Spinner component. This allows you to pass in your own components that will be presneted during the loading time.                                                                                   |

# Examples

### Basic usage

```js
import {compose} from 'recompose'
const enhance = compose(
  connect(state => ({resource: state.resource})),
  withFetch({
    request: props => fetch(`http://localhost:8080/resource/${props.resource.id}`)
  })
)

const MyEnhancedComponent = enhance(({data, error}) => {
  return (
    <div>
     {
      error
        ? <p>Oh noes! - {error}</p>
        : <p>{data}</p>
     }
    </div>
  )
})
```

### Compose everything!

```js
import {compose} from 'recompose'
const enhance = compose(
  connect(state => ({resource: state.resource}))
  withFetch({

    // Make sure to activate this in order to handle the loading on your own!
    wantIsLoadingProp: true,
    request: props => fetch(`http://localhost:8080/resource/${props.resource.id}`)
  }),
  WrappedComponent => props => {
    return props.isLoading ? <MySpinnerComponent /> : <WrappedComponent {...props} />
  },
  WrappedComponent => props => {
    return props.error ? <p>Error - {props.error}</p> : <WrappedComponent {...props} />
  }
)

/**
 * This now only render when the fetch
 * is complete!
 */
const MyEnhancedComponent = enhance(({data}) => {
  return (
    <div>
      <p>{data}</p>
    </div>
  )
})
```

### wantIsLoading

```js
import {compose} from 'recompose'
const enhance = compose(
  withFetch({
    wantIsLoading: true,
    request: props => { ... },
  })
)

const MyEnhancedComponent = enhance(({data, error, isLoading}) => {
  return (
    <div>
      {isLoading
          ? <MySpinner />
          : <MyContainer>{/* ... */}</MyContainer>
      }
    </div>
  )
})
```

### error

```js
import {compose} from 'recompose'
const enhance = compose(
  withFetch({
    request: props => { ... }
  })
)

const MyEnhancedComponent = enhance(({data, error}) => {
  return (
    <div>{/* ... */}</div>
  )
})
```
### Custom Spinner

```js
import {compose} from 'recompose'
const enhance = compose(
  withFetch({
    // This will make the component render your own spinner.
    Spinner: <MySpinner />,
    request: props => { ... }
  })
)

const MyEnhancedComponent = enhance(({data, error}) => {
  return (
    <div>{/* ... */}</div>
  )
})
```
