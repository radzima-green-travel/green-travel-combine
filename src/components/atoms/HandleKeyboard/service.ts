import {StatusBar, View, ScrollView} from 'react-native';
import {invoke, has} from 'lodash';
import {isIOS} from 'services/PlatformService';

export const calculateAndAdjustKeyboard = ({
  scrollNode,
  nodeToHandle,
  keyboardY,
  scrollHeight,
  changeListBottomOffset,
  listBottomOffset,
  additionalNodeOffset,
}: {
  scrollNode: ScrollView | null;
  nodeToHandle: View;
  keyboardY: number;
  scrollHeight: number;
  changeListBottomOffset: (nextBottomOffset: number) => void;
  listBottomOffset: number;
  additionalNodeOffset: number;
}) => {
  nodeToHandle?.measureLayout(
    scrollNode as unknown as number,
    (_nodeX: number, nodeY: number, _nodeWidth: number, nodeHeight: number) => {
      // @ts-ignore
      scrollNode?.measureInWindow(
        (
          _listX: number,
          listY: number,
          _listWidth: number,
          listHeight: number,
        ) => {
          const screenY = nodeY + listY;

          let y =
            screenY +
            (isIOS ? 0 : StatusBar.currentHeight || 0) +
            nodeHeight -
            (keyboardY - additionalNodeOffset);

          if (y > 0) {
            y = y + listBottomOffset + 10; // add current bottom value of the whole list and tine offset (10)
            const maxScrollOffset = Math.max(scrollHeight - listHeight, 0);
            if (maxScrollOffset < y) {
              changeListBottomOffset(y - maxScrollOffset);
              y = maxScrollOffset;
            }

            if (scrollNode) {
              if (scrollNode.scrollTo) {
                scrollNode.scrollTo({x: 0, y, animated: true});
              } else if (has(scrollNode, '_listRef')) {
                // FlatList doesn't have scrollTo method, but we can use it directly from list engine

                invoke(scrollNode, '_listRef.scrollToOffset', {
                  offset: y,
                  animated: true,
                });
              } else {
                // SectionList doesn't have scrollTo method, but we can use it directly from list engine

                invoke(scrollNode, '_wrapperListRef._listRef.scrollToOffset', {
                  offset: y,
                  animated: true,
                });
              }
            }
          }
        },
      );
    },
    // @ts-ignore
    (error: string) => {
      console.error('Error. calculateAndAdjustKeyboard:', error);
    },
  );
};
