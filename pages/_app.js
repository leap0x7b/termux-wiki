import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import theme from 'prism-react-renderer/themes/github'
import Image from 'next/image'
import Layout from '../components/Layout.js'
import { MDXProvider } from '@mdx-js/react'
import Link from 'next/link'
import React from 'react'

import '@fortawesome/fontawesome-svg-core/styles.css'
import 'bulma/bulma.sass'
import '../components/styles.css'

const Code = ({ children, className }) => {
  const language = className !== undefined ? className.replace(/language-/, '') : 'none'

  return (
    <>
      <Highlight {...defaultProps} code={children.trim()} language={language} theme={theme}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={({ className }, 'highlight')} style={{ ...style, padding: '20px' }}>
            {tokens.map((line, i) => {
              return (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => {
                    return <span key={key} {...getTokenProps({ token, key })} />
                  })}
                </div>
              )
            })}
          </pre>
        )}
      </Highlight>
    </>
  )
}

const heading = (Tag) =>
  function head(props) {
    if (!props.id) return <Tag {...props} />

    return (
      <>
        <Tag {...props}>
          {props.children}{' '}
          <Link href={`#${props.id}`}>
            <a className='header-anchor'>
              <FontAwesomeIcon icon={faLink} />
            </a>
          </Link>
        </Tag>
      </>
    )
  }

const mdComponents = {
  h1: heading('h1'),
  h2: heading('h2'),
  h3: heading('h3'),
  h4: heading('h4'),
  h5: heading('h5'),
  h6: heading('h6'),
  wrapper: Layout,
  pre: (props) => <div className='block' {...props} />,
  code: Code,
  a: (props) => <Link {...props} passHref />,
  table: (props) => (
    <div className='table-container'>
      <table className='table is-striped' {...props} />
    </div>
  ),
  img: (props) => (
    <figure className='image'>
      <Image
        src={require(`../public/${props.src}`)}
        alt={props.alt}
        loading='lazy'
        placeholder='blur'
      />
      {props.title && <figcaption>{props.title}</figcaption>}
    </figure>
  )
}

const App = ({ Component, pageProps }) => {
  return (
    <MDXProvider components={mdComponents}>
      <Component {...pageProps} />
    </MDXProvider>
  )
}

export default App
