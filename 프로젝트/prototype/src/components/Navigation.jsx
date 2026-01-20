import { Link, useLocation } from 'react-router-dom'

const Navigation = () => {
  const location = useLocation()
  
  const menuItems = [
    { path: '/', label: '내 건강 상태', icon: '🏥' },
    { path: '/recommendations', label: '건강 정보 알아보기', icon: '💡' },
    { path: '/habits', label: '건강 습관 실천하기', icon: '✅' },
  ]

  return (
    <nav className="navigation">
      <div className="nav-container">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default Navigation
