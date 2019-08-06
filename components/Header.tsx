import React from 'react';
import Dropdown, { Option } from 'react-dropdown';
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

type HeaderProps = {
    update: any
}

class Header extends React.Component <HeaderProps> {
    public state : {
        languages: Language[];
        options: Option[];
        default: string;
    }

    constructor(props) {
        super(props);
        this.state = {
            languages: [],
            options: [],
            default: ''
        }
    }

    componentWillMount = async() => {
        let languages = await fetch('/getLangs').then((res) => res.json());
        let options = languages.map((lang : Language) => ({'value': lang.id, 'label': `${lang.display.name} (${lang.display.version})`}));
        this.setState({languages: languages, options: options, default: options[0]});
    }

    render() {
        return (
            <div style={HeaderStyle}>
                <h1 style={BrandTextStyle}>AccessIDE</h1>
                <Command/>
                <Dropdown
                    options={this.state.options}
                    onChange={this.props.update}
                    value={this.state.default}
                    placeholder="Select an option"/>
            </div>
        );
    }
}

export default Header;