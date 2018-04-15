pragma solidity 0.4.21;
import "./University.sol";


contract User {
    address internal publicAddress;
    bytes32 internal name;
    bytes32 internal surname;
    University internal university;

    modifier onlySubject {
        if (msg.sender != publicAddress) revert();
        _;
    }

    function User(bytes32 _name, bytes32 _surname, address _publicAddress) public {
        name = _name;
        surname = _surname;
        publicAddress = _publicAddress;
        university = University(msg.sender);
    }

    function getPublicAddress() public view returns(address) {
        return publicAddress;
    }

    function getName() public view returns(bytes32) {
        return name;
    }

    function getSurname() public view returns(bytes32) {
        return surname;
    }
}