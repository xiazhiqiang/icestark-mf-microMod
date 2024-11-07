import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { MicroModule, getModules } from '@ice/stark-module';
import { removeModuleCss, insertModuleCss, loadMod, cachedMods } from './mod';
import ErrorBoundary from './ErrorBoundary';

function Mod(props: any) {
  const { moduleInfo } = props;
  const { name, url } = moduleInfo || {};
  const rootRef = useRef(null);
  const [mod, setMod] = useState<any>(null);

  let js = ''; // 入口只有一个
  let cssList: string[] = []; // 样式可以有多个
  if (typeof url === 'string') {
    js = url;
  }
  if (Array.isArray(url)) {
    js = url.find((i) => /\.js$/.test(i)) || '';
    cssList = url.filter((i) => /\.css$/.test(i)) || [];
  }

  // 动态加载样式
  useEffect(() => {
    // console.log('jinlaile1');
    insertModuleCss(name, cssList);
    return () => {
      removeModuleCss(name);
    };
  }, [JSON.stringify(cssList)]);

  // 动态加载模块
  useEffect(() => {
    // console.log('jinlaile2');
    (async () => {
      let mod: any = await loadMod(name, js);
      setMod(mod);
    })();
  }, [js]);

  // 监听模块及路由变化
  useEffect(() => {
    // console.log('jinlaile3');
    (async () => {
      // 主动加载模块样式
      insertModuleCss(name, cssList);

      if (!rootRef.current || !mod || !mod.default) {
        return;
      }

      ReactDOM.render(<mod.default />, rootRef.current);
    })();

    return () => {
      if (rootRef.current) {
        ReactDOM.unmountComponentAtNode(rootRef.current);
      }
    };
  }, [mod, location.hash]);

  // 组件卸载
  useEffect(() => {
    // console.log('jinlaile4');
    return () => {
      if (rootRef.current) {
        ReactDOM.unmountComponentAtNode(rootRef.current);
      }
    };
  }, []);

  return <div ref={rootRef} />;
}

export default function MicroMod(props: any) {
  const { moduleName, routeInfo = {} } = props;

  // 获取所有注册的模块
  const modulesInfo = getModules();

  // 找到对应的moduleName的模块信息
  const moduleInfo = modulesInfo.find((i) => i && i.name === moduleName) || {};

  moduleInfo.render = () => (
    <ErrorBoundary>
      <Mod moduleInfo={moduleInfo} routeInfo={routeInfo} />
    </ErrorBoundary>
  );

  return <MicroModule {...props} moduleInfo={moduleInfo} />;
}
