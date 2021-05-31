import './styles.scss';
import countryNamesTpl from './templates/countries.hbs';
import countryNameTpl from './templates/country.hbs';
import featchArticles from './js/fetchCountries';

import { info, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const debounce = require('lodash.debounce');
const input = document.querySelector('.countryName');
const ul = document.querySelector('.js-infoCountries');
const countryInfo = document.querySelector('.countryInfo');

const enteringTextToSearch = debounce(() => {
  featchArticles(input.value)
    .then(resp => {
      addList(resp);
    })
    .catch(errors => {
      console.error(errors);
      ul.innerHTML = '';
      countryInfo.innerHTML = '';
      error({
        title: 'Warning!',
        text: errors,
        delay: 2000,
        closerHover: true,
      });
    });
}, 500);

input.addEventListener('input', enteringTextToSearch);

function addList(arr) {
  console.log(arr);
  if (arr.length >= 10) {
    error({
      title: 'Warning!',
      text: 'Too many matches found. Please enter a more specific query!',
      delay: 2000,
      closerHover: true,
    });
    ul.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }
  if (arr.length === 1) {
    ul.innerHTML = '';
    countryInfo.innerHTML = countryNameTpl(...arr);
  } else {
    countryInfo.innerHTML = '';
    ul.innerHTML = countryNamesTpl(arr);
  }
}