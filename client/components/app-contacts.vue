<template>
  <div id="contacts" class="app-contacts">
    <div class="app-contacts__left">
      <h2>Контакти</h2>
      <ul>
        <li>
          <font-awesome-icon :icon="['fas', 'map-marked']" />
          <a
            class="link link--secondary"
            target="_blank"
            href="https://goo.gl/maps/rtxrBkXuMVqKqNKS8"
            >вул. 295-ї Стрілецької Дивізії, 4а</a
          >
        </li>
        <li class="schedule">
          <font-awesome-icon :icon="['fas', 'phone']" />
          <div class="schedule-container">
            <a class="link link--secondary" href="tel:0983557306"
              >098-355-73-06</a
            >
            <br />
            <a class="link link--secondary" href="tel:0509575458"
              >050-957-54-58</a
            >
          </div>
        </li>
        <li class="schedule">
          <font-awesome-icon :icon="['fas', 'clock']" />
          <div class="schedule-container">
            <p>Пн - Пт з 08:00 до 19:00</p>
            <br />
            <p>Сб - Вс з 08:00 до 18:00</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="app-contacts__right">
      <app-map></app-map>
    </div>
  </div>
</template>

<script>
import AppMap from "~/components/app-map"

export default {
  components: {
    AppMap,
  },
}
</script>
