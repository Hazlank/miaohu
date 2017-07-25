

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
      }
    }, {
      path: '/login',
      alias: '/register',
      name: 'login',
      component(resolve) {
        require.ensure([], () => {
          resolve(require('./components/login/loginComponent.vue'));
        });
      }
    }, {
      path: '/user/:username/:operate',
      // redirect: to => {

      //   let path = to.path;
      //   return "activities,answers,asks,columns,collections,activities".split(',').indexOf(path.substring(path.lastIndexOf('/') + 1)) == -1 ? '/404' : path
      // },
      name: 'homepage',
      component(resolve) {
        require.ensure([], () => {
          resolve(require('./components/homepage'));
        });
      }
    },
    {
      path: '/404',
      name: '404',
      component(resolve) {
        require.ensure([], () => {
          console.log('a')
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