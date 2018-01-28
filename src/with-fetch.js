import * as React from 'react'
import {compose, lifecycle, withState} from 'recompose'
import './spinner.css'

const DefaultSpinner = () => <div className="spinner" />

export const withFetch = ({
  wantLoadingProp = false,
  Spinner = DefaultSpinner,
  request,
}) => WrappedComponent => props => {
  if (typeof request !== 'function') {
    throw new Error('Property request must be a function')
  } else if (request === undefined) {
    throw new Error('Property request cannot be undefined')
  }

  const enhance = compose(
    withState('isLoading', 'setIsLoading', true),
    withState('data', 'setData', null),
    withState('error', 'setError', null),
    lifecycle({
      componentDidMount() {
        const {setError, setIsLoading, setData} = this.props
        request(props)
          .then(response => {
            setData(response)
            setIsLoading(false)
          })
          .catch(e => {
            setError(e)
            setIsLoading(false)
          })
      },
    })
  )

  const WithFetch = enhance(({isLoading, error, data}) => {
    if (isLoading && wantLoadingProp) {
      return (
        <WrappedComponent
          {...{
            data,
            isLoading,
            error,
            ...props,
          }}
        />
      )
    } else {
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          {isLoading ? (
            <Spinner />
          ) : (
            <WrappedComponent {...{data, error, ...props}} />
          )}
        </div>
      )
    }
  })

  return <WithFetch />
}
