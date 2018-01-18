import * as React from 'react'
import {compose, lifecycle, withState} from 'recompose'
import './spinner.css'

const DefaultSpinner = () => <div className='spinner'></div>

export const withFetch = ({
  url = '',
  urlGenerator,
  wantLoadingProp = false,
  Spinner = DefaultSpinner,
  requester,
  payload = {},
}) => WrappedComponent => props => {
  if (!url && typeof urlGenerator !== 'function') {
    throw new Error('Must provide url or urlGenerator')
  } else if (typeof requester !== 'function') {
    throw new Error('Must provide a requester function')
  }

  const enhance = compose(
    withState('isLoading', 'setIsLoading', true),
    withState('data', 'setData', null),
    withState('error', 'setError', null),
    lifecycle({
      componentDidMount() {
        const {setError, setIsLoading, setData} = this.props

        const _url =
          typeof urlGenerator === 'function' ? urlGenerator(props) : url

        requester({url: _url, payload})
          .then(response => {
            setData(response)
            setIsLoading(false)
          })
          .catch(e => {
            setError(e)
            setIsLoading(false)
          })
      },
    }),
  )

  const WithFetch = enhance(({isLoading, error, data, ...props}) => {
    if (isLoading && wantLoadingProp) {
      return (
        <WrappedComponent
          {...{
            isLoading,
            ...props,
          }}
        />
      )
    } else if (!isLoading && error) {
      return <WrappedComponent {...{error, ...props}} />
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
            <WrappedComponent {...{data, isLoading, ...props}} />
          )}
        </div>
      )
    }
  })

  return <WithFetch />
}
