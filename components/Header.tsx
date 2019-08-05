import React from 'react';
import Dropdown from 'react-dropdown';
import Command from '../components/Command';
import fetch from 'node-fetch';
import {Language} from '../server/src/languageRegistry';

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
    public state : {
        languages: string[];
        default: string;
    }

    constructor(props) {
        super(props);
        this.state = {
            languages: [],
            default: ''
        }
    }

    languageSelect = (language) => {
        // BACKEND TODO
        console.log('Selected language: ', language.value);
    }

    componentWillMount = async() => {
        let languages = await fetch('/getLangs').then((res) => res.json());
        let names = languages.map((lang : Language) => (
            {
                'value': lang.name,
                'label': `${lang.display.name} (${lang.display.version})`
            }
        ));
        this.setState({languages: names, default: names[0]});
    }

    render() {
        return (
            <div style={HeaderStyle}>
                <h1 style={BrandTextStyle}>AccessIDE</h1>
                <Command/>
                <Dropdown
                    options={this.state.languages}
                    onChange={this.languageSelect}
                    value={this.state.default}
                    placeholder="Select an option"/>
            </div>
        );
    }
}

export default Header;