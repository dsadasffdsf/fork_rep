export function organizeComments(comments) {
  const commentMap = {};
  const organizedComments = [];

  comments.forEach(comment => {
    commentMap[comment._id] = { ...comment, children: [] };
  });

  comments.forEach(comment => {
    if (comment.parent && comment.parent._type === 'comment') {
      commentMap[comment.parent._id].children.push(commentMap[comment._id]);
    } else {
      organizedComments.push(commentMap[comment._id]);
    }
  });

  return organizedComments;
}
