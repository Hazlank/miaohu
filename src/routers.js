const routers = [{
  path: '/',
  name: 'index',
  component(resolve) {
    require.ensure(['./App.vue'], () => {
      resolve(require('./App.vue'));
    });
  },
  children: [
    {
      path: '/article',
      name: 'article',
      component(resolve) {
        require.ensure([], () => {
          resolve(require('./components/homePage/article.vue'));
        });
      }
    }, {
      path: '/login',
      name: 'login',
      component(resolve) {
        require.ensure([], () => {
          resolve(require('./components/login/loginComponent.vue'));
        });
      }
    }, {
      path: '/register',
      name: 'register',
      component(resolve) {
        require.ensure([], () => {
          resolve(require('./components/login/loginComponent.vue'));
        });
      }
    }],
}]


export default routers;