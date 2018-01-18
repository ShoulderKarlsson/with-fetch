# with-fetch
HOC for fetching data

## Get started
  yarn add somenamehere
  npm install somenamehere


# Usage
This HOC is designed to be applied in `recompose` compose chain. You can read about recompose [here]().
The HOC will always pass a prop do the wrapped component called `data` wich contains the reponse from the request. If an error occured during the request, a prop `error` will be passed to the wrapped component.


The HOC expects a single object that takes a set of different properties. Required properties are in **bold**.

### NOTE
url *or* urlGenerator is required, if both are sent in the HOC will prioritize the urlGenerator function.

|Name|Description|
|---|---|
|**url**| Endpoint where the request should be sent.|
|**urlGenerator**| A function that simply constructs a url. This function will reciew the wrapped components props. Here you can for example access a redux store.|
|**requester**| A function that will make the request.|
|wantIsLoading| The component comes with functionality for rendering a spinner while the request is waiting. If this is set to true, the wrapped component will be rendered with this property and you can handle the wait for a response on your own.|
|Spinner| The component comes with a default Spinner component. This allows you to pass in your own components that will be presneted during the loading time.|


# Examples

### url
```js
import {compose} from 'recompose'
const enhance = compose(
  requester({
    url: 'http://someurl.com',
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
  })
)

const MyEnhancedComponent = enhance(({data}) => {
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
  withfetch({
    urlgenerator: props => `http://someurl.com/user/${props.user.id}`
    requester: () => { ... }
  })
)

const MyEnhancedComponent = enhance(({error}) => {
  return (
    <div>{/* ... */}</div>
  )
})
```
