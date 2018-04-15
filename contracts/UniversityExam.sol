pragma solidity 0.4.21;
import "./UniversityYear.sol";
import "./Teacher.sol";
import "./Exam.sol";


contract UniversityExam is UniversityYear {
    function associateTeacherToExam(Teacher _teacher, Exam _exam) public onlyAdmin {
        if (_exam.getTeacherContract() != address(0))
            Teacher(_exam.getTeacherContract()).removeExam(_exam);
        _exam.associateTeacher(_teacher);
        _teacher.addExam(_exam);
    }
}
