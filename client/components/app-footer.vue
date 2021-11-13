<template>
  <footer class="app-footer">
    <div class="footer-logo"><app-logo></app-logo></div>
    <div class="footer-copyrights">
      <div class="footer-copyrights__col author">
        <a
          target="_blank"
          href="https://t.me/biletskiy6"
          class="link link--secondary"
          >By Victor Biletsky</a
        >
      </div>
      <div class="footer-copyrights__col socials">
        <div class="footer-socials">
          <app-socials>
            <div slot-scope="{ socials }">
              <a
                v-for="social in socials"
                :key="social.name"
                :href="social.href"
                target="_blank"
              >
                <font-awesome-icon :icon="['fab', social.name]" />
              </a>
            </div>
          </app-socials>
        </div>
      </div>
      <div class="footer-copyrights__col rights">
        &copy; 2021 farsh mazhor. Всі права захищені.
      </div>
    </div>
  </footer>
</template>

<script>
import AppLogo from "@/components/app-logo"
import AppSocials from "@/components/app-socials"

export default {
  components: {
    AppLogo,
    AppSocials,
  },
}
</script>
