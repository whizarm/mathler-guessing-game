import deleteIcon from 'assets/delete.svg';
import enterIcon from 'assets/enter.svg';
import logoIcon from 'assets/numbers-questionmark.png';

type IconProps = {
  icon: 'enter' | 'delete' | 'logo';
  height?: string;
};

const getIcon = (icon: IconProps['icon']) => {
  switch (icon) {
    case 'enter':
      return enterIcon;
    case 'delete':
      return deleteIcon;
    case 'logo':
      return logoIcon;
  }
};

export const Icon = ({ icon, height = '100%' }: IconProps) => (
  <img src={getIcon(icon)} alt={icon} height={height} />
);
