import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Icon from '@/components/ui/icon';

type ThemeSelectorProps = {
  theme: 'glass' | 'matte' | 'solid';
  onThemeChange: (theme: 'glass' | 'matte' | 'solid') => void;
};

const ThemeSelector = ({ theme, onThemeChange }: ThemeSelectorProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Icon name="Palette" size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass-effect">
        <DropdownMenuItem onClick={() => onThemeChange('glass')} className="cursor-pointer">
          <Icon name="Sparkles" size={16} className="mr-2" />
          Прозрачный {theme === 'glass' && '✓'}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onThemeChange('matte')} className="cursor-pointer">
          <Icon name="Circle" size={16} className="mr-2" />
          Матовый {theme === 'matte' && '✓'}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onThemeChange('solid')} className="cursor-pointer">
          <Icon name="Square" size={16} className="mr-2" />
          Обычный {theme === 'solid' && '✓'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSelector;
