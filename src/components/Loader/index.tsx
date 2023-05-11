import React, { useEffect } from 'react';
import './styles.scss';

export type LoaderProps = {
  percent: number;
  show: boolean;
};

export default function Loader(props: LoaderProps) {
  const [pos, setPos] = React.useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      const x = e.clientX + 20;
      const y = e.clientY;
      setPos({ x, y });
    };

    document.addEventListener('mousemove', listener);
    return () => {
      document.removeEventListener('mousemove', listener);
    };
  }, []);

  if (!props.show) {
    return null;
  }

  return (
    <div className="loader" style={{ top: pos.y, left: pos.x }}>
      <div className="loader-bar" style={{ width: `${props.percent}%` }}></div>
    </div>
  );
}
