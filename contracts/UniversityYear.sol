pragma solidity 0.4.21;
import "./UniversityStudent.sol";
import "./Year.sol";


contract UniversityYear is UniversityStudent {
    uint private countYearsByIndex = 1;
    mapping (address => uint) internal listYears;
    mapping (uint => Year) internal listYearsByIndex;
    mapping (uint16 => Year) internal listYearsBySolarYear;

    modifier yearNotFound(uint16 _year) {
        if (listYearsBySolarYear[_year] != address(0)) revert();
        _;
    }

    modifier yearFound(uint16 _year) {
        if (listYearsBySolarYear[_year] == address(0)) revert();
        _;
    }

    modifier yearEmpty(uint16 _year) {
        if (listYearsBySolarYear[_year].getCourseNumber() != 0) revert();
        _;
    }

    function getAcademicYearNumber() public view returns(uint) {
        return countYearsByIndex - 1;
    }

    function getAcademicYearContractAt(uint _index) public view returns(Year) {
        return listYearsByIndex[_index + 1];
    }
    
    function getAcademicYearContractByYear(uint16 _year) public view returns(Year) {
        return listYearsBySolarYear[_year];
    }

    function addNewAcademicYear(uint16 _year) public onlyFounder yearNotFound(_year) {
        Year newYear = new Year(_year);
        listYearsBySolarYear[_year] = newYear;
        listYears[newYear] = countYearsByIndex;
        listYearsByIndex[countYearsByIndex] = newYear;
        countYearsByIndex += 1;
    }

    function removeAcademicYear(uint16 _year) public onlyFounder yearFound(_year) yearEmpty(_year) {
        delete listYearsBySolarYear[_year];
        uint currentIndex = listYears[_year];
        listYearsByIndex[currentIndex] = listYearsByIndex[countYearsByIndex];
        delete listYears[_year];
        countYearsByIndex -= 1;
    }
}