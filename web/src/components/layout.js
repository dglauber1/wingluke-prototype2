// GLOBAL STYLES
import "../styles/global.scss"

import React, { useCallback, useEffect, useRef, useState } from "react"

import Footer from "./footer"
import { IconContext } from "@react-icons/all-files"
import MomaHeader from "./momaHeader"
import PropTypes from "prop-types"
import classNames from "classnames"
import styles from "./layout.module.scss"

// let previousScrollPos = 0
// let lastDownPos = 0
// let lastUpPos = 0
let ticking = false
const maxHeaderHeight = 150

const Layout = ({ children, location }) => {
  const [headerIsShown, setHeaderIsShown] = useState(true)
  const [headerItemOpened, setHeaderItemOpened] = useState(null)

  const toggleHeader = useCallback(
    headerItemClicked => {
      const body = document.body
      if (!headerItemClicked || headerItemClicked === headerItemOpened) {
        body.style.overflow = "auto"
      } else {
        body.style.overflow = "hidden"
      }

      if (window.scrollY > maxHeaderHeight) {
        setHeaderIsShown(
          headerItemClicked !== null && headerItemClicked !== headerItemOpened
        )
      }
      setHeaderItemOpened(
        headerItemClicked === headerItemOpened ? null : headerItemClicked
      )
    },
    [headerItemOpened]
  )

  const layoutContainer = useRef(null)

  // calculate maxHeaderHeight, just once (deps array is empty)
  /* useEffect(() => {
    let headerHeight = getComputedStyle(
      layoutContainer.current
    ).getPropertyValue("--header-max-room")
    headerHeight = headerHeight.substring(0, headerHeight.length - 3)
    headerHeight =
      parseFloat(headerHeight) *
      parseFloat(getComputedStyle(document.documentElement).fontSize)
    if (maxHeaderHeight === 0) maxHeaderHeight = headerHeight
  }, []) */

  const adjustHeader = useCallback(
    scrollPos => {
      if (!layoutContainer.current) {
        return
      }

      if (scrollPos <= maxHeaderHeight * (3 / 5) && !headerIsShown) {
        setHeaderIsShown(true)
      } else if (scrollPos > maxHeaderHeight && headerIsShown) {
        setHeaderIsShown(false)
        /* if (scrollPos < previousScrollPos) {
          // scrolling up
          lastUpPos = scrollPos
          //  if (!headerIsShown && lastUpPos < lastDownPos - maxHeaderHeight) {
          //   setHeaderIsShown(true)
          // } 
        } else if (scrollPos > previousScrollPos) {
          // scrolling down
          lastDownPos = scrollPos
          if (headerIsShown && lastDownPos > lastUpPos + maxHeaderHeight) {
            // header is shown and we've scrolled down more than the height of the header from the last up scroll position
            setHeaderIsShown(false)
          }
        } */
      }

      // previousScrollPos = scrollPos
    },
    [headerIsShown]
  )

  const handleScroll = useCallback(() => {
    if (!ticking && !headerItemOpened) {
      window.requestAnimationFrame(() => {
        adjustHeader(window.scrollY)
        ticking = false
      })

      ticking = true
    }
  }, [adjustHeader, headerItemOpened])

  /* useEffect(() => {
    lastUpPos = window.scrollY
    lastDownPos = window.scrollY
    // TODO small bug is that this doesn't run when a user clicks the ToC link that they're already on, so sometimes the header is not hidden when it should be
    if (location.hash && window.scrollY > 0) {
      setHeaderIsShown(false)
    }
  }, [location.hash]) */

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

  // when the component mounts, adjust whether the header is shown or not
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    if (!mounted) {
      console.log("mounted!")
      adjustHeader(window.scrollY)
      setMounted(true)
    }
  }, [mounted, adjustHeader])

  // when the route changes
  const locRef = useRef({
    pathname: null,
    hash: null,
  })
  const [hasMediaBg, setHasMediaBg] = useState(true)
  useEffect(() => {
    if (locRef.current.pathname !== location.pathname) {
      locRef.current.pathname = location.pathname
      if (headerItemOpened) {
        toggleHeader(null)
      }
    }
    // I don't think anything actually needs to be done when hash updates?
  }, [location.pathname, headerItemOpened, toggleHeader])
  useEffect(() => {
    console.log(hasMediaBg)
    if (hasMediaBg !== ["/"].includes(location.pathname)) {
      console.log("changing hasMediaBg")
      setHasMediaBg(["/"].includes(location.pathname))
    }
  }, [hasMediaBg, location.pathname])
  /* useEffect(() => {
    // lastUpPos = window.scrollY
    // lastDownPos = window.scrollY
    if (headerItemOpened || headerIsShown) {
      toggleHeader(null)
    }
  }, [location.pathname, location.hash]) */
  /* const [hasMediaBg, setHasMediaBg] = useState(
    window ? ["/"].includes(location.pathname) : true
  )
  useEffect(() => {
    console.log(location.pathname, hasMediaBg)
    if (["/"].includes(location.pathname) !== hasMediaBg) {
      setHasMediaBg(["/"].includes(location.pathname))
      console.log("doing this")
    }
  }, [location.pathname]) */

  return (
    <div
      ref={layoutContainer}
      className={classNames(styles.layoutContainer, {
        [styles.headerIsShown]: headerIsShown,
        [styles.headerIsOpen]: Boolean(headerItemOpened),
        [styles.hasMediaBg]: hasMediaBg,
      })}
    >
      <IconContext.Provider
        value={{
          size: "1.1em",
          style: {
            verticalAlign: "middle",
          },
        }}
      >
        {/* TODO <a href="#main-content">Jump to Main Content</a> */}
        <MomaHeader
          headerItemOpened={headerItemOpened}
          toggleHeader={toggleHeader}
          transparent={hasMediaBg && headerIsShown}
        />
        <main
          className={classNames({
            // [styles.transitionIn]:
            [styles.hasMediaBg]: hasMediaBg,
            [styles.visibilityHidden]: false, //Boolean(headerItemOpened),
          })}
        >
          {/* TODO <a id="main-content"></a> */}
          {children}
        </main>
        <Footer />
      </IconContext.Provider>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
