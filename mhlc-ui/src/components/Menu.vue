<template>
  <template v-if="lgAndUp">
    <v-menu
      v-for="(item) in menuItemsDisplayed"
      :key="item.id"
      open-on-hover
    >
      <template #activator="{ props }">
        <v-btn
          color="primary"
          v-bind="props"
          :to="item.path"
          variant="text"
        >
          {{ item.label }}
        </v-btn>
      </template>

      <v-list v-if="item.children.length > 0">
        <v-list-item
          v-for="(child) in item.children"
          :key="child.id"
        >
          <v-list-item-title>
            <v-btn
              :to="child.path"
              plain
            >
              {{ child.label }}
            </v-btn>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </template>
  <template v-else>
    <v-menu>
      <template #activator="{ props }">
        <v-btn
          v-bind="props"
          icon
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in menuItemsDisplayed"
          :key="index"
          :value="index"
        >
          <v-list-item-title v-if="!item.children || item.children.length == 0">
            <v-btn
              color="primary"
              v-bind="props"
              :to="item.path"
              variant="text"
            >
              <v-icon />
              {{ item.label }}
            </v-btn>
          </v-list-item-title>
          <v-list-item-title v-else>
            <v-menu location="start">
              <template #activator="{ props }">
                <v-btn
                  color="primary"
                  v-bind="props"
                  variant="text"
                >
                  <v-icon>mdi-menu-left</v-icon>
                  {{ item.label }}
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(child, childIndex) in item.children"
                  :key="childIndex"
                  :value="childIndex"
                >
                  <v-list-item-title>
                    <v-btn
                      color="primary"
                      v-bind="props"
                      :to="child.path"
                      variant="text"
                    >
                      {{ child.label }}
                    </v-btn>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </template>
</template>

<script setup>
    import { useContentStore } from '@/store/content';
    import { useSecurityStore } from '@/store/security';
    import { storeToRefs } from 'pinia';
    import { useDisplay } from 'vuetify';
    import { computed } from 'vue';

    const contentStore = useContentStore();
    const { menuItems } = storeToRefs(contentStore);
    const securityStore = useSecurityStore();
    const { isAuthenticatedUser } = storeToRefs(securityStore);

    const { lgAndUp } = useDisplay()

    const menuItemsDisplayed = computed(() => {
        const items = menuItems.value;
        const secureItems = isAuthenticatedUser.value ? [
            {
                label: 'Admin',
                children: [
                    { parent: 'admin-options', id: 'admin-home', label: 'Admin Home', path: '/admin' },
                    { parent: 'admin-options', id: 'admin-analytics', label: 'Analytics', path: '/analytics' },
                    { parent: 'admin-options', id: 'admin-content-cache', label: 'Content Cache', path: '/cache' },
                    { parent: 'admin-options', id: 'admin-logout', label: 'Logout', path: '/logout' }
                ]
            }
        ] : [];
        return items.concat(secureItems);
    });
</script>

<style>
.v-list-item .v-btn--variant-elevated, .v-list-item .v-btn--elevated:hover, .v-list-item .v-btn--elevated:focus {
    box-shadow: none;
}
</style>