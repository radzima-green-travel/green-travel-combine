import {API, graphqlOperation} from 'aws-amplify';
import {listMobileData} from '../queries';

export function getAllAppData() {
  return API.graphql(graphqlOperation(listMobileData));
}
