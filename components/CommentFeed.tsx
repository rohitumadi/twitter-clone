import { Comment, User } from "@prisma/client";
import CommentItem from "./CommentItem";
interface ExtendedComment extends Comment {
  user: User;
}
interface CommentFeedProps {
  comments: ExtendedComment[];
}
export default function CommentFeed({ comments }: CommentFeedProps) {
  return (
    <div>
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      
    </div>
  );
}
