import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"
import { graphql, Link } from "gatsby"

import Navbar from "../components/Navbar"
import Layout from "../components/layout"
import Quote from "../components/Quote"




const IndexPage = ({ data: { heroimg, latestPosts } }) => {
  return (
    <Layout>
      <section className="hero has-gatsby-img">
        <Img fluid={heroimg.childImageSharp.fluid}></Img>
        <div className="hero-head">
          <Navbar />
        </div>

        {/* logo */}
        <div className="hero-body has-text-centered">
          <div className="container">
            <img src="" alt="" />
          </div>
        </div>

        <div className="hero-foot has-text-centered">
          <svg viewBox="0 0 32 32" width="32" height="32">
            <title>scroll down</title>
            <path
              fill="#fff"
              d="M.045 8.443c0-.215.082-.43.246-.594.33-.33.86-.33 1.19 0L16 22.37 30.52 7.85c.33-.33.86-.33 1.19 0s.327.86 0 1.186L16.593 24.152c-.328.326-.86.326-1.188 0L.29 9.036c-.163-.163-.245-.378-.245-.593z"
            />
          </svg>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Quote
            quote={{
              content: `"How do you know I'm mad?" said Alice.\n"You must be," said the Cat, "or you wouldn't have come here."`,
              author: `Lewis Carroll`,
              source: `Alice's Adventures in Wonderland`,
            }}
          />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="content">
            <p className="has-text-centered">recently post</p>
            {latestPosts.edges.map(({ node: post }) => (
              <div className="box" key={post.id}>
                <p>
                  <Link className="is-link-reverse" to={post.fields.slug}>
                    <strong>{post.frontmatter.title}</strong>
                  </Link>
                  <span> &bull; </span>
                  <small>{post.frontmatter.date}</small>
                </p>
                <p>{post.frontmatter.description || post.excerpt}</p>
                <p>
                  <Link className="button is-small" to={post.fields.slug}>
                    read more →
                  </Link>
                </p>
              </div>
            ))}
          </div>
          <Link
            className="button has-text-weight-light is-medium is-light is-fullwidth"
            to="/archives"
          >
            read all post
          </Link>
        </div>
      </section>
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    heroimg: PropTypes.shape({
      fluid: PropTypes.any,
    }),
    latestPosts: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}
export const pageQuery = graphql`
         query indexQuery {
           heroimg: file(relativePath: { eq: "hero/bay.jpg" }) {
             childImageSharp {
               fluid(maxWidth: 1920) {
                 ...GatsbyImageSharpFluid
               }
             }
           }

           latestPosts: allMarkdownRemark(
             sort: { order: DESC, fields: [frontmatter___date] }
             filter: {
               fields: { draft: { ne: true } }
               frontmatter: { layout: { eq: "blog-post" } }
             }
             limit: 5
           ) {
             edges {
               node {
                 excerpt(pruneLength: 200)
                 id
                 fields {
                   slug
                 }
                 frontmatter {
                   title
                   description
                   layout
                   date(formatString: "MMMM DD, YYYY")
                 }
               }
             }
           }
         }
       `



export default IndexPage
