pragma solidity 0.4.21;


contract University {
    address internal universityAddress;
    
    mapping (address => bool) internal registered;
    
    function University() public {
        universityAddress = msg.sender;
        registered[msg.sender] = true;
    }

    modifier onlyFounder {
        if (msg.sender != universityAddress) revert();
        _;
    }

    modifier registrableAddress(address _address) {
        if (registered[_address]) revert();
        _;
    }
    
    //Function to check if an address is of the university creator
    function isUniversityFounder(address _address) public view returns(bool) {
        return _address == universityAddress;
    }

    function getRoleByAddress(address _address) public view returns (uint8) {
        uint8 typeUser = 0; //notRegistered

        if (isUniversityFounder(_address))
            typeUser = 1; //University

        return typeUser;
    }

    function login() public view returns (uint8) {
        return getRoleByAddress(msg.sender);
    }
}