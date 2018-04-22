import React from 'react';
import Link from '../Link/Link';
import style from './style.css';

const Navbar = () => {

  const menuItems = [
    {
      id: 0,
      href: '#',
      label: 'Inicio'
    },
    {
      id: 1,
      href: '#',
      label: 'Servizos'
    },
    {
      id: 2,
      href: '#',
      label: 'Sobre nós'
    },
    {
      id: 3,
      href: '#',
      label: 'Figurantes'
    },
    {
      id: 4,
      href: '#',
      label: 'Contacto'
    }
  ]

  const menu = menuItems.map((item) => 
    <li key={item.id}>
      <Link href={item.href} label={item.label} />
    </li>
  );

  return(
    <nav className={style.navbar}>
      <ul>{menu}</ul>
      <ul>
        <li>
          <Link href="#" active label="Registro/Login" />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar; 