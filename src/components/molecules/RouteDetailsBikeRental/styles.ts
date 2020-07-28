import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 30,
    backgroundColor: '#FEF9EE',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  iconContainer: {
    paddingVertical: 7,
    paddingHorizontal: 7,
    borderRadius: 50,
    backgroundColor: '#F7C86F',
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 15,
  },
  title: {
    fontSize: 15,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginRight: 15,
  },
  metrics: {
    marginHorizontal: 0,
    marginTop: 0,
    marginBottom: 0,
  },
});
