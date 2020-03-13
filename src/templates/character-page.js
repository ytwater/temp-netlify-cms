import React from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";

import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

export const CharacterPageTemplate = ({
  preview,
  content,
  contentComponent,
  topImages,
  topLeftImages,
  bottomLeftImages,
  gallery,
  characters
}) => {
  const PostContent = contentComponent || Content;

  return <PostContent content={content} />;
};

CharacterPageTemplate.propTypes = {
  preview: PropTypes.bool,
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  characters: PropTypes.array,
  topImages: PropTypes.shape(),
  topLeftImages: PropTypes.shape(),
  bottomLeftImages: PropTypes.shape(),
  gallery: PropTypes.array
};
CharacterPageTemplate.defaultProps = {
  contentComponent: null,
  preview: false,
  title: "",
  description: "",
  characters: [],
  topImages: [],
  topLeftImages: [],
  bottomLeftImages: [],
  gallery: []
};
const CharacterPage = ({ data }) => {
  const { markdownRemark: post, site } = data;

  return (
    <Layout>
      <br />
      <CharacterPageTemplate
        content={post.html}
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        characters={post.frontmatter.characters}
        topImages={post.frontmatter.topImages}
        topLeftImages={post.frontmatter.topLeftImages}
        bottomLeftImages={post.frontmatter.bottomLeftImages}
        gallery={post.frontmatter.gallery}
      />
    </Layout>
  );
};

CharacterPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
    site: PropTypes.object
  }).isRequired
};

export default CharacterPage;

export const pageQuery = graphql`
  query CharacterPageByID($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      fields {
        slug
      }
      html
      frontmatter {
        meta {
          description
          keywords
        }
        title
        characters
        topImages {
          alt
          image {
            id
            childImageSharp {
              fluid(maxWidth: 1024) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        topLeftImages {
          alt
          image {
            id
            childImageSharp {
              fluid(maxWidth: 800) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        bottomLeftImages {
          alt
          image {
            id
            childImageSharp {
              fluid(maxWidth: 800) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        gallery {
          youtubeId
          image {
            id
            childImageSharp {
              fluid(maxWidth: 1024) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`;
