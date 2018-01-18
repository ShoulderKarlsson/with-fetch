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

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var DefaultSpinner = function DefaultSpinner() {
  return React.createElement('div', { className: 'spinner' });
};

var withFetch = function withFetch(_ref) {
  var _ref$url = _ref.url,
      url = _ref$url === undefined ? '' : _ref$url,
      urlGenerator = _ref.urlGenerator,
      _ref$wantLoadingProp = _ref.wantLoadingProp,
      wantLoadingProp = _ref$wantLoadingProp === undefined ? false : _ref$wantLoadingProp,
      _ref$Spinner = _ref.Spinner,
      Spinner = _ref$Spinner === undefined ? DefaultSpinner : _ref$Spinner,
      requester = _ref.requester,
      _ref$payload = _ref.payload,
      payload = _ref$payload === undefined ? {} : _ref$payload;
  return function (WrappedComponent) {
    return function (props) {
      if (!url && typeof urlGenerator !== 'function') {
        throw new Error('Must provide url or urlGenerator');
      } else if (typeof requester !== 'function') {
        throw new Error('Must provide a requester function');
      }

      var enhance = (0, _recompose.compose)((0, _recompose.withState)('isLoading', 'setIsLoading', true), (0, _recompose.withState)('data', 'setData', null), (0, _recompose.withState)('error', 'setError', null), (0, _recompose.lifecycle)({
        componentDidMount: function componentDidMount() {
          var _props = this.props,
              setError = _props.setError,
              setIsLoading = _props.setIsLoading,
              setData = _props.setData;


          var _url = typeof urlGenerator === 'function' ? urlGenerator(props) : url;

          requester({ url: _url, payload: payload }).then(function (response) {
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
            data = _ref2.data,
            props = _objectWithoutProperties(_ref2, ['isLoading', 'error', 'data']);

        if (isLoading && wantLoadingProp) {
          return React.createElement(WrappedComponent, _extends({
            isLoading: isLoading
          }, props));
        } else if (!isLoading && error) {
          return React.createElement(WrappedComponent, _extends({ error: error }, props));
        } else {
          return React.createElement(
            'div',
            {
              style: {
                width: '100%',
                height: '100%'
              }
            },
            isLoading ? React.createElement(Spinner, null) : React.createElement(WrappedComponent, _extends({ data: data, isLoading: isLoading }, props))
          );
        }
      });

      return React.createElement(WithFetch, null);
    };
  };
};
exports.withFetch = withFetch;