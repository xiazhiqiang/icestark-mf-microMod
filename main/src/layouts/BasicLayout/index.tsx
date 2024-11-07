import { Shell } from '@alifd/next';
import PageNav from './components/PageNav';
import Footer from './components/Footer';
import Mod from '@/components/Mod';
import MicroMod from '@/components/MicroMod';
// import { RemoteApp1, RemoteApp2 } from '@/components/RemoteApp';

declare global {
  interface Window {
    webpackJsonp: any[];
  }
}

export default function BasicLayout(props: { children: React.ReactNode; pathname: string }) {
  const { children, pathname } = props;

  return (
    <Shell
      type="brand"
      style={{
        minHeight: '100vh',
      }}
    >
      <Shell.Branding>Framework</Shell.Branding>

      <Shell.Navigation>
        <PageNav pathname={pathname} />
      </Shell.Navigation>

      <Shell.Content>
        {/* <RemoteApp1 />
        <RemoteApp2 /> */}
        {/* <MicroMod moduleName="microMod" /> */}
        <Mod />
        {children}
      </Shell.Content>
      <Shell.Footer>
        <Footer />
      </Shell.Footer>
    </Shell>
  );
}
