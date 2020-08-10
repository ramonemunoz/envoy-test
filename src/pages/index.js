import React, { useState, useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"
import Image from "gatsby-image"
import Layout from "../components/layout"
import Hero from "../components/hero"
import Slider from "../components/slider"
import "../styles/pages/index.scss"

const fetch = require(`node-fetch`)
const md5 = require("md5")

export default () => {
  const [comics, setComics] = useState([])
  const [bio, setBio] = useState([])

  const generateInfo = () => {
    const characterId = 1009368
    const publicKey = process.env.GATSBY_PUBLIC_KEY
    const privateKey = process.env.GATSBY_PRIVATE_KEY
    const date = new Date()
    const today = date.getDate()
    const hash = md5(today + privateKey + publicKey)

    const generatedInfo = {
      publicKey: publicKey,
      today: today,
      hash: hash,
      characterId: characterId,
    }
    return generatedInfo
  }

  const fetchMarvelInfo = async () => {
    const urlInfo = generateInfo()

    const resultComics = await fetch(
      `https://gateway.marvel.com/v1/public/characters/${urlInfo.characterId}/comics?format=comic&titleStartsWith=iron%20man&orderBy=title&ts=${urlInfo.today}&apikey=${urlInfo.publicKey}&hash=${urlInfo.hash}`
    )
      .then(function (response) {
        if (response.ok) {
          return response.json()
        } else {
          return Promise.reject(response)
        }
      })
      .catch(function (err) {
        console.warn("Could not retrive data")
      })

    if (resultComics !== undefined) {
      setComics(resultComics.data.results)
    }

    const resultBio = await fetch(
      `https://gateway.marvel.com/v1/public/characters/${urlInfo.characterId}?ts=${urlInfo.today}&apikey=${urlInfo.publicKey}&hash=${urlInfo.hash}`
    )
      .then(function (response) {
        if (response.ok) {
          return response.json()
        } else {
          return Promise.reject(response)
        }
      })
      .catch(function (err) {
        console.warn("Could not retrive data")
      })

    if (resultBio !== undefined) {
      setBio(resultBio.data.results["0"])
    }
  }

  useEffect(() => {
    fetchMarvelInfo()
  }, [])

  const {
    ironmanapi,
    geniusicon,
    engineericon,
    businessmanicon,
    tacticalicon,
  } = useStaticQuery(graphql`
    query {
      ironmanapi: file(relativePath: { eq: "iron-man-api-asset.png" }) {
        sharp: childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      geniusicon: file(relativePath: { eq: "Genius-Icon.png" }) {
        sharp: childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      engineericon: file(relativePath: { eq: "Engineer-Icon.png" }) {
        sharp: childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      businessmanicon: file(relativePath: { eq: "Businessman-Icon.png" }) {
        sharp: childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      tacticalicon: file(relativePath: { eq: "Tactician-Icon.png" }) {
        sharp: childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <Hero {...bio} />
      <div className="homepage-container">
        <h2 className="text-center">
          Contrary to popular belief, he knows exactly what he’s doing.
        </h2>
        <div className="content-container">
          <Image
            className="ironman-drawing"
            fluid={ironmanapi.sharp.fluid}
            alt="Iron Man"
          />
          <div className="about">
            <div className="information-section">
              <Image
                className="icon order-one"
                fluid={geniusicon.sharp.fluid}
                alt="Iron Man"
                imgStyle={{ objectFit: "contain" }}
              />
              <h3>Super-Genius Intelligence</h3>
              <p>
                Tony Stark is far more than a mechanical engineering prodigy who
                graduated from the Massachusetts Institute of Technology with
                honors at the age of 17.
              </p>
            </div>
            <div className="information-section order-two">
              <Image
                className="icon order-two"
                fluid={engineericon.sharp.fluid}
                alt="Iron Man"
                imgStyle={{ objectFit: "contain" }}
              />
              <h3>Master Engineer</h3>
              <p>
                He is an excellent engineer and mechanic capable of fixing
                almost any, if not all machinery.
              </p>
            </div>
            <div className="information-section order-three">
              <Image
                className="icon"
                fluid={businessmanicon.sharp.fluid}
                imgStyle={{ objectFit: "contain" }}
                alt="Iron Man"
              />
              <h3>Master Businessman</h3>
              <p>
                Stark is extremely well-respected in the business world, able to
                command people's attentions when he speaks on economic matters.
                He has built up several multi-million dollar companies from
                virtually nothing.
              </p>
            </div>
            <div className="information-section order-four">
              <Image
                className="icon"
                fluid={tacticalicon.sharp.fluid}
                imgStyle={{ objectFit: "contain" }}
                alt="Iron Man"
              />
              <h3>Expert Tactician</h3>
              <p>
                He is a brilliant tactician capable of quickly formulating
                battle strategies and new plans if the situation changes, like
                being able to elaborate complex plans in order to defeat
                different enemies.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Slider {...comics} />
    </Layout>
  )
}
