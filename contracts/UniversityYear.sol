pragma solidity 0.4.21;
import "./UniversityStudent.sol";
import "./Year.sol";


/**
@title Year management
@author 353
@notice Utilities to manage academic years
*/
contract UniversityYear is UniversityStudent {
    uint private countYearsByIndex = 1;
    mapping (address => uint) internal listYears;
    mapping (uint => Year) internal listYearsByIndex;
    mapping (uint16 => Year) internal listYearsBySolarYear;

    /**
    @notice Revert if the year is not in the list
    @param _year The year to search for
    */
    modifier yearNotFound(uint16 _year) {
        if (listYearsBySolarYear[_year] != address(0)) revert();
        _;
    }

    /**
    @notice Revert if the year is in the list
    @param _year The chosen year
    */
    modifier yearFound(uint16 _year) {
        if (listYearsBySolarYear[_year] == address(0)) revert();
        _;
    }

    /**
    @notice Revert if there are courses in the year
    @param _year The chosen year
    */
    modifier yearEmpty(uint16 _year) {
        if (listYearsBySolarYear[_year].getCourseNumber() != 0) revert();
        _;
    }

    /**
    @notice Return how many years are in the list
    @return the number of academic years
    */
    function getAcademicYearNumber() public view returns(uint) {
        return countYearsByIndex - 1;
    }

    /**
    @notice Return the academic year contract at the selected position
    @param _index The selected position
    @return the year contract
    */
    function getAcademicYearContractAt(uint _index) public view returns(Year) {
        return listYearsByIndex[_index + 1];
    }

    /**
    @notice Return the year contract
    @param _year The year to look for
    @return the year contract
    */
    function getAcademicYearContractByYear(uint16 _year) public view returns(Year) {
        return listYearsBySolarYear[_year];
    }

    /**
    @notice Add a new academic year
    @dev only founder can do it, only if the year isn't already in the list
    @param _year the year to add
    */
    function addNewAcademicYear(uint16 _year) public onlyFounder yearNotFound(_year) {
        Year newYear = new Year(_year);
        listYearsBySolarYear[_year] = newYear;
        listYears[newYear] = countYearsByIndex;
        listYearsByIndex[countYearsByIndex] = newYear;
        countYearsByIndex += 1;
    }

    /**
    @notice Remove an academic year
    @dev only a founder can do it, only if the year is already in the list and it's empty
    @param _year The year to be removed
    */
    function removeAcademicYear(uint16 _year) public onlyFounder yearFound(_year) yearEmpty(_year) {
        address yearContractToRemove = getAcademicYearContractByYear(_year);
        address yearContractToMove = listYearsByIndex[countYearsByIndex - 1];
        uint yearIndexToRemove = listYears[yearContractToRemove];
        listYearsByIndex[yearIndexToRemove] = Year(yearContractToMove);
        listYears[yearContractToMove] = yearIndexToRemove;
        countYearsByIndex -= 1;
        delete listYearsBySolarYear[_year];
        // not useful
        // delete listYears[_year];
    }
}
