

const meta={
        token: true
      }

const routers = [{
  path: '/',
  component(resolve) {
    require.ensure(['./App.vue'], () => {
      resolve(require('./App.vue'));
    });
  },
  children: [
    {
      path: '/',
      redirect: to => {
        if (!localStorage.token) {
          return '/login'
        } else {
          return '/article'
        }
      },
    },
    {
      path: '/article',
      name: 'article',
      component(resolve) {
        require.ensure([], () => {
          resolve(require('./components/article/article.vue'));
        });
      },
      meta
    }, 
    {
      path: '/login',
      alias: '/register',
      name: 'login',
      component(resolve) {
        require.ensure([], () => {
          resolve(require('./components/login/loginComponent.vue'));
        });
      },
      meta:{
        login:true
      }
    }, {
      path: '/user/:username/:operate',
      name: 'homepage',
      component(resolve) {
        require.ensure([], () => {
          resolve(require('./components/homepage'));
        });
      },
      meta
    },
    {
      path: '/404',
      name: '404',
      component(resolve) {
        require.ensure([], () => {
          resolve(require('./components/404'));
        });
      }
    }, {
      path: '*',
      name: 'all',
      redirect: to => {
        return '/404'
      }
    },
  ],
}]



export default routers;