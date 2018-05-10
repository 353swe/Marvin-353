pragma solidity 0.4.21;
import "./UniversityYear.sol";
import "./Teacher.sol";
import "./Exam.sol";


/**
@title Exam management
@author 353
@notice Utilities to manage exams
*/
contract UniversityExam is UniversityYear {

    /**
    @notice Associate a teacher to an exam
    @dev only an admin can do it
    @param _teacher The teacher to associate the exam with, _exam The exam to be associated
    */
    function associateTeacherToExam(Teacher _teacher, Exam _exam) public onlyAdmin {
        if (_exam.getTeacherContract() != address(0))
            Teacher(_exam.getTeacherContract()).removeExam(_exam);
        _exam.associateTeacher(_teacher);
        _teacher.addExam(_exam);
    }
}
