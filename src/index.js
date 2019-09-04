import React  from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const url = "http://localhost:8888/posts";

class Form extends React.Component {
    constructor(props){
        super(props);

        this.state= {
            title: "",
            body: ""
        }

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTitleChange(event){
        console.log("state:title ",this.state.title);
        this.setState({title: event.target.value});
    }

    handleSubmit(event){
        console.log("handleSubmit");
        // alert('送信内容:' + this.state.title + this.state.body);
        event.preventDefault();

        this.props.addPost(this.state.title,this.state.body);
    }

    handleBodyChange(event){
        console.log("state:body ",this.state.body);
        this.setState({body: event.target.value});
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>
                        タイトル:
                        <input type="text" value={this.state.title} onChange={this.handleTitleChange} />
                    </label>
                </div>
                <div>
                    <label>
                        本文:
                        <input type="text" value={this.state.body} onChange={this.handleBodyChange} />
                    </label>
                </div>
                <div>
                    <input type="submit" value="追加" />
                </div>
            </form>
        );
    }
}
class Posts extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            posts: this.props.posts
        };

        this.add = this.add.bind(this);
    }

    add(title,body){
        console.log("add is called");
        console.log("title",title);
        console.log("body",body);


    fetch(url,{
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body:"title=" + title + "&body=" + body
    }).then(function(response){
        return response.json();
    }).then(function(json) {

        console.log(json);

        let count = this.state.posts.length + 1;

        this.state.posts.push({
            title: json.title,
            body: json.body,
            id: count
        });

        this.setState(this.state);
    }.bind(this));
    }

    render(){
        return(
            <section>
                {this.state.posts.map(function(post, index){
                    return(
                        <section key={post.id}>
                            <h1>{post.title}</h1>
                            <p>{post.body},</p>
                        </section>
                    );
                }.bind(this))}
                <Form addPost={this.add} />
            </section>
        );
    }
}

fetch(url).then(function(response){
    return response.json();
}).then(function(json){
    console.log(json);


    ReactDOM.render(
        <Posts posts={json} />,
        document.getElementById('root')
        );
    });




// function Hello(props)  {
//     return(
//         <div>
//             <h1>
//                 こんにちは{props.name}さん
//             </h1>
//             <input type="text" onChange={props.updateName} />
//         </div>
//     );
// }
//
// Hello.propsTypes = {
//     name: PropTypes.string
// }
//
// Hello.defaultProps = {
//     name: 'ほげほげ'
// }
//
// class Message extends React.Component {
//     constructor(){
//         super();
//         this.state = {
//             name: ''
//         };
//         this.updateName = this.updateName.bind(this)
//     }
//     updateName(event){
//         console.log("updateNameが呼びだされました。");
//         this.setState({
//             name: event.target.value
//         });
//     }
//     render() {
//         return (
//             <section>
//                 <Hello name={this.state.name} updateName={this.updateName} />
//                 <Hello name={this.state.name} updateName={this.updateName} />
//                 <Hello name={this.state.name} updateName={this.updateName} />
//                 <p>
//                     Messageコンポーネントが書き出されました！
//                 </p>
//             </section>
//         );
//     }
// }
//
// class Morning extends React.Component {
//     render(){
//         return(
//             <section>
//                 <h1>おはようございます</h1>
//                 <p>
//                     Morningコンポーネントが書き出されました。
//                 </p>
//             </section>
//         );
//     }
// }
//
// ReactDOM.render(
//     <Message />,
//     document.getElementById('root')
//
// );
//
// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
