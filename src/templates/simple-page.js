import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

export const SimplePageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content;

  return <PageContent className="content" content={content} />;
};

SimplePageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func
};

const SimplePage = ({ data }) => {
  const { site, markdownRemark: post } = data;

  return (
    <Layout>
      <SimplePageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
      />
    </Layout>
  );
};

SimplePage.propTypes = {
  data: PropTypes.object.isRequired
};

export default SimplePage;

export const SimplePageQuery = graphql`
  query SimplePage($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        meta {
          description
          keywords
        }
        title
      }
    }
  }
`;
