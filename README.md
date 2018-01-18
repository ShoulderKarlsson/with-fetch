# with-fetch
HOC for fetching data

## Get started
  yarn add somenamehere
  npm install somenamehere


# Usage
This HOC is designed to be applied in `recompose` compose chain. You can read about recompose [here]().

The HOC expects a single Object with a set of different properties.

|Name|Description|
|---|---|
|url| Endpoint where the request should be sent.|
|urlGenerator| A function that simply constructs a url. This function will reciew the wrapped components props. Here you can for example access a redux store.|
|requester| A function that will make the request.|
|wantIsLoading| The component comes with functionality for rendering a spinner while the request is waiting. If this is set to true, the wrapped component will be rendered with this property and you can handle the wait for a response on your own.|
|Spinner| The component comes with a default Spinner component. This allows you to pass in your own components that will be presneted during the loading time.|


# Examples

### url
```js
import {compose} from 'recompose'
const enhance = compose(
  withFetch({
    url: 'http://somepath.com',
    requester: () => { ... }
  })
)

const MyEnhancedComponent = enhance(({data}) => {
  return (
    <div>
      {/* ... */}
    </div>
  )
})

```

### urlGenerator
```js
import {compose} from 'recompose'
const enhance = compose(
  withFetch({
    urlGenerator: props => `http://someurl.com/user/${props.user.id}`
    requester: () => { ... }
  })
)

const MyEnhancedComponent = enhance(({data}) => {
  return (
    <div>
      {/* ... */}
    </div>
  )
})

```
### wantIsLoading
```js
import {compose} from 'recompose'
const enhance = compose(
  withFetch({
    urlGenerator: props => `http://someurl.com/user/${props.user.id}`
    requester: () => { ... }
    wantIsLoading: true,
  })
)

const MyEnhancedComponent = enhance(({data, isLoading}) => {
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

