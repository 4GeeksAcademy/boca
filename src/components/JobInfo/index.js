import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { Div, GridContainer } from "../Sections";
import { H3, Span, Paragraph } from "../Heading";
import { Colors } from "../Styling";
// import Link from "gatsby-link";
import Icon from "../Icon";

const JobInfo = ({ lang }) => {
  const data = useStaticQuery(graphql`
    query myNewJobsQuery {
      allJobYaml(
        filter: { meta_info: { visibility: { nin: ["hidden", "unlisted"] } } }
      ) {
        edges {
          node {
            banner_heading
            cities
            meta_info {
              slug
              open
            }
            fields {
              lang
            }
          }
        }
      }
    }
  `);
  let jobs = data.allJobYaml.edges;
  console.log(jobs);
  const jobsInLang = jobs?.filter((j) => j.node.fields.lang == lang) || [];
  return (
    // <Fragment github="/job">
    <GridContainer
      columns="2"
      columns_tablet="3"
      gridGap="10px"
      margin_tablet="0 0 70px 0"
    >
      {jobsInLang
        ? jobsInLang.map((item, index) => {
            return (
              <Div
                key={index}
                style={{ position: "relative" }}
                border="1px solid black"
                borderLeft="6px solid black"
                borderTop="1px solid black"
                borderLeft_tablet="1px solid black"
                borderTop_tablet="6px solid black"
                display="flex"
                flexDirection="column"
                justifyContent="between"
                height="207px"
                padding="24px"
                background={Colors.white}
              >
                <H3 textAlign="left">
                  {item.node.banner_heading}
                  <Span animated color={Colors.yellow}>
                    _
                  </Span>
                </H3>
                <Div display="flex" flexWrap={"wrap"}>
                  {item.node.cities.map((city, index) => {
                    return (
                      <Paragraph
                        key={index}
                        width="auto"
                        padding={"3px"}
                        margin={"3px"}
                        background={Colors.verylightGray}
                        textAlign="left"
                        fontSize="15px"
                        lineHeight="22px"
                        color={Colors.darkGray}
                      >
                        {city}
                      </Paragraph>
                    );
                  })}
                </Div>
                <Link to={`/job/${item.node.meta_info.slug}`}>
                  <Icon
                    style={{
                      position: "absolute",
                      bottom: "18px",
                      right: "18px",
                    }}
                    icon="arrowright"
                    height="32px"
                    width="32px"
                  />
                </Link>
              </Div>
            );
          })
        : "Loading"}
    </GridContainer>
  );
};

export default JobInfo;

// <Row display="flex" key={index}>
//   <Column>
//     <Card
//       style={{position: "relative"}}
//       height="100px"
//       width="100%"
//       shadow
//       padding="20px"
//       margin="5px 0 10px 0"
//     >
//       <Row display="flex">
//         <Column size="12">
//           <H4
//             fs_xs="18px"
//             fs_sm="20px"
//             fs_md="20px"
//             fs_lg="20px"
//             fontSize="24px"
//             color={Colors.black}>{item.node.banner_heading}</H4>
//         </Column>
//       </Row>
//       <Row display="flex" justifyContent={`center`} margin={`10px 0 0 0`}>
// {
//   item.node.cities.map((city, index) => {
//     return (
//       <Card
//         key={index}
//         padding="3px 10px"
//         borders=".25rem"
//         width="100%"
//         color={`grey`}
//         margin={`3px`}
//       ><Paragraph
//         color={Colors.gray}
//         align="center"
//         fs_sm="12px"
//       >{city}</Paragraph>
//       </Card>
//     )
//   })
// }
//       </Row>
//       <Link to={`/job/${item.node.meta_info.slug}`}>
//         <Icon icon="arrowright" style={{position: "absolute", right: "10px", bottom: "5px"}} width="32" color={Colors.blue} fill={Colors.blue} />
//       </Link>
//     </Card>
//   </Column>
// </Row>
