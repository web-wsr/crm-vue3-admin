// 文章路由模块

const ClueIndex = () => import(/* webpackChunkName: "clue" */ '@/views/Clue/ClueIndex.vue');
const ClueDetails = () => import(/* webpackChunkName: "clue" */ '@/views/Clue/ClueDetails.vue');
const ClueRecord = () => import(/* webpackChunkName: "clue" */ '@/views/Clue/ClueRecord.vue');

export default [
  {
    path: '/clue',
    name: 'Clue',
    redirect: { name: 'ClueIndex' },
    meta: {
      permission: 'clue-manage',
      nav: {
        icon: 'icon-clue',
        title: '线索管理'
      },
      breadcrumb: {
        name: '线索'
      }
    },
    children: [
      {
        path: '',
        name: 'ClueIndex',
        component: ClueIndex,
        meta: {
          permission: 'clue-index',
          nav: {
            title: '线索列表'
          },
          breadcrumb: {
            name: '线索列表'
          }
        }
      },
      {
        path: '/details/:id',
        name: 'ClueDetails',
        component: ClueDetails,
        meta: {
          permission: 'clue-details',
          breadcrumb: {
            name: '线索详情'
          }
        }
      },
      {
        path: '/record/:id',
        name: 'ClueRecord',
        component: ClueRecord,

        meta: {
          permission: 'clue-record',
          breadcrumb: {
            name: '线索记录'
          }
        }
      }
    ]
  }
];
