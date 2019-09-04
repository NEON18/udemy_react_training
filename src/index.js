import React  from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

function Hello(props)  {
    return(
        <div>
            <h1>
                こんにちは{props.name}さん
            </h1>
            <input type="text" onChange={props.updateName} />
        </div>
    );
}

Hello.propsTypes = {
    name: PropTypes.string
}

Hello.defaultProps = {
    name: 'ほげほげ'
}

class Message extends React.Component {
    constructor(){
        super();
        this.state = {
            name: ''
        };
        this.updateName = this.updateName.bind(this)
    }
    updateName(event){
        console.log("updateNameが呼びだされました。");
        this.setState({
            name: event.target.value
        });
    }
    render() {
        return (
            <section>
                <Hello name={this.state.name} updateName={this.updateName} />
                <Hello name={this.state.name} updateName={this.updateName} />
                <Hello name={this.state.name} updateName={this.updateName} />
                <p>
                    Messageコンポーネントが書き出されました！
                </p>
            </section>
        );
    }
}

class Morning extends React.Component {
    render(){
        return(
            <section>
                <h1>おはようございます</h1>
                <p>
                    Morningコンポーネントが書き出されました。
                </p>
            </section>
        );
    }
}

ReactDOM.render(
    <Message />,
    document.getElementById('root')

);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
