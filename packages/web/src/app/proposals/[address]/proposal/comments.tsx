import { Comment } from './comment';

export const Comments = () => {
  return (
    <div className="flex flex-col gap-[20px]">
      <Comment />
      <Comment />
      <Comment />
    </div>
  );
};
