import * as React from 'react'
import {compose, lifecycle, withState} from 'recompose'
import './spinner.css'

const DefaultSpinner = () => <div className='spinner' />

const parseResponse = response => {
  // If it does not have `ok` prop, simply return entire response
  if ('ok' in response === false) return Promise.resolve(response)

  // If the response was failed, rejecting and
  // setting error to error prop
  if (!response.ok) return Promise.reject(response)

  const contentType = response.headers.get('content-type')

  return contentType && contentType.indexOf('application/json') !== -1
    ? response.json()
    : response.text()
}

export const withFetch = requestFn => WrappedComponent => props => {
  if (typeof requestFn !== 'function') {
    throw new Error('Argument must be function')
  }

  const enhance = compose(
    withState('loading', 'setLoading', true),
    withState('data', 'setData', null),
    withState('error', 'setError', null),
    lifecycle({
      componentDidMount() {
        const {setLoading, setData, setError} = this.props
        requestFn(props)
          .then(response => parseResponse(response))
          .then(data => {
            setData(data)
            setLoading(false)
          })
          .catch(error => {
            setError(error)
            setLoading(false)
          })
      },
    })
  )

  const EnhancedComponent = enhance(({loading, data, error}) => (
    <WrappedComponent
      {...{
        loading,
        data,
        error,
        ...props,
      }}
    />
  ))

  return <EnhancedComponent />
}

export const displayWhileLoading = (
  SpinnerComopnent = DefaultSpinner
) => WrappedComponent => props => {
  return props.loading ? (
    <div
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      <SpinnerComopnent />
    </div>
  ) : (
    <WrappedComponent {...props} />
  )
}
