import Navbar from 'react-bootstrap/Navbar';
import Command from '../components/Command';
let HeaderStyle = {
    height: '70px',
    backgroundColor: '#2A2A2A'
};
let BrandText = {
    color: '#f9ee98',
    fontSize: '32px',
    fontWeight: 800,
    marginRight: '20px'
};
const Header = () => (<Navbar style={HeaderStyle}>
        <Navbar.Brand style={BrandText}>CodeABLE</Navbar.Brand>
        <Command />
    </Navbar>);
export default Header;
