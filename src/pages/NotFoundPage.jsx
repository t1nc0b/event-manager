import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Сторінку не знайдено</h1>
      <Link to="/">Повернутися на головну</Link>
    </div>
  );
}