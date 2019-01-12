import React from 'react';
import PropTypes from 'prop-types';
import getValue from 'lodash.get';

import Book from '../Book/Book';
import './BookCategory.css'
import { isArrayValidAndNotEmpty } from '../../constants/helper';

class BookCategory extends React.Component {
    render() {
        const { title, books, onMenuSelect, category } = this.props;
        return (
            <div>
                <h4 className="category-title">{title}</h4>
                <hr />
                <div className="book-container">
                    {
                        isArrayValidAndNotEmpty(books) && books.map((book, index) => (
                            <Book
                                key={`book-${index}`}
                                description={getValue(book, 'description', '')}
                                title={getValue(book, 'title', '')}
                                imgUrl={getValue(book, 'imgUrl', '')}
                                category={category}
                                onMenuSelect={onMenuSelect}
                                index={getValue(book, 'originalIndex', null)}
                            />
                        ))
                    }
                    {
                        !(isArrayValidAndNotEmpty(books)) &&
                            <h4>No Books Found in {'"'}{title}{'"'}</h4>
                    }
                </div>
            </div>
        )
    }
}

BookCategory.propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onMenuSelect: PropTypes.func.isRequired,
    category: PropTypes.string.isRequired,
};

BookCategory.defaultProps = {};

export default BookCategory;