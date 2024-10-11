import {createRouter,createWebHistory} from 'vue-router';
import ProductList from './components/pages/ProductList.vue';
import ProductDetail from './components/pages/ProductDetail.vue';
import AllFavourites from './components/pages/AllFavourites.vue';
import NotFound from './components/pages/NotFound.vue'

const router = createRouter({
    history : createWebHistory(),
    routes : [
        {path : '/', redirect : '/products'},
        {path : '/products', component : ProductList},
        {path: '/productdetail/:id',component: ProductDetail, props:true},
        {path:'/favourites',component: AllFavourites},
        {path:'/:notfound(.*)',component: NotFound}
    ]
});

export default router;