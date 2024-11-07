import React from 'react';
import ReactDOM from 'react-dom';
import lodash from 'lodash';
import moment from 'moment';
import * as Next from '@alifd/next';

// 依赖库
export let moduleDeps: any = {
  react: React,
  'react-dom': ReactDOM,
  React,
  ReactDOM,
  _: lodash,
  lodash,
  moment,
  Next,
};

// 模块缓存
export let cachedMods: any = {};

export const getCode = async (url: string) => {
  let code = '';
  try {
    if (!url) {
      throw new Error('Empty url');
    }
    code = await (await fetch(url)).text();
  } catch (e) {
    code = '';
  }

  return code;
};

// 加载并缓存模块
export const loadMod = async (name: string, js: string) => {
  let mod: any = null;
  let code = await getCode(js);
  if (!code) {
    return;
  }

  // 代码运行
  mod = runCode(code);
  cachedMods[name] = mod;
  window[name] = mod;

  return mod;
};

// 设置运行模块依赖
export function setModuleDeps(deps: any = {}) {
  Object.keys(deps).forEach((k) => {
    if (k && deps[k]) {
      moduleDeps[k] = deps[k];
    }
  });
}

// 运行code
export function runCode(code: string) {
  // 定义参数
  const e = {};
  const m = { exports: e };
  const r = function (name: string) {
    return moduleDeps[name];
  };

  try {
    // 浏览器执行源码
    const f = new Function('exports', 'module', 'require', 'define', code);
    f.call(null, e, m, r, () => {});
    return m.exports;
  } catch (err) {
    console.log('run code error: ', err);
    return;
  }
}

// 为了保证扩展的样式优先级高于业务动态样式（在head中），所以插入扩展样式在body内头部或body中已存在的link标签之后
export const insertModuleCss = async (name: string, cssList: string[]) => {
  if (!name || !cssList || cssList.length < 1) {
    return false;
  }

  // 找出body内部含有module属性的link标签，然后追加到最后一个link后面，如果没有则追加到body的第一个子元素前面
  const bodyLinks = Array.from(document.getElementsByTagName('link')).filter(
    (i) => i && i.getAttribute('data-module') === name,
  );

  for (let i = 0; i < cssList.length; i++) {
    const existElement = bodyLinks.find((link) => link.getAttribute('href') === cssList[i]);
    // 若已存在外部模块的样式文件，则只需要变更link标签位置即可
    if (existElement) {
      // if (bodyLinks[bodyLinks.length - 1].nextSibling) {
      //   document.body.insertBefore(existElement, bodyLinks[bodyLinks.length - 1].nextSibling);
      // } else {
      //   document.body.appendChild(existElement);
      // }
    } else {
      const element = document.createElement('link');
      element.setAttribute('data-module', name);
      element.setAttribute('icestark', 'static');
      element.rel = 'stylesheet';
      element.href = cssList[i];
      element.addEventListener(
        'error',
        function () {
          console.log('css asset loaded error: ', cssList[i]);
        },
        false,
      );
      element.addEventListener('load', function () {}, false);
      document.head.appendChild(element);
    }
  }
  return true;
};

// 清除模块样式
export const removeModuleCss = (name: string = '') => {
  if (!name) {
    return;
  }
  const bodyLinks = Array.from(document.head.getElementsByTagName('link')).filter(
    (i) => i && i.getAttribute('data-module') === name,
  );
  for (let i = 0; i < bodyLinks.length; i++) {
    bodyLinks[i].parentNode?.removeChild(bodyLinks[i]);
  }
};

// 清除带有data-module属性的link标签
export const cleanModuleCss = () => {
  const bodyLinks = Array.from(document.head.getElementsByTagName('link')).filter(
    (i) => i && i.getAttribute('data-module'),
  );
  for (let i = 0; i < bodyLinks.length; i++) {
    bodyLinks[i].parentNode?.removeChild(bodyLinks[i]);
  }
};
