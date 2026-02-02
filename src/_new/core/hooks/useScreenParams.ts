import { useRoute } from '@react-navigation/native';
import { type Type } from 'arktype';

export const useScreenParams = <Schema extends Type>(schema: Schema) => {
  const { params } = useRoute<any>();
  return schema.assert(params);
};
