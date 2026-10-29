import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from './views/HomePage.vue'
import ImpactPage from './views/ImpactPage.vue'

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior(to, _from, saved) { return saved ?? (to.hash ? { el: to.hash, behavior: 'smooth' } : { top: 0, behavior: 'smooth' }) },
  routes: [
    { path: '/', name: 'home', component: HomePage, meta: { title: 'FBS Innova — Learn, track, diversify' } },
    { path: '/profile', name: 'impact', component: ImpactPage, meta: { title: 'Our impact — FBS Innova' } },
  ],
})
router.afterEach((to) => { document.title = String(to.meta.title ?? 'FBS Innova') })
export default router
