import Vue from 'vue'
import Router from 'vue-router'
import Chat from '@/components/Chat2'
import Chat2 from '@/components/Chat2'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'start',
            redirect:'chat',
        },
        {
            path: '/chat',
            name: 'chat',
            component: Chat,
        },
        {
            path: '/chat2',
            name: 'chat2',
            component: Chat2,
        },
        
        
    ]
});
export default router