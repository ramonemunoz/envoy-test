import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Image from "gatsby-image"
import "../styles/components/hero.scss"

const Hero = () => {
  const { logo, ironmancartoon } = useStaticQuery(graphql`
    query {
      logo: file(relativePath: { eq: "logo.png" }) {
        sharp: childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      ironmancartoon: file(relativePath: { eq: "iron-man-cartoon.png" }) {
        sharp: childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return (
    <div className="hero">
      <div className="nav-container">
        <div className="logo">
          <Image fluid={logo.sharp.fluid} alt="Iron Man Logo" />
        </div>
        <div className="navigation">
          <div className="sign-in">
            <Link to="/">Sign In</Link>
          </div>
          <div className="sign-up">
            <Link to="/">Sign Up</Link>
          </div>
        </div>
      </div>
      <div className="content-container">
        <div className="text">
          <p>
            Wounded, captured and forced to build a weapon by his enemies,
            billionaire industrialist Tony Stark instead created an advanced
            suit of armor to save his life and escape captivity. Now with a new
            outlook on life, Tony uses his money and intelligence to make the
            world a safer, better place as Iron Man.
          </p>
          <Link className="get-started" to="/">
            Get Started
          </Link>
        </div>
        <div className="cartoon-image">
          <Image fluid={ironmancartoon.sharp.fluid} alt="Iron Man Cartoon" />
        </div>
      </div>
    </div>
  )
}

export default Hero
