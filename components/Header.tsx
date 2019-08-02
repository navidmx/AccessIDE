import React from 'react';
import Dropdown from 'react-dropdown';
import Command from '../components/Command';

let languages = [
    {
        value: 'javascript',
        label: 'JavaScript (ES6)'
    }, {
        value: 'python',
        label: 'Python 3'
    }
];

const defaultOption = languages[0];

let HeaderStyle = {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '80px',
    backgroundColor: '#2A2A2A'
}

let BrandTextStyle = {
    color: '#f9ee98',
    fontSize: '32px',
    fontWeight: 800,
    margin: '0 20px'
}

class Header extends React.Component {
    languageSelect = (language : any) => {
        // BACKEND TODO
        console.log('Selected language: ', language)
    }

    render() {
        return (
            <div style={HeaderStyle}>
                <h1 style={BrandTextStyle}>AccessIDE</h1>
                <Command/>
                <Dropdown
                    options={languages}
                    onChange={this.languageSelect}
                    value={defaultOption}
                    placeholder="Select an option"/>
            </div>
        );
    }
}

export default Header;