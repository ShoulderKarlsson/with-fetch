'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayWhileLoading = exports.withFetch = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _recompose = require('recompose');

require('./spinner.css');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var DefaultSpinner = function DefaultSpinner() {
  return React.createElement('div', { className: 'spinner' });
};

var parseResponse = function parseResponse(response) {
  if (!response.ok) return Promise.reject(response);
  var contentType = response.headers.get('content-type');
  if (contentType && contentType.indexOf('application/json') !== -1) {
    return response.json();
  } else {
    return response.text();
  }
};

var withFetch = exports.withFetch = function withFetch(requestFn) {
  return function (WrappedComponent) {
    return function (props) {
      console.log('NEW WITH FETCH');
      if (typeof requestFn !== 'function') {
        throw new Error('Argument must be function');
      }

      var enhance = (0, _recompose.compose)((0, _recompose.withState)('loading', 'setLoading', true), (0, _recompose.withState)('data', 'setData', null), (0, _recompose.withState)('error', 'setError', null), (0, _recompose.lifecycle)({
        componentDidMount: function componentDidMount() {
          var _props = this.props,
              setLoading = _props.setLoading,
              setData = _props.setData,
              setError = _props.setError;

          requestFn(props).then(function (response) {
            return parseResponse(response);
          }).then(function (data) {
            setData(data);
            setLoading(false);
          }).catch(function (error) {
            setError(error);
            setLoading(false);
          }).catch(function (error) {
            return setError(error);
          });
        }
      }));

      var EnhancedComponent = enhance(function (_ref) {
        var loading = _ref.loading,
            data = _ref.data,
            error = _ref.error;
        return React.createElement(WrappedComponent, _extends({
          loading: loading,
          data: data,
          error: error
        }, props));
      });

      return React.createElement(EnhancedComponent, null);
    };
  };
};

var displayWhileLoading = exports.displayWhileLoading = function displayWhileLoading() {
  var SpinnerComopnent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DefaultSpinner;
  return function (WrappedComponent) {
    return function (props) {
      console.log('Using default spinner component');
      return props.loading ? React.createElement(
        'div',
        {
          style: {
            height: '100%',
            width: '100%'
          }
        },
        React.createElement(SpinnerComopnent, null)
      ) : React.createElement(WrappedComponent, props);
    };
  };
};