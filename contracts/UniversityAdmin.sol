pragma solidity 0.4.21;
import "./University.sol";

/**
@title Operations about admins
@author 353
@notice This contract manages the admins
*/

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

    /**
    @notice Add an admin
    @param _adminAddress Address of the admin that must be added
    */
    function addNewAdmin(address _adminAddress) public onlyFounder
    registrableAddress(_adminAddress)
    {
        registered[_adminAddress] = true;
        administrators[_adminAddress] = countAdministratorsByIndex;
        administratorsByIndex[countAdministratorsByIndex] = _adminAddress;
        countAdministratorsByIndex += 1;
    }

    /**
    @notice Check if the address passed belongs to an admin
    @param _adminAddress The address that must be checked
    @return true if the address represents an admin
    */
    function isAdmin(address _adminAddress) public view returns(bool) {
        return administrators[_adminAddress] != 0;
    }

    /**
    @notice Return the number of admins currently added
    @return the number of admins
    */
    function getAdminNumber() public view returns(uint) {
        return countAdministratorsByIndex - 1;
    }

    /**
    @notice Return the admin at the selected index
    @param _index The wanted index
    @return the address of the corresponding admin
    */
    function getAdminAt(uint _index) public view returns(address) {
        return administratorsByIndex[_index + 1];
    }

    /**
    @notice Return the number corresponding to the role of the address
    @dev 2 is the admin type
    @param _address The address to be checked
    @return the role number
    */
    function getRoleByAddress(address _address) public view returns (uint8) {
        uint8 typeUser = super.getRoleByAddress(_address);

        if (isAdmin(_address))
            typeUser = 2; //Admin

        return typeUser;
    }

    /**
    @notice Remove the selected admin
    @param _address The admin's address that must be removed
    */
    function removeAdmin(address _address) public onlyFounder validAdminAddress(_address) {
        registered[_address] = false;
        administratorsByIndex[administrators[_address]] = administratorsByIndex[countAdministratorsByIndex-1];
        administrators[_address] = 0;
        countAdministratorsByIndex -= 1;
    }
}
