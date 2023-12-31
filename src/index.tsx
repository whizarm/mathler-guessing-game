import { createRoot } from 'react-dom/client';
import App from './App';
import './index.scss';
import 'assets/TheBarethos.ttf';

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

root.render(<App />);
