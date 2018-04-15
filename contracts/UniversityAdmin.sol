pragma solidity 0.4.21;
import "./University.sol";


contract UniversityAdmin is University {
    uint private countAdministratorsByIndex = 1;
    mapping (address => uint) internal administrators;
    mapping (uint => address) internal administratorsByIndex;

    modifier validAdminAddress(address _address) {
        if (administrators[_address] == 0) revert();
        _;
    }

    modifier onlyAdmin {
        if (administrators[msg.sender] == 0) revert();
        _;
    }

    //add an admin
    function addNewAdmin(address _adminAddress) public onlyFounder
    registrableAddress(_adminAddress)
    {
        registered[_adminAddress] = true;
        administrators[_adminAddress] = countAdministratorsByIndex;
        administratorsByIndex[countAdministratorsByIndex] = _adminAddress;
        countAdministratorsByIndex += 1;
    }

    //Check if a _adminAddress is an admin
    function isAdmin(address _adminAddress) public view returns(bool) {
        return administrators[_adminAddress] != 0;
    }

    //Return the number of admins
    function getAdminNumber() public view returns(uint) {
        return countAdministratorsByIndex - 1;
    }

    //return the admin ad index _index
    function getAdminAt(uint _index) public view returns(address) {
        return administratorsByIndex[_index + 1];
    }

    function getRoleByAddress(address _address) public view returns (uint8) {
        uint8 typeUser = super.getRoleByAddress(_address);

        if (isAdmin(_address))
            typeUser = 2; //Admin

        return typeUser;
    }

    //remove the admin with address _address
    function removeAdmin(address _address) public onlyFounder validAdminAddress(_address) {
        registered[_address] = false;
        administratorsByIndex[administrators[_address]] = administratorsByIndex[countAdministratorsByIndex];
        administrators[_address] = 0;
        countAdministratorsByIndex -= 1;
    }
}
