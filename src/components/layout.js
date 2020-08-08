import React from "react"
import Helmet from "react-helmet"
import useSiteMetadata from "../hooks/use-sitemetadata"
import "../styles/components/layout.scss"

const Layout = ({ children }) => {
  const { title, description } = useSiteMetadata()
  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <div className="container-fluid">{children}</div>
    </>
  )
}
export default Layout
