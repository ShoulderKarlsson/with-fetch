'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withFetch = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _recompose = require('recompose');

require('./spinner.css');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var DefaultSpinner = function DefaultSpinner() {
  return React.createElement('div', { className: 'spinner' });
};

var withFetch = exports.withFetch = function withFetch(_ref) {
  var _ref$wantLoadingProp = _ref.wantLoadingProp,
      wantLoadingProp = _ref$wantLoadingProp === undefined ? false : _ref$wantLoadingProp,
      _ref$Spinner = _ref.Spinner,
      Spinner = _ref$Spinner === undefined ? DefaultSpinner : _ref$Spinner,
      request = _ref.request;
  return function (WrappedComponent) {
    return function (props) {
      if (typeof request !== 'function') {
        throw new Error('Property request must be a function');
      } else if (request === undefined) {
        throw new Error('Property request cannot be undefined');
      }

      var enhance = (0, _recompose.compose)((0, _recompose.withState)('isLoading', 'setIsLoading', true), (0, _recompose.withState)('data', 'setData', null), (0, _recompose.withState)('error', 'setError', null), (0, _recompose.lifecycle)({
        componentDidMount: function componentDidMount() {
          var _props = this.props,
              setError = _props.setError,
              setIsLoading = _props.setIsLoading,
              setData = _props.setData;

          request(props).then(function (response) {
            setData(response);
            setIsLoading(false);
          }).catch(function (e) {
            setError(e);
            setIsLoading(false);
          });
        }
      }));

      var WithFetch = enhance(function (_ref2) {
        var isLoading = _ref2.isLoading,
            error = _ref2.error,
            data = _ref2.data;

        if (isLoading && wantLoadingProp) {
          return React.createElement(WrappedComponent, _extends({
            data: data,
            isLoading: isLoading,
            error: error
          }, props));
        } else {
          return React.createElement(
            'div',
            {
              style: {
                width: '100%',
                height: '100%'
              }
            },
            isLoading ? React.createElement(Spinner, null) : React.createElement(WrappedComponent, _extends({ data: data, error: error }, props))
          );
        }
      });

      return React.createElement(WithFetch, null);
    };
  };
};