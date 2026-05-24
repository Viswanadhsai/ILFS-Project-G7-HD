import { getStudentInfo } from "../services/student.service.js";

export const studentDetails = (req, res) => {
    res.json(getStudentInfo());
};
