import React from 'react';
import PropTypes from 'prop-types';
import deepEqual from 'deep-equal';
import getValue from 'lodash.get';
import { connect } from 'react-redux';

import BookCategory from '../../components/BookCategory/BookCategory';
import { isArrayValidAndNotEmpty } from '../../constants/helper';
import { changeData } from '../../redux/books/book-actions';

const BOOK_CATEGORIES = {
    CURRENTLY_READING: 'currentlyReading',
    WANT_TO_READ: 'wantToRead',
    READ: 'read',
};

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredBooks: {},
        };
    }

    componentDidMount() {
        const { books } = this.props;
        this.setState({
            filteredBooks: this.filterBookForCategory(getValue(books,'data.books', [])),
        })
    }

    componentWillReceiveProps(nextProps) {
        const prevBooks = this.props.books;
        const nextBooks = nextProps.books;
        if ((!deepEqual(prevBooks, nextBooks)) || (!this.isArrayEqual(prevBooks.data, nextBooks.data))) {
            this.setState({
                filteredBooks: this.filterBookForCategory(getValue(nextBooks, 'data.books', [])),
            })
        }
    }

    /* this can go into helper so we can use everywhere */
    isArrayEqual = (a, b) => {
        if (isArrayValidAndNotEmpty(a) || (!isArrayValidAndNotEmpty(b))) {
            return false;
        }
        if (isArrayValidAndNotEmpty(b) || (!isArrayValidAndNotEmpty(a))) {
            return false;
        }
        if (a.length !== b.length) {
            return false;
        }
        for (let i = 0; i < a.length ; i += 1) {
            if (!deepEqual(a[i], b[i])) {
                return false;
            }
        }
        return true;
    };

    filterBookForCategory = (data) => {
        const filterData = {};
        if (isArrayValidAndNotEmpty(data)) {
            data.map((d, index) => {
                const category = getValue(d, 'category', null);
                if (filterData[category]) {
                    filterData[category].push({ ...d, originalIndex: index });
                } else {
                    filterData[category] = [{ ...d, originalIndex: index }];
                }
                return null;
            })
        }
        return filterData;
    };

    /* we can also put that in reducer to use at both place in search and here */
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

    handleSearchButton = () => {
        const { history } = this.props;
        history.push('/search');
    };

    render() {
        const { filteredBooks } = this.state;
        return (
            <div>
                <button
                    style={{ padding: '0.5em', margin: '0.5em' }}
                    type="button"
                    onClick={this.handleSearchButton}
                >
                    Go To Search
                </button>
                <BookCategory
                    title={"Currently Reading"}
                    onMenuSelect={this.handleUpdateCategory}
                    category={BOOK_CATEGORIES.CURRENTLY_READING}
                    books={getValue(filteredBooks, BOOK_CATEGORIES.CURRENTLY_READING, [])}
                />
                <BookCategory
                    onMenuSelect={this.handleUpdateCategory}
                    title={"Want To Read"}
                    category={BOOK_CATEGORIES.WANT_TO_READ}
                    books={getValue(filteredBooks, BOOK_CATEGORIES.WANT_TO_READ, [])}
                />
                <BookCategory
                    title={"Read"}
                    onMenuSelect={this.handleUpdateCategory}
                    category={BOOK_CATEGORIES.READ}
                    books={getValue(filteredBooks, BOOK_CATEGORIES.READ, [])}
                />
            </div>
        )
    }
}

Home.propTypes = {
    books: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    books: state.books,
});

export default connect(mapStateToProps)(Home);