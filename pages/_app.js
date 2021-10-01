import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import 'bulma/bulma.sass'
import '../components/styles.css'
import Link from 'next/link'
import { Image } from 'react-bulma-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import Layout from '../components/Layout.js'
import Highlight, { defaultProps} from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/github'

const  Code = ({ children, className }) => {
  const language = className.replace(/language-/, '')

  return (
    <Highlight {...defaultProps} code={children.trim()} language={language} theme={theme}>
      {({className, style, tokens, getLineProps, getTokenProps}) => (
        <pre className={{className}, 'highlight'} style={{...style, padding: '20px'}}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({line, key: i})}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({token, key})} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

const heading = (Tag) => function head(props) {
  if (!props.id) return <Tag {...props} />

  return (
    <Tag {...props}>
      {props.children} <a href={`#${props.id}`} className='header-anchor'><FontAwesomeIcon icon={faLink} /></a>
    </Tag>
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
  pre: props => <div className='block' {...props} />,
  code: Code,
  a: Link,
  table: props => (
    <div className='table-container'>
      <table className='table is-striped' {...props} />
    </div>
  ),
  img: props => {
    if (props.title !== undefined) {
      return (
        <figure className='image'>
          <img src={props.src} alt={props.alt}/>
          <figcaption>{props.title}</figcaption>
        </figure>
      )
    } else {
      return <Image src={props.src} alt={props.alt} />
    }
  }
}

export default function App({Component, pageProps}) {
  return (
    <MDXProvider components={mdComponents}>
      <Component {...pageProps} />
    </MDXProvider>
  )
}
