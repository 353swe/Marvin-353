pragma solidity 0.4.21;
import "./University.sol";


/**
@title User contract
@author 353
@notice Holds the information about a user
*/
contract User {
    address internal publicAddress;
    bytes32 internal name;
    bytes32 internal surname;
    University internal university;

    /**
    @notice Revert if the sender isn't the same as the public address
    */
    modifier onlySubject {
        if (msg.sender != publicAddress) revert();
        _;
    }

    /**
    @notice Create a user
    @dev User constructor
    @param _name The name of the user, _surname The surname of the user, _publicAddress The user's public address
    */
    function User(bytes32 _name, bytes32 _surname, address _publicAddress) public {
        name = _name;
        surname = _surname;
        publicAddress = _publicAddress;
        university = University(msg.sender);
    }

    /**
    @notice Return the public address
    @return the public address
    */
    function getPublicAddress() public view returns(address) {
        return publicAddress;
    }

    /**
    @notice Return the user's surname
    @return the user's name
    */
    function getName() public view returns(bytes32) {
        return name;
    }

    /**
    @notice Return the user's surname
    @return the user's surname
    */
    function getSurname() public view returns(bytes32) {
        return surname;
    }
}
