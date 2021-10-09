<template>
  <div id="contacts" class="app-contacts">
    <div class="app-contacts__left">
      <app-map></app-map>
    </div>
    <div class="app-contacts__right">
      <h2>Контакти</h2>
      <ul>
        <li>
          <font-awesome-icon :icon="['fas', 'map-marked']" />
          <p>вул. 295-ї Стрілецької Дивізії, 4а</p>
        </li>
        <li>
          <font-awesome-icon :icon="['fas', 'phone']" />
          <a href="tel:0983557306">098-355-73-06</a>
        </li>
        <li class="schedule">
          <font-awesome-icon :icon="['fas', 'clock']" />
          <div class="schedule-container">
            <p>Пн - Пт з 08:00 до 19:00</p>
            <br />
            <p>Пн - Пт з 08:00 до 18:00</p>
          </div>
        </li>
      </ul>
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
