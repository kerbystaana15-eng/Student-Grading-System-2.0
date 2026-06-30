import { useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'
import './App.css'

const initialStudent = {
  studentId: '',
  fullName: '',
  yearLevel: '',
  course: '',
}

const initialGrade = {
  studentName: '',
  subject: '',
  grade: '',
  remarks: '',
}

function App() {
  const [studentForm, setStudentForm] = useState(initialStudent)
  const [gradeForm, setGradeForm] = useState(initialGrade)
  const [studentMessage, setStudentMessage] = useState('')
  const [gradeMessage, setGradeMessage] = useState('')

  const handleStudentChange = (event) => {
    const { name, value } = event.target
    setStudentForm((current) => ({ ...current, [name]: value }))
  }

  const handleGradeChange = (event) => {
    const { name, value } = event.target
    setGradeForm((current) => ({ ...current, [name]: value }))
  }

  const handleStudentSubmit = async (event) => {
    event.preventDefault()

    if (!studentForm.studentId || !studentForm.fullName || !studentForm.yearLevel || !studentForm.course) {
      setStudentMessage('Please fill in all student fields.')
      return
    }

    try {
      await addDoc(collection(db, 'students'), {
        ...studentForm,
        createdAt: serverTimestamp(),
      })

      setStudentMessage('Student details saved to Firestore successfully.')
      setStudentForm(initialStudent)
    } catch (error) {
      setStudentMessage(`Unable to save student: ${error.message}`)
    }
  }

  const handleGradeSubmit = async (event) => {
    event.preventDefault()

    if (!gradeForm.studentName || !gradeForm.subject || !gradeForm.grade) {
      setGradeMessage('Please fill in the student name, subject, and grade.')
      return
    }

    try {
      await addDoc(collection(db, 'studentGrades'), {
        ...gradeForm,
        createdAt: serverTimestamp(),
      })

      setGradeMessage('Student grading record saved to Firestore successfully.')
      setGradeForm(initialGrade)
    } catch (error) {
      setGradeMessage(`Unable to save grading record: ${error.message}`)
    }
  }

  return (
    <main className="app-shell">
      <header className="hero-card">
        <p className="eyebrow">Student Grading System</p>
        <h1>Student Grading System</h1>
        <p className="hero-text">
          Every teacher or student account entry and every grading record submitted below
          will be stored in your Firebase Firestore database.
        </p>
      </header>

      <section className="card-grid">
        <section className="card">
          <h2>Add Student</h2>
          <form onSubmit={handleStudentSubmit} className="form-stack">
            <label>
              Student ID
              <input
                name="studentId"
                value={studentForm.studentId}
                onChange={handleStudentChange}
                placeholder="Enter student ID"
              />
            </label>

            <label>
              Full name
              <input
                name="fullName"
                value={studentForm.fullName}
                onChange={handleStudentChange}
                placeholder="Enter full name"
              />
            </label>

            <label>
              Year level
              <input
                name="yearLevel"
                value={studentForm.yearLevel}
                onChange={handleStudentChange}
                placeholder="Enter year level"
              />
            </label>

            <label>
              Course
              <input
                name="course"
                value={studentForm.course}
                onChange={handleStudentChange}
                placeholder="Enter course"
              />
            </label>

            <button type="submit">Save student</button>
          </form>
          {studentMessage ? <p className="message">{studentMessage}</p> : null}
        </section>

        <section className="card">
          <h2>Student Grading Entry</h2>
          <form onSubmit={handleGradeSubmit} className="form-stack">
            <label>
              Student name
              <input
                name="studentName"
                value={gradeForm.studentName}
                onChange={handleGradeChange}
                placeholder="Enter student name"
              />
            </label>

            <label>
              Subject
              <input
                name="subject"
                value={gradeForm.subject}
                onChange={handleGradeChange}
                placeholder="Enter subject"
              />
            </label>

            <label>
              Grade
              <input
                type="number"
                name="grade"
                value={gradeForm.grade}
                onChange={handleGradeChange}
                placeholder="Enter grade"
                min="0"
                max="100"
              />
            </label>

            <label>
              Remarks
              <textarea
                name="remarks"
                value={gradeForm.remarks}
                onChange={handleGradeChange}
                placeholder="Add remarks"
                rows="3"
              />
            </label>

            <button type="submit">Save grade</button>
          </form>
          {gradeMessage ? <p className="message">{gradeMessage}</p> : null}
        </section>
      </section>
    </main>
  )
}

export default App
