import { createPortal } from 'react-dom';

type Props = {
  children: React.ReactNode;
};

export default function ModalPortal({ children }: Props) {
  // 브라우저 환경일 때만 렌더링(브라우저 환경이 아니라면 null반환)
  if (typeof window === 'undefined') {
    return null;
  }

  const node = document.getElementById('portal') as Element;
  return createPortal(children, node);
}
