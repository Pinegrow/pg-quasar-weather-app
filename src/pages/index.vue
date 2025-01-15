<script setup lang="ts">
  // @ts-nocheck
  import { computed, ref } from 'vue'
  import { useQuasar, getCssVar } from 'quasar'
  import { api } from 'boot/axios'

  const $q = useQuasar()

  const searching = ref(false)
  const searchText = ref('')
  const weatherData = ref(null)
  const lat = ref(null)
  const lon = ref(null)

  const weatherApiKey = 'b6cd22634f8f1c9a74704828f7f0523e'
  const weatherApiBaseUrl = 'https://api.openweathermap.org/data/2.5'
  const geoApiBaseUrl = 'https://freegeoip.app/json/'

  const temp = computed(() => {
    const fahrenheit = Math.round(weatherData.value.main.temp)
    return (((fahrenheit - 32) * 5) / 9).toFixed(2)
  })

  const weatherImage = computed(() => {
    const weatherApiBaseUrl = 'http://openweathermap.org/img/wn'
    return `${weatherApiBaseUrl}/${weatherData.value.weather[0].icon}@2x.png`
  })

  const bgClass = computed(() => {
    if (!weatherData.value) return null

    if (weatherData.value.weather[0].icon.endsWith('n')) {
      return 'bg-night'
    } else {
      return 'bg-day'
    }
  })

  const getLocation = async () => {
    searching.value = true
    try {
      if ($q.platform.is.electron) {
        const result = await api.get(geoApiBaseUrl)
        lat.value = result.data.latitude
        lon.value = result.data.longitude
        getWeatherByCoords()
        searching.value = false
      } else {
        navigator.geolocation.getCurrentPosition((position) => {
          lat.value = position.coords.latitude
          lon.value = position.coords.longitude
          getWeatherByCoords()
          searching.value = false
        })
      }
    } catch (err) {
      // err
    }
  }

  const getWeatherBySearch = async () => {
    try {
      const endpoint = `${weatherApiBaseUrl}/weather?q=${searchText.value}&appid=${weatherApiKey}&units=imperial`
      const response = await api.get(endpoint)
      weatherData.value = response.data
      console.log('weatherData', weatherData.value)
    } catch (error) {
      console.error('getWeatherBySearch', error.message)
      weatherData.value = null
    }
  }

  const getWeatherByCoords = async () => {
    try {
      const endpoint = `${weatherApiBaseUrl}/weather?lat=${lat.value}&lon=${lon.value}&appid=${weatherApiKey}&units=imperial`
      const response = await api.get(endpoint)
      weatherData.value = response.data
      console.log('weatherData', weatherData.value)
    } catch (error) {
      console.error('getWeatherByCoords', error.message)
      weatherData.value = null
    }
  }

  const primary = getCssVar('primary')
  const secondary = getCssVar('secondary')
</script>
<template>
  <q-page class="flex column" :class="bgClass">
    <q-inner-loading :showing="searching" color="white" />
    <section class="col q-pt-lg q-px-md">
      <q-input
        v-model="searchText"
        borderless
        dark
        placeholder="Search"
        @keyup.enter="getWeatherBySearch"
      >
        <template #before>
          <q-icon name="my_location" @click="getLocation" />
        </template>
        <template #append>
          <q-btn round dense flat icon="search" @click="getWeatherBySearch" />
        </template>
      </q-input>
    </section>
    <template v-if="weatherData">
      <section class="col text-white text-center">
        <div class="text-h4 text-weight-light">{{ weatherData.name }}</div>
        <div class="text-h6 text-weight-light">
          {{ weatherData.weather[0].main }}
        </div>
        <div class="text-h1 text-weight-thin q-my-lg relative-position">
          <span>{{ temp }}</span
          ><span class="text-h4 relative-position degree">&deg;C</span>
        </div>
      </section>
      <section class="col text-center">
        <q-img :src="weatherImage" alt="Weather Image" width="100px" />
      </section>
    </template>
    <template v-else>
      <section class="col column text-center text-white">
        <div class="col text-h2 text-weight-thin">Quasar<br />Weather</div>
        <q-btn flat class="col" @click="getLocation">
          <q-icon left size="3em" name="my_location" />
          <div>Find My Location</div>
        </q-btn>
      </section>
    </template>
    <section class="col skyline"></section>
  </q-page>
</template>
<style lang="scss">
  .q-page {
    background: v-bind(primary);
    background: -webkit-linear-gradient(
      to bottom,
      v-bind(secondary),
      v-bind(primary)
    );
    background: linear-gradient(to bottom, v-bind(secondary), v-bind(primary));

    &.bg-night {
      background: #0f2027;
      background: -webkit-linear-gradient(to bottom, #0f2027, #203a43, #2c5364);
      background: linear-gradient(to bottom, #0f2027, #203a43, #2c5364);
    }
  }
  .degree {
    top: -44px;
  }
  .skyline {
    flex: 0 0 100px;
    background: url(/skyline.png);
    background-size: contain;
    background-position: bottom;
  }
</style>
