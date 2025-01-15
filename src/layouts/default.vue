<script setup lang="ts">
  import siteMeta from '~/site'

  const route = useRoute()

  const pageMeta = computed(() => {
    return {
      title: route.meta.title,
      description: route.meta.description,
      ogImage: route.meta.ogImage,
      canonicalUrl: route.meta.canonicalUrl || route.fullPath,
      generator: route.meta.generator,
      tags: route.meta.tags,
    }
  })

  useHeadAndMeta(pageMeta)

  const allNavs = Object.values(siteMeta.navs).reduce((acc, navMenu) => {
    return [...acc, ...navMenu]
  }, [])
</script>
<template>
  <div>
    <q-layout view="lHh Lpr lFf">
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>
