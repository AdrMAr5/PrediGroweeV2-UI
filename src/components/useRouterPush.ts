import { useRouter } from 'next/router';

const useRouterPush = (path: string) => {
  console.log('useRouterPush');
  const { push } = useRouter();
  return push(path);
};
export default useRouterPush;
