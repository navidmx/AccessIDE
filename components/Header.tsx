import React from 'react';
import Dropdown, { Option } from 'react-dropdown';
import Command from '../components/Command';
import { Language } from '../server/src/languageRegistry';
import { OutputCommand } from '../server/src/runCommand';

const HeaderStyle = {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '80px',
    backgroundColor: '#2A2A2A',
};

const BrandTextStyle = {
    color: '#f9ee98',
    fontSize: '32px',
    fontWeight: 800,
    margin: '0 20px',
};

type HeaderProps = {
    tabs: number;
    recording: boolean;
    currLine: number;
    lines: string[];
    languageIdx: number;
    dropdown: {
        options: Option[];
        selected: Option;
    };
    update: (newLang: Option) => void;
    run: (commands: OutputCommand[]) => void;
    onEnter: (returnToEditor: boolean) => void;
};

class Header extends React.Component<HeaderProps> {
    constructor(props: HeaderProps) {
        super(props);
    }

    render() {
        return (
            <div style={HeaderStyle}>
                <h1 style={BrandTextStyle}>AccessIDE</h1>
                <Command
                    run={this.props.run}
                    tabs={this.props.tabs}
                    lines={this.props.lines}
                    currLine={this.props.currLine}
                    recording={this.props.recording}
                    onEnter={this.props.onEnter}
                    languageIdx={this.props.languageIdx}
                />
                <Dropdown
                    onChange={this.props.update}
                    options={this.props.dropdown.options}
                    value={this.props.dropdown.selected}
                    placeholder="Select an option"
                />
            </div>
        );
    }
}

export default Header;
