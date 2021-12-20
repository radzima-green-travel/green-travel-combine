import {API, graphqlOperation} from 'aws-amplify';

import {listMobileMetadata} from '../customQueries';

export function getAllAppMetadata() {
  return API.graphql(graphqlOperation(listMobileMetadata));
}
