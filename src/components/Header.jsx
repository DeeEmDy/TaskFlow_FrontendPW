import PropTypes from 'prop-types';
import React from 'react'; //eslint-disable-line

const Header = ({ pageTitle }) => {
    return (
        <header className="App-header">
            <h1 className="App-title">{pageTitle}</h1>
        </header>
    );
};

Header.propTypes = {
    pageTitle: PropTypes.string.isRequired,
};

export default Header;
