import { Container, Navbar, Content } from 'react-bulma-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import logoSvg from '../pages/termux.svg'
import logo from '../pages/termux.png'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

const Layout = ({ children, frontMatter }) => {
  const { asPath, pathname } = useRouter()

  const [isActive, setisActive] = React.useState(false)

  const NavbarItem = React.forwardRef(function navitem(props, ref) {
    return <Navbar.Item {...props} domRef={ref} />
  })

  const links = [
    {
      label: 'Home',
      url: '/'
    },
    {
      label: 'Getting started',
      url: '/getting-started'
    },
    {
      label: 'All pages',
      url: '/all-pages'
    },
    {
      label: 'FAQ',
      url: '/faq'
    }
  ]

  return (
    <>
      <Container>
        <Head>
          <meta property="og:site_name" content="Termux Wiki" />
          <meta property="og:title" content={frontMatter.title} />
          <meta
            property="og:description"
            content={
              children[0] !== undefined ? children[0].props.children : children.props.children
            }
          />
          <meta property="og:url" content={'https://termux-wiki.vercel.app' + asPath} />
          <meta name="twitter:site" content="@termux" />
          <meta name="twitter:title" content={frontMatter.title} />
          <meta
            name="twitter:description"
            content={
              children[0] !== undefined ? children[0].props.children : children.props.children
            }
          />
          <meta
            name="description"
            content={
              children[0] !== undefined ? children[0].props.children : children.props.children
            }
          />
          <link rel="canonical" href={'https://termux-wiki.vercel.app' + asPath} />
          <link rel="icon" href={logo.src} />
          <link rel="favicon" href={logo.src} />
          <link rel="shortcut icon" href={logo.src} />
          <link rel="mask-icon" href={logoSvg.src} color="#000000" />
          <title>{frontMatter.title} | Termux Wiki</title>
        </Head>
        <Container>
          <Navbar style={{ position: 'fixed', top: 0, heigth: '4rem', width: '100%' }}>
            <Navbar.Brand>
              <Link href="/" passHref>
                <NavbarItem>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="34 38 40 32"
                    width="32px"
                    height="16px"
                  >
                    <path d="M34 38h6l12 16-12 16h-6l12-16M56 66h18v4H56" fill="currentColor" />
                  </svg>
                  <span className="pl-1">Termux Wiki</span>
                </NavbarItem>
              </Link>
              <Navbar.Burger
                onClick={() => {
                  setisActive(!isActive)
                }}
                className={isActive && 'is-active'}
              />
            </Navbar.Brand>
            <Navbar.Menu className={isActive ? 'is-active' : ''}>
              {links.map((link, index) => {
                return (
                  <Link href={link.url} key={index} passHref>
                    <NavbarItem>{link.label}</NavbarItem>
                  </Link>
                )
              })}
            </Navbar.Menu>
          </Navbar>
        </Container>
        <div style={{ height: '3rem', display: 'block', width: '100%' }}>.</div>
        <Container className="px-4 pt-4 pb-4">
          <h1 className="title">
            {frontMatter.title}
            <a href={pathname} className="header-anchor">
              <FontAwesomeIcon icon={faLink} />
            </a>
          </h1>
        </Container>
        <hr style={{ margin: '0px' }} />
        <Content className="px-4 pt-4 pb-5">{children}</Content>
      </Container>
    </>
  )
}

export default Layout
