interface Params {
  id: string;
  currentUserId: string | null;
  parentId: string;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    name: string;
    image: string;
    id: string;
  };
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  };
  isComment?: boolean;
}

export default function ThreadCard({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
}: Params) {
  return (
    <article className="text-small-regular text-light-2">{content}</article>
  );
}
