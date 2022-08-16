
export default [

    {
        path: '/',
        name: 'Home',
        component: () => import('../views/home.vue')
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../views/dashboard.vue')
    },
    {
        path: '/transfer',
        name: 'Transfer',
        component: () => import('../views/transfer.vue')
    },
]