import React from "react";
import { Link, navigate } from "gatsby";
import styled from "styled-components";
import fullLogo from "../../assets/images/wildish-logo-full.svg";
import { gsap } from "gsap";
import Image from "../Image";

const DoubleScrollStyles = styled.div`
  display: flex;
  position: relative;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const HomepageSection = styled.section`
  position: sticky;
  bottom: 0;
  height: 100vh;
  position: relative;
  width: 50%;
  scroll-snap-type: y mandatory;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  will-change: width scroll-position;
  ::-webkit-scrollbar {
    display: none;
  }
  &.transition {
    transition: 0.3s ease width;
  }
  &:hover {
    width: 55%;
  }
  .homepage-words {
    height: 100%;
    width: 100%;
    scroll-snap-align: start;
    scroll-snap-stop: normal;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--yellow);
    position: relative;
    z-index: 1;
    outline: none;
    border: none;
    &.homepage-words-hero {
      background: #fff;
    }
    &.homepage-images-hero {
      background: #000;
    }
    .homepage-logo {
      width: 80%;
    }
    .hompepage-words-copy {
      padding: 30px;
      max-width: 600px;
      margin: auto;
    }
    .casestudy-title {
      position: absolute;
      display: block;
      left: 0;
      bottom: 0;
      width: 100%;
      background: var(--black);
      color: var(--white);
      font-size: 1.2rem;
      padding: 10px 0;
      z-index: 2;
      opacity: 0;
      transition: 0.3s ease opacity;
      text-align: center;
    }
    :hover {
      .casestudy-title {
        opacity: 1;
      }
    }
  }
`;

export default function DoubleScrollSection({ data }) {
  const wordsRef = React.useRef(null);
  const picturesRef = React.useRef(null);

  const animation = () => {
    let tl = gsap.timeline({ ease: "power1.in" });

    return tl
      .to(".transition", {
        duration: 0.2,
        css: {
          transition: "0.1s ease all",
        },
      })
      .to(".homepage-left", {
        opacity: 0,
        duration: 0.3,
      })
      .to(
        ".casestudy-title",
        {
          opacity: 0,
          duration: 0.3,
        },
        "<"
      )
      .to(wordsRef.current, {
        width: 0,
        duration: 1.2,
        delay: 0.4,
        ease: "power4.out",
      })
      .to(
        picturesRef.current,
        {
          width: "100%",
          duration: 1.2,
          ease: "power4.out",
        },
        "<"
      )
      .add(function () {}, "+=0.3");
  };

  const handleLeftHover = () => {
    gsap.to(wordsRef.current, {
      width: "55%",
      duration: 0.1,
    });
  };

  const removeLeftHover = () => {
    gsap.to(wordsRef.current, {
      width: "50%",
      duration: 0.1,
    });
  };

  const handleRightHover = () => {
    gsap.to(picturesRef.current, {
      width: "55%",
      duration: 0.1,
    });
  };

  const removeRightHover = () => {
    gsap.to(picturesRef.current, {
      width: "50%",
      duration: 0.1,
    });
  };

  return (
    <>
      <DoubleScrollStyles>
        <HomepageSection ref={wordsRef} className="left-side transition">
          <div className="homepage-words-hero homepage-words homepage-left">
            <img
              className="homepage-logo"
              src={fullLogo}
              alt="Wildish & Co full logo"
            />
          </div>
          {data?.homepage?.words?.map((w, i) => {
            return (
              <div className="homepage-words homepage-left" key={i}>
                <div
                  className="hompepage-words-copy html"
                  dangerouslySetInnerHTML={{ __html: w?.section }}
                />
              </div>
            );
          })}
        </HomepageSection>
        <HomepageSection ref={picturesRef} className="right-side transition">
          <div className="homepage-words homepage-images-hero">
            {data?.homepage?.picturesVideo?.video ? (
              <div className="square-iframe-container">
                <iframe
                  title="Wildish animation"
                  loading="eager"
                  src={data?.homepage?.picturesVideo?.video}
                />
              </div>
            ) : (
              <Image image={data?.homepage?.picturesVideo?.backupImage} />
            )}
          </div>
          {data?.homepage?.cases?.map((c, i) => {
            return (
              <Link
                to={`/case-studies/${c?.slug}`}
                key={i}
                className={`homepage-words`}
                onClick={async (e) => {
                  e.preventDefault();
                  await animation();
                  await navigate(`/case-studies/${c?.slug}`);
                }}
              >
                <Image image={c?.case_study?.heroImage} />
                <p className="casestudy-title">Case Study: {c?.title} &rarr;</p>
              </Link>
            );
          })}
        </HomepageSection>
      </DoubleScrollStyles>
    </>
  );
}
