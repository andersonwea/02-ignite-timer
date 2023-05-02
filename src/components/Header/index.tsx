import { HeaderContainer } from './styles'
import IgniteLogo from '../../assets/logo-ignite.svg'
import { NavLink } from 'react-router-dom'
import { Timer, Scroll } from '@phosphor-icons/react'

export function Header() {
  return (
    <HeaderContainer>
      <img src={IgniteLogo} alt="" />

      <nav>
        <NavLink to="/">
          <Timer size={24} />
        </NavLink>

        <NavLink to="/history">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
