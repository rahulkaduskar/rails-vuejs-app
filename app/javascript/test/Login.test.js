import { shallow, createLocalVue } from 'vue-test-utils'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate';

import jsdom from 'jsdom';
import Login from '../login/Login.vue';
import Signup from '../login/Signup.vue';
import ForgotPassword from '../login/ForgotPassword';

const renderer = require('vue-server-renderer').createRenderer();

const localVue = createLocalVue()
localVue.use(VueRouter)

localVue.use(VeeValidate);

describe('Test suite for Login', () => {
  let wrapper

  beforeEach(() => {
    const routes = [
      { path: '/', name: 'new-signup', component:  Signup },
      { path: '/users/password/new', name: 'forgot-password', component: ForgotPassword }
    ]

    const router = new VueRouter({
      routes
    })

    wrapper = shallow(Login, {
      localVue,
      router
    })
  })


  it('Test header', () => {
    const firstHeading = wrapper.find('h4');
    expect(firstHeading.html()).toContain('Please sign in');
  });


  it('Render component with no errors and button disabled.', () => {
      expect(wrapper.find('p').exists()).toBe(false);
      const button = wrapper.find('button');
      expect(button.element.getAttribute('disabled')).toBe("disabled");
  })

  it('button will be enabled when we input data', () => {
     
      const button = wrapper.find('button');
      expect(button.element.getAttribute('disabled')).toBe("disabled");

      wrapper.find('input#email').element.value = 'test@yopmail.com';
      wrapper.find('input#email').trigger('input');

      wrapper.find('input#password').element.value = 'password123';
      wrapper.find('input#password').trigger('input');

      expect(button.element.getAttribute('disabled')).not.toBe("disabled")

  });


  it('check for error when input invalid email', () => {
     
      const button = wrapper.find('button');
      
      let email = wrapper.find('input#email');
      email.element.value = 'test123';
      
      button.trigger('click');
      console.log(wrapper.vm.errors.all());

      expect(wrapper.vm.errors.has('password')).toBe(true);
  });



  // it('Test not error message', () => {
  //   const ClonedComponent = Vue.extend(Login);
  //   const NewComponent = new ClonedComponent({ }).$mount();
  //   renderer.renderToString(NewComponent, (err, str) => {
  //     const dom = new jsdom.JSDOM(str);
  //     const errors = dom.window.document.querySelector('span.text-danger');
  //     expect(errors).toBeNull();
  //   });
  // });

});