import React from "react";
import PropTypes from "prop-types";
import Layout from "../components/layout";
import Navbar from '../components/Navbar'
import { graphql, Link } from 'gatsby'
import Trianglify from "../components/Trianglify";
import Content, { HTMLContent } from "../components/Content";
import Utterances from '../components/Utterances'




export const BlogPostTemplate = ({
  content,
  description,
  tableOfContents,
  contentComponent,
  tags
}) =>{
     const PostContent = contentComponent || Content

    return (
      <section className="section">
        {/* fix gatsby-remark-autolink-headers scrolling, let offsetParent be body */}
        <div className="container" style={{ position: "static" }}>
          <div className="columns">
            <div className="column is-10 is-offset-1 is-paddingless-top">
              <div className="postify">
                {!!description && <p>{description}</p>}
                {!!tableOfContents && (
                  <div
                    className="post-toc"
                    dangerouslySetInnerHTML={{ __html: tableOfContents }}
                  />
                )}
                <PostContent content={content} />
              </div>
              {tags && tags.length ? (
                <div style={{ marginTop: `2rem` }}>
                  <div className="tags">
                    {tags.map((tag) => (
                      <Link
                        key={tag}
                        className="tag is-info is-rounded"
                        to={`/archives?search=%23${tag}`}
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    );
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  description: PropTypes.node,
  tableOfContents: PropTypes.string,
  contentComponent: PropTypes.func,
  tags: PropTypes.arrayOf(PropTypes.string)
}

const BlogPost = ({data:{site,post}, pageContext})=>{
   const { title, description, date, tags } = post.frontmatter

    return (
        <Layout title={`${title} | ${site.siteMetadata.title}`}
        description={`${description || post.excerpt}`}> 
            <section className='hero is-medium has-trianglify'>
                <Trianglify title={title}></Trianglify>
                <div className='hero-head'>
                    <Navbar/>
                </div>

                <div className="hero-body has-text-centered">
                    <div className="container">
                        <h1 className="title">{title}</h1>
                    </div>
                </div>

                <div className="hero-foot">
                    <div className="post-hero-foot">
                        <a href='./' onClick={e => e.preventDefault()}>
                         {date}
                        </a>{' '}
                    </div>
                </div>
            </section>
            

            <BlogPostTemplate
             content={post.html}
            description={description}
            tableOfContents={post.tableOfContents}
            contentComponent={HTMLContent}
            tags={tags}
            />

            <section className="section">
                <div className="columns">
                    <div className='column'>
                        {pageContext.next && (
                        <Link
                            className='is-block is-link-reverse has-text-right has-text-centered-mobile'
                            to={pageContext.next.path}
                        >
                            <strong className='has-text-grey-lighter'>NEWER</strong>
                            <p>{pageContext.next.title}</p>
                        </Link>
                        )}
                    </div>

                    <div
                        className='has-background-grey-lighter is-hidden-mobile'
                        style={{
                        alignSelf: 'center',
                        width: 8,
                        height: 8,
                        margin: '0 1em',
                        borderRadius: '50%'
                        }}
                    />

                    <div className='column'>
                        {pageContext.prev && (
                        <Link
                            className='is-block is-link-reverse has-text-centered-mobile'
                            to={pageContext.prev.path}
                        >
                            <strong className='has-text-grey-lighter'>OLDER</strong>
                            <p>{pageContext.prev.title}</p>
                        </Link>
                        )}
                    </div>
                </div>
            </section>
        <Utterances slug={post.fields.slug} />
        </Layout>
    )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string
      })
    }),
    markdownRemark: PropTypes.object
  }),
  pageContext: PropTypes.shape({
    prev: PropTypes.shape({
      title: PropTypes.string,
      path: PropTypes.string
    }),
    next: PropTypes.shape({
      title: PropTypes.string,
      path: PropTypes.string
    })
  })
}

export default BlogPost

export const pageQuery = graphql`
    query BlogPostByID($id: String!){
        site {
      siteMetadata {
        title
      }
    }

        post: markdownRemark(id: {eq: $id}){
            id
            html
            excerpt(pruneLength: 200)
            tableOfContents
            fields{
                slug
            }
            frontmatter{
                date(formatString: "MMMM DD, YYYY")
                title
                description
                tags
            }
        }
    }
`