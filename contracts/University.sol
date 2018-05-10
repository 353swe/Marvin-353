pragma solidity 0.4.21;


/**
@title Creates a University
@author 353
@notice Contract to create a new University
*/
contract University {
    address internal universityAddress;

    mapping (address => bool) internal registered;

    /**
    @notice Create a University contract
    @dev constructor
    */
    function University() public {
        universityAddress = msg.sender;
        registered[msg.sender] = true;
    }

    /**
    @notice Modifier that checks if the current account is the founder one
    @dev revert if it's not the founder
    */
    modifier onlyFounder {
        if (msg.sender != universityAddress) revert();
        _;
    }

    /**
    @notice Modifier that checks if the address is already registered
    @dev revert if it's already registered
    */
    modifier registrableAddress(address _address) {
        if (registered[_address]) revert();
        _;
    }

    /**
    @notice Checks if an address is that of the university creator
    @param _address The checked address
    @return true if the current address is that of the university creator
    */
    function isUniversityFounder(address _address) public view returns(bool) {
        return _address == universityAddress;
    }

    /**
    @notice Returns the role of the current address
    @param _address The current address
    @return The number corresponding to the role
    */
    function getRoleByAddress(address _address) public view returns (uint8) {
        uint8 typeUser = 0; //notRegistered

        if (isUniversityFounder(_address))
            typeUser = 1; //University

        return typeUser;
    }

    /**
    @notice Logs the account with the correct role
    @return The number with the role's number
    */
    function login() public view returns (uint8) {
        return getRoleByAddress(msg.sender);
    }
}
