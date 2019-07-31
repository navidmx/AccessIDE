import React, {KeyboardEvent} from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCode} from '@fortawesome/free-solid-svg-icons';

class Command extends React.Component {
    commandEntered(target : KeyboardEvent) {
        // Enter key pressed in command bar
        if (target.charCode == 13) {
            target.preventDefault();
            console.log("Entered!");
        }
    }
    render() {
        return (
            <Form inline>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text>
                            <FontAwesomeIcon icon={faCode}/>
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                        onKeyPress={this.commandEntered}
                        placeholder="Enter a command..."
                        type="text"></Form.Control>
                </InputGroup>
            </Form>
        );
    }
};

export default Command;