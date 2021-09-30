import React from 'react'
import { Container, Navbar, Content } from 'react-bulma-components'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import logo from '../pages/termux.png'

export default function Layout({children, frontMatter}) {
  const {pathname} = useRouter()
  const [isActive, setisActive] = React.useState(false)
  const NavbarItem = React.forwardRef((props, ref) => {
    return (
      <Navbar.Item {...props} domRef={ref }/>
    )
  })

  return (
    <Container>
      <Container>
        <Navbar>
          <Navbar.Brand>
            <Link href="/" passHref><NavbarItem>
              <Image src={logo} alt='Termux logo' width="24px" height="24px" />
              <span className='pl-2'>Termux Wiki</span>
            </NavbarItem></Link>
            <Navbar.Burger onClick={() => {setisActive(!isActive)}} className={isActive ? 'is-active' : ''} />
          </Navbar.Brand>
          <Navbar.Menu className={isActive ? 'is-active' : ''}>
            <Link href='/' passHref><NavbarItem>Home</NavbarItem></Link>
            <Link href='/getting-started' passHref><NavbarItem>Getting started</NavbarItem></Link>
            <Link href='/faq' passHref><NavbarItem>FAQ</NavbarItem></Link>
            <Link href='/all-pages' passHref><NavbarItem>All pages</NavbarItem></Link>
          </Navbar.Menu>
        </Navbar>
      </Container>
      <Container className="px-4 pt-4 pb-4">
        <h1 className="title">{frontMatter.title}</h1>
      </Container>
      <hr style={{marginTop: '0px'}}/>
      <Content className="px-4 pb-5">
        {children}
      </Content>
    </Container>
  )
}
