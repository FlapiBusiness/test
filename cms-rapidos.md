Parfait ! Voici la **version complète, corrigée et détaillée** des **features initiales du CMS** à développer avec NuxtJS (frontend) et AdonisJS (backend), **destinée à ton collègue**.

---

## 🧱 1. STRUCTURE GÉNÉRALE

### ✅ Créer la page `/pages/admin.vue`

- Route d’administration du CMS.
- Utilise un layout dédié : `layouts/admin.vue`.

---

## 🎨 2. UI / LAYOUTS / COMPONENTS

### ✅ Créer le layout `layouts/admin.vue`

- Fond de couleur identique à Flapi Hub.
- Structure :
  - Sidebar gauche (`AdminSidebar.vue`)
  - Zone d’aperçu à droite (builder).
  - En haut à droite : `FlapiButton` “Publier la page”

```vue
<template>
  <div class="flex h-screen bg-[#F2F4F8]">
    <AdminSidebar />
    <div class="relative flex-1 overflow-auto p-6">
      <div class="absolute right-4 top-4 z-10">
        <FlapiButton @click="publish">Publier la page</FlapiButton>
      </div>
      <slot />
    </div>
  </div>
</template>
```

---

## 📁 3. SIDEBAR MENU À GAUCHE

### ✅ Créer `components/AdminSidebar.vue`

- Largeur fixe (plus large que `FlapiSidebar`).
- Fond sombre (FlapiHub-style).
- Logo Flapi en haut centré.
- En-dessous : liste verticale de **vignettes de composants**.

### ✅ Créer `components/ComponentCard.vue` (Vignette générique)

- Props :
  - `label: string`
  - `type: string`
  - `icon?: string`
- Au clic : émet un `@select` avec le type du composant.
- Utilisé dans `AdminSidebar.vue` pour chaque composant possible.

Exemple d’appel :

```vue
<ComponentCard label="Hero" type="hero-section" @select="addComponent" />
```

---

## 🧩 4. COMPOSANTS DE PAGE

### ✅ Créer `components/sections/HeroSection.vue`

- Props :
  - `title`, `content`, `imageUrl`, `showImage`, `showButton`, `buttonLabel`, `buttonLink`
- Racine du composant : `<div v-editable="blok">` si tu prévois d’ajouter Storyblok plus tard.

### (Plus tard) Ajouter d’autres sections :

- `ImageLeftTextRightSection.vue`
- `CtaSection.vue`
- Tous dans `components/sections/`

---

## 🧠 5. CMS BUILDER (Preview live)

### ✅ Logique dans `pages/admin.vue`

- Données (reactive) :

```ts
const pageSlug = 'home'
const componentsList = ref<
  {
    type: 'hero-section' | 'image-left-text-right' | 'cta'
    order: number
    data: Record<string, any>
    page_slug: string
  }[]
>([])
```

### ✅ Affichage live

- Boucle sur `componentsList` :

```vue
<component v-for="(block, idx) in componentsList" :key="idx" :is="getComponentName(block.type)" v-bind="block.data" />
```

### ✅ Méthode `getComponentName()`

- Convertit `'hero-section'` → `'HeroSection'`, etc.

```ts
function getComponentName(type: string) {
  const mapping = {
    'hero-section': 'HeroSection',
    'image-left-text-right': 'ImageLeftTextRightSection',
    cta: 'CtaSection',
  }
  return mapping[type]
}
```

---

## 💾 6. SAUVEGARDE EN DB

### ✅ Bouton **"Publier"**

- Envoie une requête POST à `/api/page-builder/home` :

```ts
{
  blocks: [
    {
      type: "hero-section",
      order: 1,
      data: { title: "Hey", content: "..." },
      page_slug: "home"
    },
    ...
  ]
}
```

### ✅ Backend (AdonisJS)

- Table `page_components` :
  - `id`
  - `type` (string)
  - `order` (integer)
  - `data` (JSON)
  - `page_slug` (string)
  - `created_at`, `updated_at`
- Route `GET /api/page-builder/:slug` → pour charger la page côté Nuxt
- Route `POST /api/page-builder/:slug` → pour sauvegarder

---

## ✅ À FAIRE POUR LE COLLÈGUE

### 🏁 To-do initial

- [ ] Créer `pages/admin.vue`
- [ ] Créer `layouts/admin.vue`
- [ ] Créer `components/AdminSidebar.vue`
- [ ] Créer `components/ComponentCard.vue`
- [ ] Créer `components/sections/HeroSection.vue`
- [ ] Créer logique `componentsList` avec `type`, `order`, `data`, `page_slug`
- [ ] Créer `FlapiButton` “Publier” en haut à droite
- [ ] Ajouter route API `/api/page-builder/home` (mock d'abord)
- [ ] Afficher dynamiquement les composants dans l’ordre
- [ ] Ajouter méthode `getComponentName()`

---

Souhaites-tu que je te génère tout le squelette NuxtJS (fichiers + contenu minimal) pour lancer ça rapidement ?
