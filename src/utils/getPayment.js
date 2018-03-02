// @flow
import type { List, Map } from 'immutable';

export default (processLists: List<Map<string, any>>, no: string): ?string => {
  const index = processLists.findIndex(list => list.get('no') === no);

  return processLists.getIn([index, 'data', 'app_btn']);
};
