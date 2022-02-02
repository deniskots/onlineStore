import React from 'react';
import {Header} from "./components";
import {Home, Cart} from "./pages";
import {Routes, Route} from "react-router-dom";


function App() {
    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home/>} exact/>
                    <Route path="/cart" element={<Cart/>} exact/>
                </Routes>
            </div>
        </div>
    );
};


//class component
/*class App extends React.Component {
    componentDidMount() {
        axios.get('http://localhost:3000/db.json').then(({data}) => {
            this.props.setProducts(data.products);
        });
    };

    render() {
        return (
            <div className="wrapper">
                <Header/>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home items={this.props.items}/>} exact/>
                        <Route path="/cart" element={<Cart/>} exact/>
                    </Routes>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.products.items,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setProducts: (items) => dispatch(setProducts(items))
    }
}
и добавить конект и прокинуть две функцюкомпоненты
*/


export default App;
