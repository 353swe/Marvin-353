pragma solidity 0.4.21;
import "./University.sol";
import "./UniversityStudent.sol";
import "./Course.sol";


/**
@title Year contract
@author 353
@notice Creates a year contract
*/
contract Year {
    UniversityStudent private university;
    uint private countListCourseByIndex = 1;
    mapping (address => uint) private listCourse;
    mapping (uint => Course) private listCourseByIndex;
    uint16 private solarYear;

    /**
    @notice Revert if it's not the admin
    */
    modifier onlyAdmin {
        if (!university.isAdmin(msg.sender)) revert();
        _;
    }

    /**
    @notice Creates a year
    @param _solarYear The solar year
    */
    function Year(uint16 _solarYear) public {
        solarYear = _solarYear;
        university = UniversityStudent(msg.sender);
    }

    /**
    @notice Return the number of courses in that year
    @return the number of courses
    */
    function getCourseNumber() public view returns(uint) {
        return countListCourseByIndex - 1;
    }

    /**
    @notice Return the course contract in that position
    @param _index The index of the course
    @return the course at that position
    */
    function getCourseContractAt(uint _index) public view returns(Course) {
        return listCourseByIndex[_index + 1];
    }

    /**
    @notice Return the solar year
    @return the solar year
    */
    function getSolarYear() public view returns(uint16) {
        return solarYear;
    }

    /**
    @notice Add a new course
    @dev only an admin can do it
    @param _name The course name, _creditsForGraduation The number of credits needed to graduate
    */
    function addNewCourse(bytes32 _name, uint16 _creditsForGraduation) public onlyAdmin {
        Course newCourse = new Course(_name, _creditsForGraduation, university);
        listCourse[newCourse] = countListCourseByIndex;
        listCourseByIndex[countListCourseByIndex] = newCourse;
        countListCourseByIndex += 1;
    }
}
