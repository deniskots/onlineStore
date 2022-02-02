import React from "react";


//class component
/*class Categories extends React.Component {
    state = {
        activeItem: 1
    };
    onSelectedItem = (index) => {
        this.setState({
            activeItem: index,
        });
    }

    render() {
        const{items, onClickItem} = this.props;
        return (
            <div className="categories">
                <ul>
                    <li>Все</li>
                    {items.map((name, index) =>
                        <li className={this.state.activeItem === index ? 'active' : ''}
                            onClick= {() => this.onSelectedItem(index)} key={`${name}_${index}`}>
                            {name}
                        </li>)}
                </ul>
            </div>
        )
    }
}*/


const Categories = React.memo(function Categories({items, onClickItem}) {
    const [activeItem, setActiveItem] = React.useState(null);

    const onSelectedItem = (index) => {
        setActiveItem(index);
        onClickItem(index);
    }
    return (
        <div className="categories">
            <ul>
                <li className={activeItem === null ? 'active' : ''} onClick={() => onSelectedItem(null)}>Все</li>
                {items && items.map((name, index) => (
                    <li className={activeItem === index ? 'active' : ''}
                        onClick={() => onSelectedItem(index)} key={`${name}_${index}`}>
                        {name}
                    </li>))}
            </ul>
        </div>
    );
})

export default Categories;