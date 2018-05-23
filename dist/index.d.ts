import {ComponentClass, SFC} from 'react'


type RequestFunction<TOwnProps, TResult> = (
  props: TOwnProps,
) => Promise<TResult | Response>

type Props<TOwnProps, TResult> = TOwnProps & {
  data: TResult
  loading: boolean
  error: any
}

type HOCFunction<TOwnProps, TResult> = ((
  WrappedComponent:
    | ComponentClass<Props<TOwnProps, TResult>>
    | SFC<Props<TOwnProps, TResult>>,
) => React.ComponentClass<TOwnProps>)

type WithFetch = <TOwnProps, TResult>(
  requestFn: RequestFunction<TOwnProps, TResult>,
) => HOCFunction<TOwnProps, TResult>

export const withFetch: WithFetch
