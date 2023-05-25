import "../classPageStyles.css"

export default function StudentGradeRow({data}) {
  return (
    <div className="student-grade-row">
      <p>{data.name}</p>
      <p>{data.grade}</p>      
    </div>
  )
}
