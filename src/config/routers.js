const Routers = [
    {
        name: '主页',
        path: '/home',
        component: () => import('../routes/home'),
    },
    {
        name: '个人中心',
        path: '/my',
        models: () => [import('../models/global')],
        component: () => import('../routes/home/my'),
    },
    {
        name: '花呗',
        path: '/withbai',
        component: () => import('../routes/home/withbai'),
    },
    /*---------------------------- */
];

export default Routers;