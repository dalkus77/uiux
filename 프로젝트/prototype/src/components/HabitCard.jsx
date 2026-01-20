const HabitCard = ({ habit, onToggle }) => {
  return (
    <div className={`habit-card ${habit.completed ? 'completed' : ''}`}>
      <div className="habit-content">
        <input
          type="checkbox"
          checked={habit.completed}
          onChange={() => onToggle(habit.id)}
          className="habit-checkbox"
        />
        <div className="habit-info">
          <h4>{habit.title}</h4>
          <p className="habit-description">{habit.description}</p>
        </div>
      </div>
      <div className="habit-status">
        {habit.completed ? (
          <span className="status-badge completed">완료</span>
        ) : (
          <span className="status-badge pending">진행중</span>
        )}
      </div>
    </div>
  )
}

export default HabitCard
