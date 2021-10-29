import { Reaction } from "@/interfaces";
import { getEmoji } from "@/lib/emoji";
import { findUserName } from "@/lib/firestore/users";

export interface ReactionButtonProps {
  id: string;
  native: string;
  count: number;
  isReacted: boolean;
  otherUserName: string[];
}

export const createReactionButtonsProps = async (
  userId: string,
  reactions?: Reaction[]
) => {
  if (!reactions) return [] as ReactionButtonProps[];

  const addReactionOtherUserNames = async (
    props: ReactionButtonProps,
    reactionUserIds: string[]
  ) => {
    const requests = reactionUserIds.map(userId => findUserName(userId));
    const results = await Promise.all(requests);

    return {
      ...props,
      otherUserName: results.filter(Boolean) as string[]
    } as ReactionButtonProps;
  };

  const buttonsProps = await Promise.all(
    reactions.map(({ id, users }) => {
      const props: ReactionButtonProps = {
        id,
        native: getEmoji(id),
        count: users.length,
        isReacted: users.some(user => user.includes(userId)),
        otherUserName: []
      };

      const reactionUserIds = users
        .map(user => user.replace(/^users\//, ""))
        .filter(user => user !== userId);

      return addReactionOtherUserNames(props, reactionUserIds);
    })
  );

  return buttonsProps;
};
