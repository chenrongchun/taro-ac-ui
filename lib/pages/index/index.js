import { Component } from 'react';
import { View, Text } from '@tarojs/components';
import './index.scss';
export default class Index extends Component {
    componentWillMount() { }
    componentDidMount() { }
    componentWillUnmount() { }
    componentDidShow() { }
    componentDidHide() { }
    render() {
        return (React.createElement(View, { className: 'index' },
            React.createElement(Text, null, "Hello world!")));
    }
}
//# sourceMappingURL=index.js.map