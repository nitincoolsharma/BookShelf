import React from 'react';
import PropTypes from 'prop-types';

import './Book.css';

const BOOK_CATEGORIES = [
    {
        title: 'Currently Read',
        value: 'currentlyReading',
    },
    {
        title: 'Want To Read',
        value: 'wantToRead',
    },
    {
        title: 'Read',
        value: 'read',
    }
];

class Book extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAddClicked: false,
        };
    }

    handleAdd = () => {
        const { isAddClicked } = this.state;
        this.setState({ isAddClicked: !isAddClicked });
    };

    handleMenuSelect = (index, category) => {
        this.setState({ isAddClicked: false });
        const { onMenuSelect } = this.props;
        onMenuSelect(index, category);
    };

    render() {
        const { description, imgUrl, title, category, index } = this.props;
        const { isAddClicked } = this.state;
        return (
            <div className="book-relative">
                <div className="book">
                    <img className="book-img" src={imgUrl} alt={title} />
                    <h4 className="book-title">{title}</h4>
                    <p className="book-description">{description}</p>
                </div>
                {
                    (!isAddClicked) &&
                        <div
                            className="book-select-menu-button"
                            onClick={this.handleAdd}
                        >
                            Add
                        </div>
                }
                {
                    isAddClicked &&
                        <div className="select-menu-category">
                            {
                                BOOK_CATEGORIES.map(bookCategory => (
                                    <div
                                        onClick={() => this.handleMenuSelect(index, bookCategory.value)}
                                        className={bookCategory.value === category ?
                                            'select-menu-category-item-selected' : 'select-menu-category-item'}
                                    >
                                        {bookCategory.title}
                                    </div>
                                ))
                            }
                        </div>
                }
            </div>
        );
    }
}

Book.propTypes = {
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imgUrl: PropTypes.string,
    category: PropTypes.string,
    index: PropTypes.number,
    onMenuSelect: PropTypes.func,
};

Book.defaultProps = {
    imgUrl: '',
    index: null,
    onMenuSelect: () => {},
    category: '',
};

export default Book;