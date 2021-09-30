import React from 'react'
import { Container, Navbar, Content } from 'react-bulma-components'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import logo from '../pages/termux.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'

export default function Layout({children, frontMatter}) {
  const {pathname} = useRouter()
  const [isActive, setisActive] = React.useState(false)
  const NavbarItem = React.forwardRef((props, ref) => {
    return (
      <Navbar.Item {...props} domRef={ref}/>
    )
  })

  return (
    <Container>
      <Head>
        <link rel="icon" href={logo.src} />
        <link rel="favicon" href={logo.src} />
        <title>{frontMatter.title} | Termux Wiki</title>
      </Head>
      <Container>
        <Navbar>
          <Navbar.Brand>
            <Link href="/" passHref><NavbarItem>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox='34 38 40 32' width='32px' height='16px'>
                <path d="M34 38h6l12 16-12 16h-6l12-16M56 66h18v4H56" fill="currentColor"/>
              </svg>
              <span className='pl-1'>Termux Wiki</span>
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
        <h1 className="title">{frontMatter.title} <a href={pathname} className='header-anchor'><FontAwesomeIcon icon={faLink} /></a></h1>
      </Container>
      <hr style={{margin: '0px'}}/>
      <Content className="px-4 pt-4 pb-5">
        {children}
      </Content>
    </Container>
  )
}
