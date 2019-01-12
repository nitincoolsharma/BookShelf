import React from 'react';
import PropTypes from 'prop-types';
import getValue from 'lodash.get';
import deepEqual from 'deep-equal';
import { connect } from 'react-redux';

import { isArrayValidAndNotEmpty } from '../../constants/helper';
import TextField from '../../components/TextField';
import Book from '../../components/Book/Book';
import './Search.css';
import { changeData } from '../../redux/books/book-actions';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            books: [],
            filterBooks: [],
        };
    }

    componentDidMount() {
        const { books } = this.props;
        this.setState({
            books: getValue(books,'data.books', []),
            filterBooks: getValue(books,'data.books', []),
        })
    }

    componentWillReceiveProps(nextProps) {
        const prevBooks = this.props.books;
        const nextBooks = nextProps.books;
        if (!deepEqual(prevBooks, nextBooks)) {
            this.setState({
                books: getValue(nextBooks,'data.books', []),
                filterBooks: getValue(nextBooks,'data.books', [])
            })
        }
    }

    handleSearch = (event) => {
        const value = getValue(event, 'target.value', '');
        const { books } = this.state;
        if (value) {
            this.filterBookByText(value);
        } else {
            this.setState({ filterBooks: books });
        }
        this.setState({ searchText: event.target.value });
    };

    filterBookByText = (value) => {
        const { books } = this.state;
        const filterBooks = [];
        if (isArrayValidAndNotEmpty(books)) {
            books.map((b, index) => {
                const title = getValue(b, 'title', '');
                const desc = getValue(b, 'description', '');
                if (title.toLowerCase().includes(value.toLowerCase()) ||
                    desc.toLowerCase().includes(value.toLowerCase())) {
                    filterBooks.push({ ...b, originalIndex: index });
                }
                return null;
            });
        }
        this.setState({ filterBooks });
    };

    handleUpdateCategory = (index, category) => {
        const { books, dispatch } = this.props;
        if (index != null) {
            const data = getValue(books,'data.books', []);
            const obj = { ...data[index] };
            obj.category = category;
            data[index] = obj;
            dispatch(changeData({ books: data }));
        }
    };

    handleHomeButton = () => {
        const { history } = this.props;
        history.push('/home');
    };

    render() {
        const { searchText, filterBooks } = this.state;
        return (
            <div>
                <button
                    style={{ padding: '0.5em', margin: '0.5em' }}
                    type="button"
                    onClick={this.handleHomeButton}
                >
                    Go To Home
                </button>
                <div style={{ padding: '1rem' }}>
                    <TextField
                        type="text"
                        onChange={this.handleSearch}
                        name="bookSearch"
                        value={searchText}
                        placeholder="Search Book ...."
                    />
                </div>
                <hr />
                <div className="search-book-container" >
                    {
                        isArrayValidAndNotEmpty(filterBooks) &&
                            filterBooks.map((book, index) => (
                                <Book
                                    key={`book-${index}`}
                                    description={getValue(book, 'description', '')}
                                    title={getValue(book, 'title', '')}
                                    imgUrl={getValue(book, 'imgUrl', '')}
                                    index={(book.originalIndex || book.originalIndex === 0) ? book.originalIndex : index}
                                    category={getValue(book, 'category', '')}
                                    onMenuSelect={this.handleUpdateCategory}
                                />
                            ))
                    }
                    {
                        !isArrayValidAndNotEmpty(filterBooks) &&
                            <div>
                                <h4>No books found matching {'"'}{searchText}{'"'}</h4>
                            </div>
                    }
                </div>
            </div>
        )
    }
}

Search.propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    books: state.books,
});

export default connect(mapStateToProps)(Search);