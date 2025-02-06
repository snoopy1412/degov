import { Button } from '@/components/ui/button';

interface Props {
  title: string;
  message: string;
  buttonText: string;
  action: () => void;
}

const ErrorDisplay = ({ buttonText, action, title, message }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="flex flex-col items-center justify-center">
        <h2 className="m-0 text-center text-[3.125rem] font-bold text-foreground">{title}</h2>
        <p className="m-0 text-center text-[0.875rem] font-bold text-foreground">{message}</p>
      </div>
      <Button onClick={action} className="h-[2.125rem] gap-[0.3125rem]" color="primary">
        {buttonText}
      </Button>
    </div>
  );
};

export default ErrorDisplay;
