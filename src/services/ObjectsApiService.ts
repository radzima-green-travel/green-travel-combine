import {NativeClientApiService} from './NativeClientApiService';

export class ObjectsApiService extends NativeClientApiService {
  async getObject() {
    return this.get('');
  }
}

export const objectsApiService = new ObjectsApiService();
