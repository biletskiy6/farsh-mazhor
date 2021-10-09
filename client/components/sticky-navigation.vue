<template>
  <nav class="sticky-navigation" :class="{ active: visible }">
    <ul>
      <li>
        <div id="custom-search">
          <input
            type="text"
            name="search"
            class="search-query"
            placeholder="Знайти що?"
            :value="value"
            @input="$emit('input', $event.target.value)"
          />
          <button type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <path d="M0 0h24v24H0V0z" fill="none"/>
              <path
                d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
              />
            </svg>
          </button>
          <input type="submit" value="Submit" style="display: none"/>
        </div>
      </li>
      <li class="active">
        <a href="#vareniki" @click.prevent="handleCategoryClick('vareniki')">
          <img
            src="https://i.insider.com/60ff19210d35a90018253dc5?width=700"
            alt=""
          />
          <h6>Вареники</h6>
        </a>
      </li>
      <li>
        <a href="#svinina" @click.prevent="handleCategoryClick('svinina')">
          <img
            src="https://i.insider.com/60ff19210d35a90018253dc5?width=700"
            alt=""
          />
          <h6>Свинина</h6>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import gsap from "gsap"
import {CSSRulePlugin} from "gsap/CSSRulePlugin"
import {ScrollTrigger} from "gsap/ScrollTrigger"
import {ScrollToPlugin} from "gsap/ScrollToPlugin"

if (process.client) {
  gsap.registerPlugin(ScrollTrigger)
  gsap.registerPlugin(ScrollToPlugin)
  gsap.registerPlugin(CSSRulePlugin)
}
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visible: false,
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll)
    this.links = document.querySelectorAll('.sticky-navigation a')
    this.sections = document.querySelectorAll('section[id]')
    this.handleDetectActiveNav(this.links, this.sections)
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll)
    window.removeEventListener(
      'scroll',
      this.changeLinkState.bind(event, this.links, this.sections)
    )
  },
  methods: {
    handleScroll(e) {
      const $appHeader = document.querySelector(".main-header")
      const appHeaderHeight = $appHeader.clientHeight
      window.scrollY > appHeaderHeight
        ? (this.visible = true)
        : (this.visible = false)
    },
    handleCategoryClick(categoryName) {
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: `#${categoryName}`,
          offsetY: 75
        }
      })
    },
    handleDetectActiveNav(links, sections) {
      if (!process.client) return
      this.changeLinkState(links, sections)
      window.addEventListener(
        'scroll',
        this.changeLinkState.bind(event, links, sections)
      )
    },
    changeLinkState(links, sections) {
      const scrollY = window.pageYOffset
      sections.forEach((current) => {
        /* eslint-disable */
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop
        const sectionId = current.getAttribute('id')
        const linkToHighlight = document.querySelector(`a[href*=${sectionId}`)
        const isSectionInViewport = scrollY > sectionTop - 84 && scrollY <= (sectionTop + sectionHeight) - 84
        // console.log(isSectionInViewport)
          // scrollY > sectionTop && scrollY <= sectionTop + sectionHeight
        // console.log(scrollY, sectionTop, sectionHeight)
        if (!linkToHighlight) return
        isSectionInViewport
          ? linkToHighlight.classList.add('active')
          : linkToHighlight.classList.remove('active')
      })
    },
  },
}
</script>
