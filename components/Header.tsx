import React from 'react';
import Dropdown, {Option} from 'react-dropdown';
import Command from '../components/Command';
import fetch from 'node-fetch';
import {Language} from '../server/src/languageRegistry';
import {OutputCommand} from '../server/src/runCommand';
import Config from '../server/src/config';

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
    run: (commands : OutputCommand[]) => void,
    tabs: number,
    currLine: number,
    lines: string[],
    update: (newLang : Option) => void,
    languages: Language[]
}

class Header extends React.Component < HeaderProps > {
    public state : {
        options: Option[];
        default: string;
    }

    constructor(props : HeaderProps) {
        super(props);
        this.state = {
            options: [],
            default: ''
        }
    }

    // Try componentDidMount
    componentWillMount = async() => {
        let languages = await fetch(`${Config.getURL()}/getLangs`).then((res) => res.json());
        let options = languages.map((lang : Language) => ({'value': lang.id, 'label': `${lang.display.name} (${lang.display.version})`}));
        this.setState({options: options, default: options[0]});
    }

    render() {
        return (
            <div style={HeaderStyle}>
                <h1 style={BrandTextStyle}>AccessIDE</h1>
                <Command
                    run={this.props.run}
                    tabs={this.props.tabs}
                    currLine={this.props.currLine}
                    lines={this.props.lines}
                    />
                <Dropdown
                    options={this.state.options}
                    onChange={this.props.update}
                    value={this.state.default}
                    placeholder='Select an option'/>
            </div>
        );
    }
}

export default Header;