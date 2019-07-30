import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode } from '@fortawesome/free-solid-svg-icons'

let CommandStyle = {
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    backgroundColor: 'black',
    color: 'white',
    padding: '20px',
    fontSize: '18px',
    height: 'calc(100vh - 70px)',
    overflow: 'scroll'
}

const Command = () => (
    <Form inline>
        <InputGroup>
            <InputGroup.Prepend>
                <InputGroup.Text>
                    <FontAwesomeIcon icon={ faCode } />
                </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl placeholder="Enter a command..." ariaLabel="Command">
                
            </FormControl>
        </InputGroup>
    </Form>
//    <form class="form-inline">
//        <div class="input-group">
//            <div class="input-group-prepend">
//                <span class="input-group-text"><i id="micIcon" class="fas fa-code"></i></span>
//            </div>
//            <input id="scriptBox" class="form-control" type="text" onkeypress="return commandEntered(event)" placeholder="Enter a command..." aria-label="Command" />
//        </div>
//    </form>
);

export default Command;