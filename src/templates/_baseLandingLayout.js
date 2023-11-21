import React from "react";
import Layout from "../global/LandingLayout";

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const BaseRender =
  (Page, options = {}) =>
  (props) => {
    const { data, pageContext } = props;

    let yml = null;
    try {
      yml = data[`all${cap(pageContext.type)}Yaml`].edges[0].node;
    } catch (err) {
      console.error(
        `There was a problem loading the data for type ${cap(
          pageContext.type
        )}`,
        data
      );
      return (
        <pre>
          There was a problem loading the data for{" "}
          {JSON.stringify(props, null, 4)}
        </pre>
      );
    }
    let filteredPrograms;
    let filteredLocations;
    const utm_course = yml.meta_info?.utm_course;

    if (pageContext.type === "landing") {
      filteredPrograms = data.allCourseYaml.edges
        .filter(({ node }) => {
          return (
            utm_course.filter((array_el) => {
              return node.meta_info.bc_slug === array_el;
            }).length !== 0
          );
        })
        .map(({ node }) => ({
          ...node,
        }));
      if (filteredPrograms.length == 0) {
        throw new Error(
          "There are not programs to show on this landing page, make sure to include them on meta_info.utm_course array"
        );
      }
    } else {
      filteredPrograms = [
        {
          label: null,
          value: null,
        },
      ];
    }

    return (
      <Layout
        landingNavbar={options.landingNavbar}
        landingFooter={options.landingFooter}
        seo={yml.meta_info}
        context={pageContext}
      >
        {/* <StickyBar /> */}
        <Page {...props} yml={yml} filteredPrograms={filteredPrograms} />
      </Layout>
    );
  };

export default BaseRender;
