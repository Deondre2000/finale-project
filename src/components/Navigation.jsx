import { NavLink } from 'react-router-dom'
import '../blocks/Navigation.css'

function Navigation() {
	return (
		<header className="navigation">
			<NavLink to="/" className="navigation__logo">
				News Explorer
			</NavLink>
			<nav className="navigation__links" aria-label="Main navigation">
				<NavLink
					to="/"
					end
					className={({ isActive }) =>
						`navigation__link${isActive ? ' navigation__link_active' : ''}`
					}
				>
					Home
				</NavLink>
				<NavLink
					to="/about"
					className={({ isActive }) =>
						`navigation__link${isActive ? ' navigation__link_active' : ''}`
					}
				>
					About Us
				</NavLink>
			</nav>
		</header>
	)
}

export default Navigation
