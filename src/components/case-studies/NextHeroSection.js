import React from "react";
import styled from "styled-components";
import { GatsbyImage } from "gatsby-plugin-image";

const HeroStyles = styled.div`
  width: 100%;
  height: ${(props) => (props.next ? "200px" : "100vh")};
  min-height: ${(props) => (props.next ? "white" : "500px")};
  background: blue;
  overflow: hidden;
  position: relative;
  color: var(--white);
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  .hero-inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .brand-logo {
      max-width: 300px;
      object-fit: contain;
      height: auto;
    }
    h2 {
      font-size: 2.5rem;
      text-align: center;
      max-width: 500px;
    }
  }
`;

export default function NextHeroSection({ data }) {
  return (
    <HeroStyles>
      <img src={data?.heroImage?.sourceUrl} alt={data?.heroImage?.sourceUrl} />
      {data?.heroImage?.sourceUrl.includes(".gif") ? (
        <img src={data?.heroImage?.sourceUrl} alt={data?.heroImage?.alt} />
      ) : (
        <>
          <GatsbyImage
            image={data?.heroImage?.localFile?.childImageSharp?.gatsbyImageData}
            alt={data?.heroImage?.alt}
          />
        </>
      )}
      <div className="hero-inner">
        <img
          className="brand-logo"
          src={data?.heroLogo?.sourceUrl}
          alt={data?.heroLogo?.alt}
        />
        <h2>{data?.heroText}</h2>
      </div>
    </HeroStyles>
  );
}
